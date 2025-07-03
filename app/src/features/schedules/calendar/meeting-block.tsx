import type { InPersonCourse, Meeting } from "@/types";

type MeetingBlockProps = {
  course: InPersonCourse;
  meetingInfo: Meeting;
  compact: boolean;
};

const MeetingBlock = ({ course, meetingInfo, compact }: MeetingBlockProps) => {
  const meetingLength = meetingInfo.time.end.diff(meetingInfo.time.start, [
    "hours",
    "minutes",
  ]);

  /** Scenarios for times:
      8:00 - 10:25 - no margin top; change height
      8:10 - 10:00 - margin top; change height
      8:10 - 10:25 - margin top; change height
      8:10 - 10:10 - margin top; same height
   */

  const height = 72 * (meetingLength.hours + meetingLength.minutes / 60) - 1;
  const marginTop = (meetingInfo.time.start.minute / 60) * 72;

  return (
    <div
      className="flex absolute w-full cursor-pointer z-2 overflow-y-hidden"
      style={{
        marginTop: `${marginTop}px`,
        height: `${height}px`,
        backgroundColor: course.color.bg,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = course.color.hover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = course.color.bg;
      }}
    >
      <div
        className="w-[3px] h-full"
        style={{
          backgroundColor: course.color.side,
        }}
      ></div>
      <div className="w-full text-primary-foreground">
        <div className="flex items-center">
          {/* TODO: fix styling when the course block's height is small? */}
          <p className="px-1 pt-1 font-bold sm:font-medium truncate text-[11px] sm:text-sm">
            {course.code}
          </p>
        </div>
        <div className="sm:pl-1">
          <div className="flex items-center sm:py-1">
            {!compact && (
              <span className="hidden px-1 sm:block text-xs">⏰</span>
            )}
            <span className="text-[11px] pl-1 sm:pl-0 sm:text-xs">
              {meetingInfo.time.display}
            </span>
          </div>
          <div className="flex items-center">
            {!compact && (
              <span className="text-destructive hidden px-1 sm:block text-xs">
                📍
              </span>
            )}
            <span className="text-[11px] pl-1 sm:pl-0 sm:text-xs">
              {meetingInfo.location.display}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MeetingBlock };
