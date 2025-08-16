import { useLocation } from "@tanstack/react-router";
import { SearchCourse } from "@/features/schedules/components/search-course";
import { Container } from "@/components/container";
import { Calendar } from "@/features/schedules/components/calendar";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { DetailedCourseSectionSchemaType } from "@/features/schedules/schema";
import { Schedule, type SemesterType } from "@/features/schedules/schedule";
import { ActionsBar } from "@/features/schedules/components/actions-bar";
import {
  ScheduleContext,
  SchedulesManagerContext,
  type SchedulesManager,
} from "@/features/schedules/context";
import { Dialog } from "@/components/dialog";
import { Button } from "@/components/button";
import TablerPictureInPictureOff from "~icons/tabler/picture-in-picture-off";

import { useLocalStorage } from "@uidotdev/usehooks";
import {
  AddCourseError,
  useAddCourseError,
} from "@/features/schedules/components/add-course-error";

const useSchedulesManager = ({
  schedules: savedSchedules,
  selectedScheduleIdx: savedSelectedScheduleIdx,
  saveSchedules,
  saveSelectedScheduleIdx,
}: {
  schedules?: Schedule[];
  selectedScheduleIdx?: number;
  saveSchedules: (schedules: Schedule[]) => void;
  saveSelectedScheduleIdx: (scheduleIdx: number) => void;
}): {
  selectedSchedule: Schedule;
  selectedScheduleIdx: number;
  schedules: Schedule[];
  schedulesManager: SchedulesManager;
} => {
  const [schedules, setSchedules] = useState<Schedule[]>(() =>
    savedSchedules
      ? savedSchedules.map((schedule) => Schedule.load(schedule))
      : [new Schedule({ courseSections: [], id: 1 })]
  );

  const [selectedScheduleIdx, setSelectedScheduleIdx] = useState(
    savedSelectedScheduleIdx ?? 0
  );

  const selectedSchedule = schedules[selectedScheduleIdx];

  useEffect(() => {
    const unsubscribe = selectedSchedule.subscribe(() => {
      saveSchedules(schedules);
    });

    return () => {
      unsubscribe();
    };
  }, [selectedScheduleIdx]);

  useEffect(() => {
    saveSelectedScheduleIdx(selectedScheduleIdx);
  }, [selectedScheduleIdx]);

  useEffect(() => {
    saveSchedules(schedules);
  }, [schedules]);

  const schedulesManager = useMemo(() => {
    return {
      onSetSelectedSchedule: (idx: number) => setSelectedScheduleIdx(idx),
      onAddSchedule: (newScheduleName: string) => {
        const newSchedule = new Schedule({
          courseSections: [],
          id: schedules.length + 1,
          name: newScheduleName,
        });
        const schedulesLength = schedules.length;
        setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);

        // if we don't use setTimeout here, the ScheduleSelect component won't update the list fast enough to reflect it. Hence, we
        // use setTimeout to delay the state update and cause an additional rerender so the select component can register the new schedules.
        setTimeout(() => setSelectedScheduleIdx(schedulesLength), 0);
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
          setSelectedScheduleIdx(index - 1);
        }
      },
      getSelectedSchedule: () => selectedSchedule,
      getScheduleById: (id: number) =>
        schedules.find((schedule) => schedule.id === id),
      getScheduleByIndex: (id: number) =>
        schedules.findIndex((schedule) => schedule.id === id),
      getAllSchedules: () => schedules,
    };
  }, [selectedSchedule, schedules]);

  return {
    selectedSchedule,
    selectedScheduleIdx,
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

export function SchedulesPage({
  fullscreen,
  isUFStudent = false,
}: {
  fullscreen: any;
  isUFStudent?: boolean;
}) {
  const location = useLocation();

  const [savedSchedules, setSavedSchedules] = useLocalStorage<Schedule[]>(
    "schedules",
    undefined
  );
  const [savedSelectedScheduleIdx, setSavedSelectedScheduleIdx] =
    useLocalStorage<number>("selectedSchedule", undefined);

  const { selectedSchedule, selectedScheduleIdx, schedulesManager } =
    useSchedulesManager({
      schedules: savedSchedules,
      selectedScheduleIdx: fullscreen ?? savedSelectedScheduleIdx,
      saveSchedules: (schedules) => setSavedSchedules(schedules),
      saveSelectedScheduleIdx: (schedule) =>
        setSavedSelectedScheduleIdx(schedule),
    });
  const { schedule, courseSections } = useSchedule(selectedSchedule);
  const { errorAddingSection, setErrorAddingSection } = useAddCourseError();

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

  if (Number.isInteger(fullscreen)) {
    return (
      <SchedulesManagerContext.Provider value={{ schedulesManager }}>
        <ScheduleContext.Provider
          value={{ schedule, onAddSection, onRemoveSection, onChangeSemester }}
        >
          <div className="flex justify-center h-full">
            <Container className="w-[75%] border-r-1 border-r-background p-0 overflow-y-scroll scrollbar">
              <div className="relative">
                <Calendar courseSections={courseSections} />
              </div>
            </Container>
          </div>
        </ScheduleContext.Provider>
      </SchedulesManagerContext.Provider>
    );
  }

  // TODO: just pass in the schedule instance directly in the context
  return (
    <>
      <SchedulesManagerContext.Provider value={{ schedulesManager }}>
        <ScheduleContext.Provider
          value={{ schedule, onAddSection, onRemoveSection, onChangeSemester }}
        >
          {isUFStudent ? (
            <div className="h-full grid grid-cols-3 gap-4 items-start">
              <Container className="col-span-1">
                <SearchCourse />
              </Container>

              <Container className="col-span-2 border-r-1 border-r-background p-0 h-[92%] overflow-y-scroll scrollbar">
                <div className="p-2 border-b-1 border-gray-100 dark:border-neutral-800">
                  <ActionsBar />
                </div>

                <div className="relative">
                  <Calendar
                    onHandleClick={() =>
                      window.open(
                        `http://localhost:5173${location.pathname}?fullscreen=${selectedScheduleIdx}`
                      )
                    }
                    courseSections={courseSections}
                    handle={
                      <TablerPictureInPictureOff className="text-lg absolute opacity-20" />
                    }
                  />

                  {/* <div className="absolute backdrop-blur-lg w-full h-full inset-0 bg-black/[15%] transition-all duration-150"></div> */}
                  {/* <div className="absolute inset-0 z-10 overflow-y-auto bg-menu-indicator opacity-35 flex min-h-full items-center justify-center text-center backdrop-blur-sm">
                <div className="absolute top-0">
                  <p>Test</p>
                </div>
              </div> */}
                </div>
              </Container>
            </div>
          ) : (
            <div className="flex justify-center h-[92%]">
              <Container className="w-[75%] border-r-1 border-r-background p-0 overflow-y-scroll scrollbar">
                <div className="p-2 border-b-1 border-gray-100 dark:border-neutral-800">
                  <ActionsBar />
                </div>
                <div className="relative">
                  <Calendar
                    onHandleClick={() =>
                      window.open(
                        `http://localhost:5173${location.pathname}?fullscreen=${selectedScheduleIdx}`
                      )
                    }
                    courseSections={courseSections}
                    handle={
                      <TablerPictureInPictureOff className="text-lg absolute opacity-20" />
                    }
                  />
                </div>
              </Container>
            </div>
          )}
        </ScheduleContext.Provider>
      </SchedulesManagerContext.Provider>
      <Dialog
        isOpen={!!errorAddingSection}
        toggle={() => setErrorAddingSection(null)}
      >
        <div className="p-3">
          <AddCourseError
            reason={errorAddingSection?.reason}
            conflicts={errorAddingSection?.conflicts}
          />

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
