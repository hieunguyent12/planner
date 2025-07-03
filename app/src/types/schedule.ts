import type { DateTime } from "luxon";
import type { DayOfWeek } from "./shared";

export type ScheduleCourse = InPersonCourse | OnlineCourse;

type BaseCourse = {
  id: string;
  code: string;
  courseId: string;
  online: boolean;
};

export type InPersonCourse = BaseCourse & {
  online: false;

  meetings: Meeting[];

  color: {
    bg: string;
    hover: string;
    side: string;
  };
};

export type OnlineCourse = BaseCourse & {
  online: true;

  color: {
    bg: string;
    hover: string;
    side: string;
  };
};

export type Meeting = {
  time: {
    days: DayOfWeek[];
    start: DateTime;
    end: DateTime;
    display: string;
  };

  location: {
    building: string;
    room: string;
    display: string;
  };
};

export type ScheduleBlock = {
  start: DateTime;
  // end: DateTime;
  day: DayOfWeek;
};
