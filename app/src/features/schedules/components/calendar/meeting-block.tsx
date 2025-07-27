import { ScheduleContext } from "@/features/schedules/context";
import type { InPersonCourseSection } from "@/features/schedules/schedule";
import type { MeetingSchemaType } from "@/features/schedules/schema";
import { useContext } from "react";
import TablerX from "~icons/tabler/x";

type MeetingBlockProps = {
  courseSection: InPersonCourseSection;
  meeting: MeetingSchemaType;
  compact: boolean;
  isRemovable?: boolean;
};

const MeetingBlock = ({
  courseSection,
  meeting,
  compact,
  isRemovable = true,
}: MeetingBlockProps) => {
  const meetingLength = meeting.time.end.diff(meeting.time.start, [
    "hours",
    "minutes",
  ]);
  const scheduleContext = useContext(ScheduleContext);

  /** Scenarios for times:
      8:00 - 10:25 - no margin top; change height
      8:10 - 10:00 - margin top; change height
      8:10 - 10:25 - margin top; change height
      8:10 - 10:10 - margin top; same height
   */

  const height = 76 * (meetingLength.hours + meetingLength.minutes / 60) - 1;
  const marginTop = (meeting.time.start.minute / 60) * 76;

  return (
    <div
      className="flex absolute w-full cursor-pointer z-2 overflow-y-hidden group"
      style={{
        marginTop: `${marginTop}px`,
        height: `${height}px`,
        backgroundColor: courseSection.color.bg,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = courseSection.color.hover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = courseSection.color.bg;
      }}
    >
      <div
        className="w-[3px] h-full"
        style={{
          backgroundColor: courseSection.color.side,
        }}
      ></div>
      <div className="w-full text-primary-foreground relative">
        {isRemovable && (
          <button
            onClick={() => scheduleContext.onRemoveSection(courseSection)}
            className="absolute right-1 top-0.5 invisible group-hover:visible cursor-pointer"
          >
            <TablerX className="size-4 hover:text-red-600" />
          </button>
        )}
        <div className="flex items-center">
          {/* TODO: fix styling when the course block's height is small? */}
          <p className="px-1 pt-0.5 font-bold sm:font-medium truncate text-[11px] sm:text-sm">
            {courseSection.code}
          </p>
        </div>
        <div className="sm:pl-1">
          <div className="flex items-center sm:py-0">
            {!compact && (
              <span className="hidden pr-1 sm:block text-xs">⏰</span>
            )}
            <span className="text-[11px] pl-1 sm:pl-0 sm:text-sm">
              {meeting.time.display}
            </span>
          </div>
          <div className="flex items-center">
            {!compact && (
              <span className="text-destructive hidden pr-1 sm:block text-xs">
                📍
              </span>
            )}
            <span className="text-[11px] pl-1 sm:pl-0 sm:text-sm">
              {meeting.location.display}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MeetingBlock };
