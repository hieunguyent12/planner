import type { FourYearPlan } from "@/types";
import { useState } from "react";
import { AddCourseDialog } from "../add-course-dialog";
import { Year } from "./year";

type PlanProps = {
  fourYearPlan: FourYearPlan;
};

const Plan = ({ fourYearPlan }: PlanProps) => {
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);

  return (
    <>
      <div className="mx-auto relative max-w-[1200px] space-y-2">
        {fourYearPlan.map((year, idx) => (
          <Year
            key={idx}
            yearNumber={idx + 1}
            toggleAddCourseDialog={() =>
              setShowAddCourseDialog((prev) => !prev)
            }
            semesters={year.semesters}
          />
        ))}
      </div>

      <AddCourseDialog
        isOpen={showAddCourseDialog}
        toggle={() => setShowAddCourseDialog((prev) => !prev)}
      />
    </>
  );
};

export { Plan };
