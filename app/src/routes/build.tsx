import { Container } from "@/components/container";
import { Calendar } from "@/features/schedules/calendar";
import { getStartingAndEndingCourseTimes } from "@/features/schedules/calendar/utils";
import { SearchCourse } from "@/features/schedules/search-course";
import type { ScheduleCourse } from "@/types";
import { cn } from "@/utilts/cn";
import { createFileRoute } from "@tanstack/react-router";
import { DateTime } from "luxon";
import TablerX from "~icons/tabler/x";

export const Route = createFileRoute("/build")({
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

const test = [1, 2, 3];
const testCourses = ["MAC2302", "COP3503", "ACG2021", "ENT3003 (#111444)"];
const testColors = [
  "bg-orange-100",
  "bg-blue-100",
  "bg-pink-100",
  "bg-green-100",
];

function RouteComponent() {
  return (
    <div className="h-full grid grid-cols-3 gap-4 items-start ">
      <SearchCourse />
      <Container className="col-span-2 border-r-1 border-r-background p-0 pr-2 overflow-y-auto bg-background h-[92%] overflow-y-auto scrollbar">
        <div>
          <div
            className={cn(
              "flex flex-wrap gap-2 items-center bg-primary p-2 rounded-md shadow shadow-gray-200 mb-2 dark:shadow-none text-primary-foreground"
            )}
          >
            <p>Selected Courses:</p>
            {testCourses.map((course, idx) => (
              <div
                key={course}
                className={cn(
                  "flex items-center gap-1 rounded-md font-medium text-sm",
                  testColors[idx]
                )}
              >
                <p className="pl-1.5 py-1">{course}</p>
                <div className="rounded-sm p-1.5 hover:bg-red-200 hover:text-red-600">
                  <TablerX className="text-xs" />
                </div>
              </div>
            ))}
          </div>
          {test.map((item) => (
            <div
              key={item}
              className={cn(
                "bg-primary p-1 rounded-md shadow shadow-gray-200 dark:shadow-none",
                item !== 1 && "mt-5"
              )}
            >
              <div className="flex justify-between">
                <p className="px-1 font-semibold text-lg text-primary-foreground">
                  Schedule #{item}
                </p>
                <button className="bg-blue-400 rounded-md px-2 py-1 text-white font-semibold hover:bg-blue-500 cursor-pointer">
                  Select
                </button>
              </div>

              <div className="border border-primary-border mt-2">
                <Calendar
                  compact
                  courses={courses}
                  timeIntervalToRender={getStartingAndEndingCourseTimes(
                    courses
                  )}
                />
              </div>
            </div>
          ))}
        </div>
        {/* <div className="flex items-start justify-center h-full mt-10">
          <p>
            The builder will generate all possible schedules from the courses
            that you've chosen.
          </p>
        </div> */}
      </Container>
    </div>
  );
}
