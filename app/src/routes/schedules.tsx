import { createFileRoute } from "@tanstack/react-router";
import { SearchCourse } from "@/features/schedules/components/search-course";
import { Container } from "@/components/container";
import { Calendar } from "@/features/schedules/components/calendar";
import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { DetailedCourseSectionSchemaType } from "@/features/schedules/schema";
import { Schedule, type SemesterType } from "@/features/schedules/schedule";
import { ActionsBar } from "@/features/schedules/components/actions-bar";
import { ScheduleContext } from "@/features/schedules/context";

export const Route = createFileRoute("/schedules")({
  component: RouteComponent,
});

const useSchedule = () => {
  const schedule = useMemo(() => new Schedule([]), []);

  const subscribe = useMemo(() => {
    return (subscriber: () => void) => schedule.subscribe(subscriber);
  }, []);

  const getSnapshot = () => schedule.getSnapshot();

  return {
    schedule,
    courseSections: useSyncExternalStore(subscribe, getSnapshot),
  };
};

function RouteComponent() {
  const { schedule, courseSections } = useSchedule();

  const onAddSection = useCallback(
    (section: DetailedCourseSectionSchemaType) => {
      // TODO: handle error
      schedule.addCourseSection(section);
    },
    []
  );

  const onRemoveSection = useCallback(
    (section: DetailedCourseSectionSchemaType) => {
      schedule.removeCourseSection(section);
    },
    []
  );

  const onChangeSemester = useCallback((newSemester: SemesterType) => {
    schedule.setSemester(newSemester);
  }, []);

  return (
    <ScheduleContext.Provider
      value={{ onAddSection, onRemoveSection, onChangeSemester }}
    >
      <div className="h-full grid grid-cols-3 gap-4 items-start">
        <Container className="col-span-1">
          <div className="border-b-1 border-gray-100 dark:border-neutral-800 pb-2">
            <ActionsBar />
          </div>
          <SearchCourse />
        </Container>

        <Container className="col-span-2 border-r-1 border-r-background p-0 pr-2 h-[92%] overflow-y-auto scrollbar">
          <Calendar courseSections={courseSections} />
        </Container>
      </div>
    </ScheduleContext.Provider>
  );
}
