import requests
import re
import sqlite3
import json
from bs4 import BeautifulSoup
from db import catalog_con, catalog_cur, soc_cur, soc_con
from dotenv import load_dotenv
import os
import time


load_dotenv()


# TODO: remove this, useless
class UFCatalogCourse:
    def __init__(
        self,
        code,
        credits,
        name,
        subject,
        description="",
        prerequisite="",
        corequisite="",
        # prereq_description="",
        # coreq_description="",
    ):
        self.code = self.__parse_code(code)
        self.credits = credits
        self.name = name
        self.subject = subject
        self.description = description
        self.prerequisite = prerequisite
        self.corequisite = corequisite
        # self.prereq_codes = self.__parse_requisites_codes(prereq_description)
        # self.coreq_codes = self.__parse_requisites_codes(coreq_description)

    def __parse_code(self, code):
        pattern = r"^([A-Za-z]{1,3}) ?(\d{4})([A-Za-z]?)$"
        match = re.fullmatch(pattern, code)

        if match:
            groups = match.groups()

            return groups[0].upper() + " " + groups[1] + groups[2].upper()
        else:
            raise ValueError(
                f"Invalid course code: {code} - {self.subject} - {self.name}"
            )

    def __parse_requisites_codes(self, code_description):
        invalid_code_prefixes = ["one", "two", "six", "ten"]
        pattern = r"([A-Za-z]{3} \d{4}/?[A-Za-z]?(?: ?\/ ?\d{4}[A-Za-z]?)?)"
        matches = re.findall(pattern, code_description)
        codes_unformatted = []

        for match in matches:
            code_seperator = "/"
            if code_seperator in match:
                code1, code2 = match.split(code_seperator)
                if len(code2.strip()) != 1:
                    code2 = code1.strip()[:3] + code2
                else:
                    code2 = code1.strip() + code2

                codes_unformatted.append(code1)
                codes_unformatted.append(code2)
            else:
                codes_unformatted.append(match)

        codes = [
            self.__parse_code(code.strip())
            for code in codes_unformatted
            if code.strip()[:3].lower() not in invalid_code_prefixes
        ]

        return codes

    def to_dict(self):
        return self.__dict__


class University:
    def __init__(self, catalog_url, soc_api_url):
        self.catalog_url = catalog_url
        self.soc_api_url = soc_api_url  # soc = schedule of courses

    def get_catalog_courses(self):
        return False

    def get_semester_courses(self, year, season):
        return False


class UF(University):
    semester_map = {
        "Spring": "1",
        "Summer": "5",
        "Fall": "8",
    }

    def __init__(self, catalog_url, catalog_base_url, soc_api_url):
        super().__init__(catalog_url, soc_api_url)
        self.catalog_base_url = catalog_base_url
        self.num_subjects = 0

    def get_semester_courses(self):
        api_courses = []

        last_control_number = 0

        start_time = time.perf_counter()
        # repeatedly call the api until we exhaust the data, care for infinite loops
        while True:
            res = self.__call_soc_api(last_control_number).json()[0]
            print(last_control_number)

            api_courses += res["COURSES"]
            last_control_number = res["LASTCONTROLNUMBER"]

            if (
                res["RETRIEVEDROWS"] == 0
                or res["TOTALROWS"] == 0
                or res["LASTCONTROLNUMBER"] == 0
                or len(api_courses) >= 50000  # TODO: remove this
            ):
                break

        end_time = time.perf_counter()

        print(f"Fetch time: {(end_time - start_time):.4f} seconds")
        print("courses count: ", len(api_courses))
        courses = []

        # transform the data before storing it since there are a lot of unncessary properties that we don't want
        for course in api_courses:
            current_course = {
                "code": course["code"],
                "name": course["name"],
                "description": course["description"],
                "prerequisites": course["prerequisites"],
                "sections": [],
            }

            for section in course["sections"]:
                meetings = []
                for meeting in section["meetTimes"]:
                    meetings.append(
                        {
                            "time": {
                                "days": meeting["meetDays"],
                                "start": meeting["meetTimeBegin"],
                                "end": meeting["meetTimeEnd"],
                            },
                            "location": {
                                "building": meeting["meetBuilding"],
                                "room": meeting["meetRoom"],
                            },
                        }
                    )

                current_course["sections"].append(
                    {
                        "course_number": section["classNumber"],
                        "credits": section["credits"],
                        "note": section["note"],
                        "department": section["deptName"],
                        "instructors": [
                            instructor["name"]
                            for instructor in section["instructors"]
                        ],
                        "meetings": meetings,
                        # FIXME: ensure online property is properly reflected based on "sectWeb"
                        "online": len(meetings)
                        == 0,  # online = "AD", in person = "PC", hybrid = "HB"
                    }
                )

            # convert it to a json string so we can store it in the db later! i'm being lazy here but this approach should work for now
            # in the future, should probably consider creating seperate tables for these
            current_course["sections"] = json.dumps(current_course["sections"])

            courses.append(current_course)

        return courses

    def get_catalog_courses(self) -> list[UFCatalogCourse]:
        response = requests.get(self.catalog_url)
        soup = BeautifulSoup(response.text, "html.parser")

        catalog = soup.find("div", class_="az_sitemap")
        courses = []

        for header in catalog.find_all("h2", class_="letternav-head"):
            ul = header.find_next_sibling("ul")  # Find the next <ul> after <h2>

            if ul:
                for li in ul.find_all("li"):
                    self.num_subjects += 1

                    courses += self.__get_subject_courses(
                        subject_url=li.find_next("a")["href"],
                        subject=li.text.strip(),
                    )

        return courses

    def __get_subject_courses(self, subject_url, subject):
        response = requests.get(f"{self.catalog_base_url}{subject_url}")
        soup = BeautifulSoup(response.text, "html.parser")
        courses = []

        course_blocks = soup.find_all(
            "div", class_="courseblock courseblocktoggle"
        )

        for block in course_blocks:
            try:
                title_tag = block.find("p", class_="courseblocktitle")
                description_tag = block.find("p", class_="courseblockdesc")
                prerequisite_tags = block.find_all(
                    "p", class_="courseblockextra noindent"
                )

                if title_tag is None:
                    continue

                title_text = title_tag.get_text(" ", strip=True)
                parts = title_text.split()

                code = " ".join(parts[:2])  # 1st two parts are the course code
                credits = (
                    parts[-2] if "Credit" in parts[-1] else ""
                )  # credits is the last two parts
                name = " ".join(parts[2:-2] if credits else parts[2:])
                description = (
                    description_tag.get_text(" ", strip=True)
                    if description_tag
                    else ""
                )

                if len(prerequisite_tags) > 1:
                    prerequisite = (
                        prerequisite_tags[1]
                        .get_text(" ", strip=True)
                        .replace("Prerequisite: ", "")
                    )
                    prerequisite = prerequisite.replace(" .", ".")
                    prerequisite = prerequisite.replace("( ", "(")
                    prerequisite = prerequisite.replace(" )", ")")
                    prerequisite = prerequisite.replace(" ,", ",")
                else:
                    prerequisite = "None"

                courses.append(
                    UFCatalogCourse(
                        self.__clean_text(code),
                        self.__clean_text(credits),
                        self.__clean_text(name),
                        self.__clean_text(subject),
                        self.__clean_text(description),
                        self.__clean_text(prerequisite),
                        # TODO: coreqs?
                    )
                )

            except Exception as e:
                # If any error occured, we should abort and alert
                print(f"Error parsing course: {e}")
                continue

        return courses

    def __clean_text(self, text):
        return text.replace("\xa0", " ")

    def __call_soc_api(self, last_control_number=0, semester="2248"):
        return requests.get(
            f"{os.getenv('SOC_API_URL')}?"
            "ai=false"
            "&auf=false"
            "&category=CWSP"
            "&class-num="
            "&course-code="
            "&course-title="
            "&cred-srch="
            "&day-f="
            "&day-m="
            "&day-r="
            "&day-s="
            "&day-t="
            "&day-w="
            "&dept="
            "&eep="
            "&fitsSchedule=false"
            "&ge="
            "&ge-b="
            "&ge-c="
            "&ge-d="
            "&ge-h="
            "&ge-m="
            "&ge-n="
            "&ge-p="
            "&ge-s="
            "&instructor="
            f"&last-control-number={last_control_number}"
            "&level-max="
            "&level-min="
            "&no-open-seats=false"
            "&online-a="
            "&online-c="
            "&online-h="
            "&online-p="
            "&period-b="
            "&period-e="
            "&prog-level="
            "&qst-1="
            "&qst-2="
            "&qst-3="
            "&quest=false"
            f"&term={semester}"
            "&wr-2000="
            "&wr-4000="
            "&wr-6000="
            "&writing=false"
            "&var-cred="
            "&hons=false"
        )

    def __get_term_string(self, semester, year):
        year_str = str(year)
        # remove the second character of the year string, so 2025 => 225
        # should work until the year 2100!!
        year = year_str[0] + year_str[2:]

        suffix = self.semester_map[semester]
        # Why do they do this??
        if semester == "Summer A":
            suffix += "6W1"
        elif semester == "Summer B":
            suffix += "6W2"

        return f"{year}{suffix}"


uf = UF(
    catalog_url="https://catalog.ufl.edu/UGRD/courses",
    catalog_base_url="https://catalog.ufl.edu",
    soc_api_url=None,
)

semester_courses = uf.get_semester_courses()
sql = """
    INSERT INTO soc (
        code,
        name,
        sections,
        description,
        prerequisites
    )
    VALUES (
        :code,
        :name,
        :sections,
        :description,
        :prerequisites
    )
"""

soc_cur.executemany(sql, semester_courses)
soc_con.commit()

# semester_courses[0]["sections"] = json.dumps(semester_courses[0]["sections"])

# soc_cur.execute(
#     """
# INSERT INTO soc (
#     code,
#     name,
#     sections,
#     description,
#     prerequisites
# )
# VALUES (
#     :code,
#     :name,
#     :sections,
#     :description,
#     :prerequisites
# )
#    """,
#     semester_courses[0],
# )
# soc_con.commit()

# TODO: save to db
# https://docs.python.org/3/library/sqlite3.html#tutorial

# sql = """
#     INSERT OR IGNORE INTO catalog
#     (
#         code, name, credits, subject, description,
#         prerequisite, corequisite
#     )
#     VALUES
#     (
#         :code, :name, :credits, :subject, :description,
#         :prerequisite, :corequisite
#     )
# """
# catalog_courses = uf.get_catalog_courses()
# print(len(catalog_courses))
# catalog_cur.executemany(sql, [course.to_dict() for course in catalog_courses])
# catalog_con.commit()

# catalog_cur.execute("SELECT COUNT(*) FROM catalog")
# count = catalog_cur.fetchone()[0]
# print(f"Number of items in catalog: {count}")

# cur.execute("SELECT * FROM catalog WHERE subject = 'Accounting'")
# print(cur.fetchall())

# TODO:
# attach json data

# compare with the results we get from the webscraping


# catalog_cur.execute(
#     """
#     SELECT *
#     FROM catalog
#     WHERE code LIKE '%' || ? || '%'
#     """,
#     ("MAC",),
# )

# print([course[0] for course in cur.fetchall()])
