import TablerMapPin from "~icons/tabler/map-pin";
import TablerPlus from "~icons/tabler/plus";
import { Accordion } from "@/components/accordion";

function PlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
    </svg>
  );
}

function CourseMeeting() {
  return (
    <div className="rounded-md p-3 border border-primary-border bg-primary">
      <div className="relative flex gap-5 border-b-1 border-primary-border pb-3">
        <p>Class #11445</p>
        <p>Credits: 3</p>
        <button className="absolute right-0 -top-1 px-2 py-1 bg-primary text-sky-600 hover:bg-sky-50 dark:hover:bg-gray-800 border border-sky-100 dark:border-gray-600 focus:ring-2 focus:outline-none focus:ring-sky-100 font-medium rounded-md text-sm text-center inline-flex items-center dark:focus:ring-gray-600 dark:text-blue-300">
          <TablerPlus className="text-sm" /> Add
        </button>
      </div>

      <div className="space-y-1 mt-2 text-sm">
        <p>Meetings:</p>
        <div className="text-[15px] rounded-md">
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-1 text-sm">
              <p>M,F,W: 8:30 AM - 10:30 AM</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TablerMapPin />
              <span>MALA 2001</span>
            </div>
          </div>
          <div className="flex gap-3 pt-2 text-sm">
            <div className="flex items-center gap-1">
              <p>T: 4:30 PM - 5:30 PM</p>
            </div>
            <div className="flex items-center gap-1">
              <TablerMapPin />
              <span>PUGH 100</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-1 text-sm">
        <p>Instructor(s): Fatemeh Tavassoli</p>
      </div>
    </div>
  );
}

function SearchResult() {
  return (
    <Accordion
      items={[
        {
          trigger: (
            <>
              <div className="text-primary-foreground relative">
                <div className="flex items-center absolute -top-5">
                  <p className="text-primary-foreground text-sm bg-orange-100 dark:bg-orange-900 rounded-md px-1 font-medium">
                    COP3503
                  </p>
                </div>
                Programming Fundamentals 2
              </div>
              <PlusIcon className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 group-data-[panel-open]:rotate-45" />
            </>
          ),
          content: (
            <div className="px-3 py-2">
              <CourseMeeting />
            </div>
          ),
        },
      ]}
    />
  );
}

export { SearchResult };
