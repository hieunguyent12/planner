import { expect, test, describe } from "vitest";
import { getStartingAndEndingCourseTimes } from "../utils";
import type { ScheduleCourse } from "@/types";
import { DateTime } from "luxon";

const formatString = "h:mm a";
const dateTimeOpts = {
  zone: "utc",
};

const courses: ScheduleCourse[] = [
  {
    id: "1",
    code: "MAC2313",
    online: false,
    courseId: "test",

    meetings: [
      {
        time: {
          days: ["Mon", "Wed"],
          start: DateTime.fromFormat("12:00 AM", formatString, dateTimeOpts),
          end: DateTime.fromFormat("3:00 AM", formatString, dateTimeOpts),
          display: "",
        },

        location: {
          building: "LIT",
          room: "100",
          display: "LIT 100",
        },
      },
    ],

    color: {
      bg: "#fff7ed",
      hover: "#ffedd4",
      side: "#ffb86a",
    },
  },

  {
    id: "2",
    code: "TEST2",
    online: false,
    courseId: "test",

    meetings: [
      {
        time: {
          days: ["Mon", "Wed"],
          start: DateTime.fromFormat("6:00 AM", formatString, dateTimeOpts),
          end: DateTime.fromFormat("8:00 AM", formatString, dateTimeOpts),
          display: "",
        },

        location: {
          building: "LIT",
          room: "100",
          display: "LIT 100",
        },
      },
    ],

    color: {
      bg: "#fff7ed",
      hover: "#ffedd4",
      side: "#ffb86a",
    },
  },

  {
    id: "3",
    code: "TEST3",
    online: false,
    courseId: "test",

    meetings: [
      {
        time: {
          days: ["Mon", "Wed"],
          start: DateTime.fromFormat("2:00 PM", formatString, dateTimeOpts),
          end: DateTime.fromFormat("3:00 PM", formatString, dateTimeOpts),
          display: "",
        },

        location: {
          building: "LIT",
          room: "100",
          display: "LIT 100",
        },
      },
    ],

    color: {
      bg: "#fff7ed",
      hover: "#ffedd4",
      side: "#ffb86a",
    },
  },

  {
    id: "4",
    code: "TEST4",
    online: false,
    courseId: "test",

    meetings: [
      {
        time: {
          days: ["Mon", "Wed"],
          start: DateTime.fromFormat("1:00 AM", formatString, dateTimeOpts),
          end: DateTime.fromFormat("3:00 AM", formatString, dateTimeOpts),
          display: "",
        },

        location: {
          building: "LIT",
          room: "100",
          display: "LIT 100",
        },
      },
    ],

    color: {
      bg: "#fff7ed",
      hover: "#ffedd4",
      side: "#ffb86a",
    },
  },

  {
    id: "5",
    code: "TEST5",
    online: false,
    courseId: "test",

    meetings: [
      {
        time: {
          days: ["Mon", "Wed"],
          start: DateTime.fromFormat("3:00 PM", formatString, dateTimeOpts),
          end: DateTime.fromFormat("5:00 PM", formatString, dateTimeOpts),
          display: "",
        },

        location: {
          building: "LIT",
          room: "100",
          display: "LIT 100",
        },
      },
    ],

    color: {
      bg: "#fff7ed",
      hover: "#ffedd4",
      side: "#ffb86a",
    },
  },
];

const onlineCourses: ScheduleCourse[] = [
  {
    id: "3",
    code: "ENT3003",
    online: true,
    courseId: "test",

    color: {
      bg: "#f0fdf4",
      hover: "#dcfce7",
      side: "#7bf1a8",
    },
  },
  {
    id: "4",
    code: "MAC2023",
    online: true,
    courseId: "test",

    color: {
      bg: "#f0fdf4",
      hover: "#dcfce7",
      side: "#7bf1a8",
    },
  },
];

describe("time range", () => {
  test("correctly finds earliest course start time", () => {
    const timeInterval = getStartingAndEndingCourseTimes(courses, 0);
    expect(timeInterval.start?.hour).toBe(0);
  });

  test("correctly finds latest course end time", () => {
    const timeInterval = getStartingAndEndingCourseTimes(courses, 0);
    expect(timeInterval.end?.hour).toBe(17);
  });

  test("handles only online classes", () => {
    const timeInterval = getStartingAndEndingCourseTimes(onlineCourses, 0);
    // expect(timeInterval.start?.hour).toBe(0);
    expect(timeInterval.end?.hour).toBe(23);
  });
});
