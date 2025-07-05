import type { Semesters } from "@/types";
import { useState } from "react";
import { Semester } from "./semester";

type YearContainerProps = {
  yearNumber: number;
  semesters: Semesters;
  toggleAddCourseDialog: () => void;
};

const Year = ({
  yearNumber,
  semesters,
  toggleAddCourseDialog,
}: YearContainerProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <div
        className="inline-flex gap-2 items-center p-2 rounded-md mb-2 cursor-pointer hover:bg-primary-hover text-2xl select-none"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <p className="text-primary-foreground font-bold">Year {yearNumber}</p>
        <span>{isExpanded ? "⬆️" : "⬇️"}</span>
      </div>
      {isExpanded && (
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap sm:items-start">
          {Object.keys(semesters).map((semester) => (
            <Semester
              key={semester}
              semester={semester}
              courses={semesters[semester as keyof typeof semesters].courses}
              toggleAddCourseDialog={toggleAddCourseDialog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { Year };
