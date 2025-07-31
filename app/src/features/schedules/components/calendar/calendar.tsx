import { forwardRef } from "react";
import { DaysHeader } from "./days-header";
import { Block } from "./block";
import { HoursHeader } from "./hours-header";
import { NUM_HOURS_PER_DAY, WEEK_DAYS } from "./constants";
import { MeetingBlock } from "./meeting-block";
import type { ScheduleBlock } from "@/types";
import { OnlineSection } from "./online-section";
import "./styles.css";
import clsx from "clsx";
import { DateTime, Interval } from "luxon";
import { type DetailedCourseSectionSchemaType } from "@/features/schedules/schema";
import { getStartingAndEndingCourseTimes } from "@/features/schedules/components/calendar/utils";
import type { InPersonCourseSection } from "@/features/schedules/schedule";

type CalendarProps = {
  courseSections: DetailedCourseSectionSchemaType[];
  timeIntervalToRender?: Interval;
  highlightedBlocks?: ScheduleBlock[];
  compact?: boolean;
  tiny?: boolean;
  onBlockSelected?: (block: ScheduleBlock) => void;
};

type HeaderProps = {
  timeIntervalToRender?: Interval;
  tiny?: boolean;
};

type BlocksProps = {
  courseSections: DetailedCourseSectionSchemaType[];
  timeIntervalToRender?: Interval;
  highlightedBlocks?: CalendarProps["highlightedBlocks"];
  compact?: boolean;
  onBlockSelected?: CalendarProps["onBlockSelected"];
};

const Header = ({ timeIntervalToRender, tiny }: HeaderProps) => {
  return (
    <>
      <HoursHeader timeIntervalToRender={timeIntervalToRender} />
      <DaysHeader tiny={tiny} />
    </>
  );
};

export const dayMap = {
  Mon: "M",
  Tue: "T",
  Wed: "W",
  Thu: "R",
  Fri: "F",
} as const;

const Blocks = ({
  courseSections,
  timeIntervalToRender,
  highlightedBlocks,
  compact = false,
  onBlockSelected,
}: BlocksProps) => {
  // TODO: refactor and make it configurable
  const courseIntervals: Interval[] = [];

  if (compact) {
    courseSections.forEach((section) => {
      if (!section.online) {
        section.meetings.forEach((meeting) => {
          let endTime = meeting.time.end;
          if (meeting.time.end.minute > 0) {
            endTime = endTime.plus({ hour: 1 });
          }
          const interval = Interval.fromDateTimes(
            meeting.time.start.set({ minute: 0 }),
            endTime.set({ minute: 0 })
          );

          courseIntervals.push(interval);
        });
      }
    });
  }

  if (!timeIntervalToRender) {
    return null;
  }

  const blocks = Array.from(
    { length: WEEK_DAYS.length * NUM_HOURS_PER_DAY },
    (_, idx) => {
      // the combination of the period start and day are unique for every classes
      const day = WEEK_DAYS[idx % WEEK_DAYS.length];
      const hour = DateTime.fromFormat(
        `${idx % NUM_HOURS_PER_DAY}:00`,
        "H:mm",
        {
          zone: "utc",
        }
      );

      let meeting;
      const section = courseSections.find((c): c is InPersonCourseSection => {
        if (!c.online) {
          meeting = c.meetings.find((meeting) => {
            return (
              meeting.time.start.hour === hour.hour &&
              meeting.time.days.includes(dayMap[day as keyof typeof dayMap])
            );
          });

          return !!meeting;
        }

        return false;
      });

      if (timeIntervalToRender.contains(hour)) {
        return (
          <Block
            key={idx}
            startHour={hour}
            day={day}
            collapsed={
              compact &&
              !courseIntervals.find((interval) => interval.contains(hour))
            }
            onBlockSelected={onBlockSelected}
            highlighted={
              !!highlightedBlocks?.find(
                (block) => block.day === day && block.start.equals(hour)
              )
            }
          >
            {section && meeting && (
              <MeetingBlock
                courseSection={section}
                meeting={meeting}
                compact={compact}
              />
            )}
          </Block>
        );
      }
    }
  );

  return blocks;
};

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      courseSections,
      timeIntervalToRender,
      highlightedBlocks,
      compact,
      tiny,
      onBlockSelected,
    },
    ref
  ) => {
    timeIntervalToRender =
      timeIntervalToRender || getStartingAndEndingCourseTimes(courseSections);

    const onlineSections = courseSections.filter((c) => c.online);

    if (
      onlineSections.length === courseSections.length &&
      courseSections.length > 0
    ) {
      timeIntervalToRender = undefined;
    }

    return (
      <div
        className="text-primary-foreground"
        style={{
          maxWidth: "1000px",
        }}
      >
        <div
          className={clsx("calendar-grid w-full text-sm", tiny && "tiny")}
          ref={ref}
        >
          <div className="border-b-1 border-calendar-border shadow-xs"></div>
          <Header timeIntervalToRender={timeIntervalToRender} tiny={tiny} />
          <Blocks
            courseSections={courseSections}
            timeIntervalToRender={timeIntervalToRender}
            highlightedBlocks={highlightedBlocks}
            compact={compact}
            onBlockSelected={onBlockSelected}
          />
        </div>

        <OnlineSection onlineSections={onlineSections} />
      </div>
    );
  }
);

export { Calendar };
