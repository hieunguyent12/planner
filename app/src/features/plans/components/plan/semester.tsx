import type { Course as TCourse } from "@/types";
import { useState } from "react";
import TablerPlus from "~icons/tabler/plus";
import { Dialog } from "@/components/dialog";
import { Course } from "./course";
import TablerExternalLink from "~icons/tabler/external-link";
import { Select, SelectItem } from "@/components/select";
import { CourseDetails } from "../course-detail";

const renderSemester = (semester: string) => {
  if (semester === "fall") {
    return "Fall 🍂";
  }

  if (semester === "spring") {
    return "Spring 🍀";
  }

  if (semester === "summer") {
    return "Summer ☀️";
  }
};

type SemesterContainerProps = {
  semester: string;
  courses: TCourse[];
  toggleAddCourseDialog: () => void;
};

const Semester = ({
  semester,
  courses,
  toggleAddCourseDialog,
}: SemesterContainerProps) => {
  const [courseSelected, setCourseSelected] = useState<any>(null);

  return (
    <>
      <div className="bg-container-content-bg border border-primary-border basis-0 grow p-2 rounded-md">
        <div className="flex justify-between text-primary-foreground">
          <p className="capitalize">{renderSemester(semester)}</p>
          <p>Credits: 4</p>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          {courses.map((course) => (
            <Course
              key={course.id}
              course={course}
              selectCourse={() => {
                if (courseSelected === course.code) {
                  setCourseSelected(null);
                } else {
                  setCourseSelected(course.code);
                }
              }}
            />
          ))}

          <button
            onClick={toggleAddCourseDialog}
            className="inline-flex items-center gap-1 border-dashed border border-primary-border text-sm text-primary-foreground text-center select-none p-3 rounded-md hover:bg-primary-hover cursor-pointer"
          >
            <TablerPlus /> New Course
          </button>
        </div>
      </div>

      <Dialog
        isOpen={courseSelected}
        toggle={() => {
          setCourseSelected(null);
        }}
        className="top-1/3"
      >
        <CourseDetails onClose={() => setCourseSelected(null)} />
      </Dialog>
    </>
  );
};

export { Semester };
