from bs4 import BeautifulSoup
import requests
import time
from dotenv import load_dotenv
import os

load_dotenv()

response = requests.get("https://catalog.ufl.edu/course-search/")
soup = BeautifulSoup(response.text, "html.parser")

select = soup.find("select", id="crit-subject")

options = [
    option["value"]
    for option in select.find_all("option")
    if option["value"].strip()
]

print(len(options))

count = 0
for option in options:
    test = {
        "other": {"srcdb": ""},
        "criteria": [{"field": "subject", "value": option}],
    }
    res = requests.post(
        f"{os.getenv("CATALOG_API_URL")}&subject={option}",
        json=test,
    )
    print(res.json())
    break

    time.sleep(0.2)
    count += res.json()["count"]

print(count)
