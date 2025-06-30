import { Accordion } from "@base-ui-components/react/accordion";
import TablerMapPin from "~icons/tabler/map-pin";
import TablerClockHour4 from "~icons/tabler/clock-hour-4";
import TablerPlus from "~icons/tabler/plus";
import { useState } from "react";
import { cn } from "@/utilts/cn";

export default function CourseAccordion() {
  const [toggled, setToggle] = useState(false);

  return (
    <Accordion.Root className="flex flex-col justify-center text-gray-900">
      <Accordion.Item className="">
        <Accordion.Header>
          <Accordion.Trigger
            onClick={() => setToggle((prev) => !prev)}
            className={cn(
              "group border-gray-200 bg-slate-50 border rounded-md relative flex w-full items-center justify-between gap-4 py-2 pr-1 pl-3 text-left font-medium hover:bg-gray-100 focus-visible:z-1 focus-visible:outline focus-visible:outline-blue-800",
              toggled && "rounded-b-none border-b-0"
            )}
          >
            <div>
              <div className="flex items-center">
                <p className="text-sm bg-orange-100 rounded-md px-1 font-medium">
                  COP3503
                </p>
              </div>
              Programming Fundamentals 2
            </div>
            <PlusIcon className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 group-data-[panel-open]:rotate-45" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel className="h-[var(--accordion-panel-height)] border border-gray-200 border-t-0 rounded-b-md bg-slate-50 overflow-hidden text-base text-gray-600 transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
          <div className="p-2 space-y-2">
            <CourseMeeting />
            <CourseMeeting />
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}

function PlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
    </svg>
  );
}

function CourseMeeting() {
  return (
    <div className="rounded-md p-3 border border-gray-200 bg-white ">
      <div className="relative flex gap-5 border-b-1 border-gray-200 pb-3">
        <p>Class #11445</p>
        <p>Credits: 3</p>
        <button className="absolute right-0 -top-1 px-2 py-1 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-md text-sm text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
          <TablerPlus className="text-sm" /> Add
        </button>
      </div>

      <div className="space-y-1 mt-2">
        <p>Meetings:</p>
        <div className="text-[15px] rounded-md">
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <TablerClockHour4 />
              <p>M,F,W: 8:30 AM - 10:30 AM</p>
            </div>
            <div className="flex items-center gap-1">
              <TablerMapPin />
              <span>MALA 2001</span>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <div className="flex items-center gap-1">
              <TablerClockHour4 />
              <p>T: 4:30 PM - 5:30 PM</p>
            </div>
            <div className="flex items-center gap-1">
              <TablerMapPin />
              <span>PUGH 100</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-2">
        <p>Instructor(s): Fatemeh Tavassoli</p>
      </div>
    </div>
  );
}

function SearchResult() {
  return (
    <>
      <CourseAccordion />
      {/* <CourseAccordion /> */}
    </>

    // <div className="p-2 relative border-slate-200 border rounded-md cursor-pointer mb-2 hover:bg-slate-100">
    //   <div className="flex items-center">
    // <p className="text-sm bg-orange-100 rounded-md px-1 font-medium">
    //   COP3503
    // </p>
    //   </div>
    //   <p className="my-1">Programming Fundamentals 2</p>
    // </div>
  );
}

export { SearchResult };
