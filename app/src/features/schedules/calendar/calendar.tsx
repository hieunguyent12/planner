import { forwardRef } from "react";
import { DaysHeader } from "./days-header";
import { Block } from "./block";
import { HoursHeader } from "./hours-header";
import { NUM_HOURS_PER_DAY, WEEK_DAYS } from "./constants";
import { MeetingBlock } from "./meeting-block";
import type { InPersonCourse, ScheduleCourse, ScheduleBlock } from "@/types";
import { OnlineSection } from "./online-section";
import "./styles.css";
import clsx from "clsx";
import { DateTime, Interval } from "luxon";

type CalendarProps = {
  courses: ScheduleCourse[];
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
  courses: ScheduleCourse[];
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

const Blocks = ({
  courses,
  timeIntervalToRender,
  highlightedBlocks,
  compact = false,
  onBlockSelected,
}: BlocksProps) => {
  // TODO: refactor and make it configurable
  const courseIntervals: Interval[] = [];

  if (compact) {
    courses.forEach((course) => {
      if (!course.online) {
        course.meetings.forEach((meeting) => {
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

      let meetingInfo;
      const course = courses.find((c): c is InPersonCourse => {
        if (!c.online) {
          meetingInfo = c.meetings.find((meeting) => {
            return (
              meeting.time.start.hour === hour.hour &&
              meeting.time.days.includes(day)
            );
          });

          return !!meetingInfo;
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
            {course && meetingInfo && (
              <MeetingBlock
                course={course}
                meetingInfo={meetingInfo}
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
      courses,
      timeIntervalToRender,
      highlightedBlocks,
      compact,
      tiny,
      onBlockSelected,
    },
    ref
  ) => {
    return (
      <div
        className="text-primary-foreground"
        style={{
          maxWidth: "950px",
        }}
      >
        <div
          className={clsx("calendar-grid w-full text-sm", tiny && "tiny")}
          ref={ref}
        >
          <div className="border-b-1 border-calendar-border shadow-xs"></div>
          <Header timeIntervalToRender={timeIntervalToRender} tiny={tiny} />
          <Blocks
            courses={courses}
            timeIntervalToRender={timeIntervalToRender}
            highlightedBlocks={highlightedBlocks}
            compact={compact}
            onBlockSelected={onBlockSelected}
          />
        </div>

        <OnlineSection courses={courses} />
      </div>
    );
  }
);

export { Calendar };
