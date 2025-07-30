import type { Schedule, SemesterType } from "@/features/schedules/schedule";
import type { DetailedCourseSectionSchemaType } from "@/features/schedules/schema";
import { createContext, type Dispatch } from "react";

export const ScheduleContext = createContext<{
  onAddSection: (section: DetailedCourseSectionSchemaType) => void;
  onRemoveSection: (section: DetailedCourseSectionSchemaType) => void;
  onChangeSemester: (newSemester: SemesterType) => void;
  schedule: Schedule;
}>(undefined!);

export interface SchedulesManager {
  onSetSelectedSchedule: Dispatch<React.SetStateAction<Schedule>>;
  onAddSchedule: (newScheduleName: string) => void;
  onRemoveSchedule: (schedule: Schedule) => void;
  getSelectedSchedule: () => Schedule;
  getScheduleById: (id: number) => Schedule | undefined;
  getAllSchedules: () => Schedule[];
}

export const SchedulesManagerContext = createContext<{
  schedulesManager: SchedulesManager;
}>(undefined!);
