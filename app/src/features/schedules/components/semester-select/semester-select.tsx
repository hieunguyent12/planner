import { Select } from "@/components/select";
import { ScheduleContext } from "@/features/schedules/context";
import type { SemesterType } from "@/features/schedules/schedule";
import { useContext, useEffect, useState } from "react";
import TablerCheck from "~icons/tabler/check";

const semesters = [
  { label: "🍂 Fall 2025", value: "fall-2025" },
  { label: "☀️ Summer 2025", value: "summer-2025" },
  { label: "🍀 Spring 2025", value: "spring-2025" },
];

function SemesterSelect() {
  const { schedule } = useContext(ScheduleContext);

  const [semester, setSemester] = useState<SemesterType>(schedule.semester);

  useEffect(() => {
    setSemester(schedule.semester);
  }, [schedule.semester]);

  return (
    <Select
      items={semesters}
      placeholder={"Select semester"}
      value={`${semester.season}-${semester.year}`}
      onValueChange={(value: string) => {
        const [season, year] = value.split("-");
        const semester = {
          year: parseInt(year),
          season: season as SemesterType["season"],
        };
        schedule.setSemester(semester);
        setSemester(semester);
      }}
      className="text-sm border-none"
      indicator={<TablerCheck className="size-3.5" />}
    />
  );
}

export { SemesterSelect };
