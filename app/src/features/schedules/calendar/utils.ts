import type { ScheduleCourse } from "@/types";
import { DateTime, Interval } from "luxon";

const dateTimeOpts = {
  zone: "utc",
};

export const getStartingAndEndingCourseTimes = (
  courses: ScheduleCourse[],
  extraRange = 1,
) => {
  if (courses.length === 0) {
    return Interval.fromDateTimes(
      DateTime.fromFormat("0:00", "H:mm", dateTimeOpts),
      DateTime.fromFormat("24:00", "H:mm", dateTimeOpts),
    );
  }

  let startingTime = DateTime.fromFormat("24:00", "H:mm", dateTimeOpts);
  let endingTime = DateTime.fromFormat("0:00", "H:mm", dateTimeOpts);

  let modified = false;

  courses.forEach((course) => {
    if (course.online) {
      return;
    }

    course.meetings.forEach((meeting) => {
      if (meeting.time.start < startingTime) {
        modified = true;
        startingTime = meeting.time.start;
      }

      if (meeting.time.end > endingTime) {
        modified = true;
        endingTime = meeting.time.end;
      }
    });
  });

  if (!modified) {
    // this is to make sure that starting time is before ending time
    return Interval.fromDateTimes(
      DateTime.fromFormat("0:00", "H:mm", dateTimeOpts),
      DateTime.fromFormat("23:00", "H:mm", dateTimeOpts),
    );
  }

  return Interval.fromDateTimes(
    startingTime.hour === 0
      ? startingTime
      : startingTime.minus({ hour: extraRange }).set({ minute: 0 }),
    endingTime.hour === 23
      ? endingTime
      : endingTime.plus({ hour: extraRange }).set({ minute: 0 }),
  );
};
