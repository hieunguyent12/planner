import type { Meta, StoryObj } from "@storybook/react-vite";

import { Calendar } from "../calendar";
import { getStartingAndEndingCourseTimes } from "../utils";
import type { ScheduleCourse } from "@/types";
import { DateTime } from "luxon";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Calendar",
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const formatString = "h:mm a";
const dateTimeOpts = {
  zone: "utc",
};

const courses: ScheduleCourse[] = [
  {
    id: "1",
    code: "MAC2313",
    courseId: "test",
    online: false,
    meetings: [
      {
        time: {
          days: ["Mon", "Wed"],
          start: DateTime.fromFormat("8:20 AM", formatString, dateTimeOpts),
          end: DateTime.fromFormat("9:20 AM", formatString, dateTimeOpts),
          display: "8:30AM - 10:00AM",
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
    code: "COP3503",
    online: false,
    courseId: "test",

    meetings: [
      {
        time: {
          days: ["Tue", "Thu"],
          start: DateTime.fromFormat("3:00 PM", formatString, dateTimeOpts),
          end: DateTime.fromFormat("4:00 PM", formatString, dateTimeOpts),
          display: "3PM - 4PM",
        },

        location: {
          building: "LIT",
          room: "100",
          display: "LIT 100",
        },
      },
      {
        time: {
          days: ["Fri"],
          start: DateTime.fromFormat("6:00 PM", formatString, dateTimeOpts),
          end: DateTime.fromFormat("8:00 PM", formatString, dateTimeOpts),
          display: "6PM - 8PM",
        },

        location: {
          building: "LIT",
          room: "100",
          display: "LIT 100",
        },
      },
    ],

    color: {
      bg: "#fff1f2",
      hover: "#ffe4e6",
      side: "#ffa1ad",
    },
  },
  {
    id: "3",
    code: "ENT3003",
    courseId: "test",
    online: true,

    color: {
      bg: "#f0fdf4",
      hover: "#dcfce7",
      side: "#7bf1a8",
    },
  },

  {
    id: "4",
    code: "EGN3032",
    courseId: "test",

    online: true,
    color: {
      bg: "#f5f3ff",
      hover: "#ede9fe",
      side: "#c4b4ff",
    },
  },
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const OnlineAndInPersonCourses: Story = {
  args: {
    courses,
    timeIntervalToRender: getStartingAndEndingCourseTimes(courses),
  },
};

const onlineCourses: ScheduleCourse[] = [
  {
    id: "3",
    code: "ENT3003",
    courseId: "test",
    online: true,

    color: {
      bg: "#f0fdf4",
      hover: "#dcfce7",
      side: "#7bf1a8",
    },
  },

  {
    id: "4",
    code: "EGN3032",
    courseId: "test",

    online: true,
    color: {
      bg: "#f5f3ff",
      hover: "#ede9fe",
      side: "#c4b4ff",
    },
  },
];

export const OnlineCourses: Story = {
  args: {
    courses: onlineCourses,
    timeIntervalToRender: undefined,
  },
};

export const CompactSchedule: Story = {
  args: {
    courses,
    timeIntervalToRender: getStartingAndEndingCourseTimes(courses),
    compact: true,
  },
};

export const TinySchedule: Story = {
  args: {
    courses: [],
    timeIntervalToRender: getStartingAndEndingCourseTimes([]),
    tiny: true,
    compact: true,
  },
};
