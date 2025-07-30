import { createFileRoute } from "@tanstack/react-router";
import { SearchCourse } from "@/features/schedules/components/search-course";
import { Container } from "@/components/container";
import { Calendar } from "@/features/schedules/components/calendar";
import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import type { DetailedCourseSectionSchemaType } from "@/features/schedules/schema";
import {
  InPersonCourseSection,
  Schedule,
  type SemesterType,
} from "@/features/schedules/schedule";
import { ActionsBar } from "@/features/schedules/components/actions-bar";
import {
  ScheduleContext,
  SchedulesManagerContext,
  type SchedulesManager,
} from "@/features/schedules/context";
import { Dialog } from "@/components/dialog";
import { Button } from "@/components/button";
import TablerAlertCircleFilled from "~icons/tabler/alert-circle-filled";

export const Route = createFileRoute("/schedules")({
  component: RouteComponent,
});

const useSchedulesManager = (): {
  selectedSchedule: Schedule;
  schedules: Schedule[];
  schedulesManager: SchedulesManager;
} => {
  const [schedules, setSchedules] = useState<Schedule[]>(() => [
    new Schedule([], 1),
  ]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>(
    schedules[0]
  );

  const schedulesManager = useMemo(() => {
    return {
      onSetSelectedSchedule: setSelectedSchedule,
      onAddSchedule: (newScheduleName: string) => {
        const newSchedule = new Schedule(
          [],
          schedules.length + 1,
          newScheduleName
        );
        setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);

        // if we don't use setTimeout here, the ScheduleSelect component won't update the list fast enough to reflect it. Hence, we
        // use setTimeout to delay the state update and cause an additional rerender so the select component can register the new schedules.
        setTimeout(() => setSelectedSchedule(newSchedule), 0);
      },
      onRemoveSchedule: (scheduleToRemove: Schedule) => {
        if (scheduleToRemove.id === 1) return;

        const index = schedules.findIndex(
          (schedule) => scheduleToRemove === schedule
        );

        const newSchedules = [...schedules];
        newSchedules.splice(index, 1);

        setSchedules(newSchedules);

        if (scheduleToRemove === selectedSchedule) {
          setSelectedSchedule(schedules[index - 1]);
        }
      },
      getSelectedSchedule: () => selectedSchedule,
      getScheduleById: (id: number) =>
        schedules.find((schedule) => schedule.id === id),
      getAllSchedules: () => schedules,
    };
  }, [selectedSchedule, schedules]);

  return {
    selectedSchedule,
    schedules,
    schedulesManager,
  };
};

const useSchedule = (selectedSchedule: Schedule) => {
  const subscribe = useMemo(() => {
    return (subscriber: () => void) => selectedSchedule.subscribe(subscriber);
  }, [selectedSchedule]);

  const getSnapshot = () => selectedSchedule.getSnapshot();

  return {
    schedule: selectedSchedule,
    courseSections: useSyncExternalStore(subscribe, getSnapshot),
  };
};

function RouteComponent() {
  const { selectedSchedule, schedulesManager } = useSchedulesManager();
  const { schedule, courseSections } = useSchedule(selectedSchedule);
  const [errorAddingSection, setErrorAddingSection] = useState<{
    reason: "duplicate" | "conflict";
    conflicts?: InPersonCourseSection[];
  } | null>(null);

  const onAddSection = useCallback(
    (section: DetailedCourseSectionSchemaType) => {
      const result = schedule.canAddSection(section);

      if (!result.success) {
        setErrorAddingSection({
          reason: result.reason,
          conflicts: result.conflicts,
        });
        return;
      }

      schedule.addCourseSection(section);
    },
    [schedule]
  );

  const onRemoveSection = useCallback(
    (section: DetailedCourseSectionSchemaType) => {
      schedule.removeCourseSection(section);
    },
    [schedule]
  );

  const onChangeSemester = useCallback(
    (newSemester: SemesterType) => {
      schedule.setSemester(newSemester);
    },
    [schedule]
  );

  // TODO: just pass in the schedule instance directly in the context
  return (
    <>
      <SchedulesManagerContext.Provider value={{ schedulesManager }}>
        <ScheduleContext.Provider
          value={{ schedule, onAddSection, onRemoveSection, onChangeSemester }}
        >
          <div className="h-full grid grid-cols-3 gap-4 items-start">
            <Container className="col-span-1">
              <SearchCourse />
            </Container>

            <Container className="col-span-2 border-r-1 border-r-background p-0 h-[92%] overflow-y-scroll scrollbar">
              <div className="p-2 border-b-1 border-gray-100 dark:border-neutral-800">
                <ActionsBar />
              </div>
              <div className="relative">
                <Calendar courseSections={courseSections} />

                {/* <div className="absolute backdrop-blur-lg w-full h-full inset-0 bg-black/[15%] transition-all duration-150"></div> */}
                {/* <div className="absolute inset-0 z-10 overflow-y-auto bg-menu-indicator opacity-35 flex min-h-full items-center justify-center text-center backdrop-blur-sm">
                <div className="absolute top-0">
                  <p>Test</p>
                </div>
              </div> */}
              </div>
            </Container>
          </div>
        </ScheduleContext.Provider>
      </SchedulesManagerContext.Provider>
      <Dialog
        isOpen={!!errorAddingSection}
        toggle={() => setErrorAddingSection(null)}
      >
        <div className="p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-red-500">
              <TablerAlertCircleFilled />
              <p className="text-lg font-medium">Unable to add course</p>
            </div>
            <p>
              Reason:{" "}
              {errorAddingSection?.reason === "duplicate"
                ? `Duplicate course section found in schedule.`
                : `Time conflicts with other sections.`}
            </p>

            {errorAddingSection?.reason === "conflict" && (
              <div>
                <p>Conflicting sections: </p>
                {errorAddingSection?.conflicts?.map((section) => (
                  <div key={section.id}>
                    <p className="underline">{section.code}:</p>
                    {section.meetings.map((meeting, i) => (
                      <p key={i}>
                        {/* how do i disable prettier for this line? */}
                        {`${meeting.time.days.join(
                          ", "
                        )}: ${meeting.time.start.toFormat(
                          "h:mm a"
                        )} - ${meeting.time.end.toFormat("h:mm a")}`}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="secondary"
            className="w-full mt-5 py-2"
            onClick={() => setErrorAddingSection(null)}
          >
            Close
          </Button>
        </div>
      </Dialog>
    </>
  );
}
