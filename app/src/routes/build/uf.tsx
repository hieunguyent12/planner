// import { Container } from "@/components/container";
// import { Input } from "@/components/input";
// import { Calendar } from "@/features/schedules/calendar";
// import { getStartingAndEndingCourseTimes } from "@/features/schedules/calendar/utils";
// import { SearchResult } from "@/features/schedules/search-course";
// import { SemesterSelect } from "@/features/schedules/semester-select";
// import type { ScheduleCourse } from "@/types";
// import { cn } from "@/utils/cn";
// import { createFileRoute } from "@tanstack/react-router";
// import { DateTime } from "luxon";
// import TablerX from "~icons/tabler/x";
// import TablerSearch from "~icons/tabler/search";
// import { Tabs } from "@base-ui-components/react/tabs";
// import TablerFilter from "~icons/tabler/filter";
// import { Checkbox } from "@base-ui-components/react/checkbox";
// import { CheckboxGroup } from "@base-ui-components/react/checkbox-group";
// import TablerPlus from "~icons/tabler/plus";
// import TablerCheck from "~icons/tabler/check";

// export const Route = createFileRoute("/build/uf")({
//   component: RouteComponent,
// });

// const formatString = "h:mm a";
// const dateTimeOpts = {
//   zone: "utc",
// };

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
//           display: "8:20AM - 9:20AM",
//         },

//         location: {
//           building: "LIT",
//           room: "100",
//           display: "LIT 100",
//         },
//       },
//     ],

//     color: {
//       bg: "#fff7ed",
//       hover: "#ffedd4",
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
//       bg: "#fff1f2",
//       hover: "#ffe4e6",
//       side: "#ffa1ad",
//     },
//   },
//   {
//     id: "3",
//     code: "ENT3003",
//     courseId: "test",
//     online: true,

//     color: {
//       bg: "#f0fdf4",
//       hover: "#dcfce7",
//       side: "#7bf1a8",
//     },
//   },

//   {
//     id: "4",
//     code: "EGN3032",
//     courseId: "test",

//     online: true,
//     color: {
//       bg: "#f5f3ff",
//       hover: "#ede9fe",
//       side: "#c4b4ff",
//     },
//   },
// ];

// const test = [1, 2, 3];
// const testCourses = ["MAC2302", "COP3503", "ACG2021", "ENT3003 (#111444)"];
// const testColors = [
//   "bg-orange-100",
//   "bg-blue-100",
//   "bg-pink-100",
//   "bg-green-100",
// ];
// const days = ["M", "T", "W", "R", "F"];

// function RouteComponent() {
//   return (
//     <div className="h-full grid grid-cols-3 gap-4 items-start ">
//       <Container>
//         <Tabs.Root
//           className="rounded-md border-gray-200 h-full"
//           defaultValue={"Search"}
//         >
//           <Tabs.List className="relative z-0 flex sm:justify-around gap-1">
//             <Tabs.Tab className="menu-item w-[50%]" value={"Search"}>
//               <TablerSearch />
//               Search
//             </Tabs.Tab>
//             <Tabs.Tab className="menu-item border w-[70%]" value={"Filters"}>
//               <TablerFilter />
//               Filters
//             </Tabs.Tab>

//             <Tabs.Indicator className="menu-item-indicator" />
//           </Tabs.List>
//           <Tabs.Panel
//             className="border-t-1 border-primary-border mt-1"
//             value="Search"
//           >
//             <div className="flex items-center justify-between mt-3 pb-1">
//               <p className="text-md font-medium text-primary-foreground">
//                 Search Courses
//               </p>
//               <div className="flex items-center">
//                 <SemesterSelect />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <Input placeholder="Search" icon={TablerSearch} />
//               <p className="text-xs text-gray-400">Example: MAC2302, ACG2010</p>
//             </div>

//             <div className="mt-5">
//               <SearchResult />
//             </div>
//           </Tabs.Panel>
//           <Tabs.Panel
//             className="border-t-1 border-primary-border mt-1"
//             value="Filters"
//           >
//             <div className="mt-3">
//               <ExampleCheckboxGroup />
//             </div>
//           </Tabs.Panel>
//         </Tabs.Root>
//       </Container>
//       <Container className="col-span-2 border-r-1 border-r-background p-0 pr-2 bg-background h-[92%] overflow-y-auto scrollbar">
//         <div>
//           <div
//             className={cn(
//               "flex flex-wrap gap-2 items-center bg-primary p-2 rounded-md shadow shadow-gray-200 mb-2 dark:shadow-none text-primary-foreground"
//             )}
//           >
//             <p>Selected Courses:</p>
//             {testCourses.map((course, idx) => (
//               <div
//                 key={course}
//                 className={cn(
//                   "flex items-center gap-1 rounded-md font-medium text-sm",
//                   testColors[idx]
//                 )}
//               >
//                 <p className="pl-1.5 py-1">{course}</p>
//                 <div className="rounded-sm p-1.5 hover:bg-red-200 hover:text-red-600">
//                   <TablerX className="text-xs" />
//                 </div>
//               </div>
//             ))}
//           </div>
//           {test.map((item) => (
//             <div
//               key={item}
//               className={cn(
//                 "bg-primary p-1 rounded-md shadow shadow-gray-200 dark:shadow-none",
//                 item !== 1 && "mt-5"
//               )}
//             >
//               <div className="flex justify-between">
//                 <p className="px-1 font-semibold text-lg text-primary-foreground">
//                   Schedule #{item}
//                 </p>
//                 <button className="bg-blue-400 rounded-md px-2 py-1 text-white font-semibold hover:bg-blue-500 cursor-pointer">
//                   Select
//                 </button>
//               </div>

//               <div className="border border-primary-border mt-2">
//                 <Calendar
//                   compact
//                   courses={courses}
//                   timeIntervalToRender={getStartingAndEndingCourseTimes(
//                     courses
//                   )}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* <div className="flex items-start justify-center h-full mt-10">
//           <p>
//             The builder will generate all possible schedules from the courses
//             that you've chosen.
//           </p>
//         </div> */}
//       </Container>
//     </div>
//   );
// }

// function ExampleCheckboxGroup() {
//   return (
//     <div>
//       <CheckboxGroup
//         aria-labelledby="filters-caption"
//         className="flex flex-wrap items-start gap-5 text-primary-foreground"
//       >
//         <div className="font-medium">Exclude days:</div>

//         {days.map((day) => (
//           <label className="flex items-center gap-1">
//             <Checkbox.Root
//               name="day"
//               value={day}
//               className="flex size-4 items-center justify-center rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 data-[checked]:bg-gray-900 data-[unchecked]:border data-[unchecked]:border-gray-300"
//             >
//               <Checkbox.Indicator className="flex text-gray-50 data-[unchecked]:hidden">
//                 <TablerCheck className="size-3" />
//               </Checkbox.Indicator>
//             </Checkbox.Root>
//             {day}
//           </label>
//         ))}
//       </CheckboxGroup>

//       <CheckboxGroup
//         aria-labelledby="filters-caption"
//         className="flex flex-wrap items-start gap-3 text-primary-foreground mt-3"
//       >
//         <div className="font-medium">Exclude online courses:</div>

//         <label className="flex items-center gap-1">
//           <Checkbox.Root
//             name="online-course"
//             value="true"
//             className="flex size-4 items-center justify-center rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 data-[checked]:bg-gray-900 data-[unchecked]:border data-[unchecked]:border-gray-300"
//           >
//             <Checkbox.Indicator className="flex text-gray-50 data-[unchecked]:hidden">
//               <TablerCheck className="size-3" />
//             </Checkbox.Indicator>
//           </Checkbox.Root>
//           Yes
//         </label>
//       </CheckboxGroup>

//       <div className="flex flex-col">
//         <div className="relative flex flex-wrap items-start gap-3 text-primary-foreground mt-3">
//           <div className="font-medium">Exclude time blocks:</div>
//           <button className="absolute right-0 -top-1 px-2 py-1 bg-primary text-sky-600 hover:bg-sky-50 dark:hover:bg-gray-800 border border-sky-100 dark:border-gray-600 focus:ring-2 focus:outline-none focus:ring-sky-100 font-medium rounded-md text-sm text-center inline-flex items-center dark:focus:ring-gray-600 dark:text-blue-300">
//             <TablerPlus className="text-sm" /> Add
//           </button>
//         </div>

//         <div className="mt-2">
//           <div className="rounded-md p-2 bg-gray-100 border border-primary-border">
//             9:35AM - 10:35AM
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
