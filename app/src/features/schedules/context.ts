import type { SemesterType } from "@/features/schedules/schedule";
import type { DetailedCourseSectionSchemaType } from "@/features/schedules/schema";
import { createContext } from "react";

export const ScheduleContext = createContext<{
  onAddSection: (section: DetailedCourseSectionSchemaType) => void;
  onRemoveSection: (section: DetailedCourseSectionSchemaType) => void;
  onChangeSemester: (newSemester: SemesterType) => void;
}>(undefined!);
