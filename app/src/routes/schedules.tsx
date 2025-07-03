import { createFileRoute } from "@tanstack/react-router";
import { SearchCourse } from "@/features/schedules/search-course/search-course";
import { Container } from "@/components/container";
import { Calendar } from "@/features/schedules/calendar";
import { getStartingAndEndingCourseTimes } from "@/features/schedules/calendar/utils";
import { DateTime } from "luxon";
import type { ScheduleCourse } from "@/types";

export const Route = createFileRoute("/schedules")({
  component: RouteComponent,
});

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
          display: "8:20AM - 9:20AM",
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

// const courses: ScheduleCourse[] = [
//   {
//     id: "1",
//     code: "MAC2313",
//     courseId: "test",
//     online: false,
//     meetings: [
//       {
//         time: {
//           days: ["Mon", "Wed"],
//           start: DateTime.fromFormat("8:20 AM", formatString, dateTimeOpts),
//           end: DateTime.fromFormat("9:20 AM", formatString, dateTimeOpts),
//           display: "8:30AM - 10:00AM",
//         },

//         location: {
//           building: "LIT",
//           room: "100",
//           display: "LIT 100",
//         },
//       },
//     ],

//     color: {
//       bg: "var(--color-amber-900)",
//       hover: "var(--color-amber-800)",
//       side: "#ffb86a",
//     },
//   },
//   {
//     id: "2",
//     code: "COP3503",
//     online: false,
//     courseId: "test",

//     meetings: [
//       {
//         time: {
//           days: ["Tue", "Thu"],
//           start: DateTime.fromFormat("3:00 PM", formatString, dateTimeOpts),
//           end: DateTime.fromFormat("4:00 PM", formatString, dateTimeOpts),
//           display: "3PM - 4PM",
//         },

//         location: {
//           building: "LIT",
//           room: "100",
//           display: "LIT 100",
//         },
//       },
//       {
//         time: {
//           days: ["Fri"],
//           start: DateTime.fromFormat("6:00 PM", formatString, dateTimeOpts),
//           end: DateTime.fromFormat("8:00 PM", formatString, dateTimeOpts),
//           display: "6PM - 8PM",
//         },

//         location: {
//           building: "LIT",
//           room: "100",
//           display: "LIT 100",
//         },
//       },
//     ],

//     color: {
//       bg: "var(--color-fuchsia-900)",
//       hover: "var(--color-fuchsia-800)",
//       side: "#ffa1ad",
//     },
//   },
//   {
//     id: "3",
//     code: "ENT3003",
//     courseId: "test",
//     online: true,

//     color: {
//       bg: "var(--color-green-900)",
//       hover: "var(--color-green-800)",
//       side: "#7bf1a8",
//     },
//   },

//   {
//     id: "4",
//     code: "EGN3032",
//     courseId: "test",

//     online: true,
//     color: {
//       bg: "var(--color-violet-900)",
//       hover: "var(--color-violet-800)",
//       side: "#c4b4ff",
//     },
//   },
// ];

function RouteComponent() {
  return (
    <div className="grid grid-cols-3 gap-4 items-start">
      <SearchCourse />
      <Container className="col-span-2 p-0 mb-10 border-r-1 border-r-background">
        <div className="p-0">
          <Calendar
            // compact
            courses={courses}
            timeIntervalToRender={getStartingAndEndingCourseTimes(courses)}
          />
        </div>
      </Container>
    </div>
  );
}
