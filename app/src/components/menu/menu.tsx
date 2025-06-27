import { Tabs } from "@base-ui-components/react/tabs";
import TablerCalendarMonth from "~icons/tabler/calendar-month";
import TablerBook2 from "~icons/tabler/book-2";
import TablerTools from "~icons/tabler/tools";
import { MenuItem } from "./menu-item";

// https://base-ui.com/react/components/tabs
// The Menu essentially consists of tabs that toggle between different pages
function Menu({ children }: { children: React.ReactNode }) {
  // Get the current tab based on URL path
  const defaultTab =
    location.pathname.split("/")[1] === ""
      ? "/schedules"
      : `/${location.pathname.split("/")[1]}`;

  return (
    <Tabs.Root className="rounded-md border-gray-200" defaultValue={defaultTab}>
      <Tabs.List className="relative z-0 flex justify-center gap-1 px-1 py-2 shadow-[inset_0_-1px] shadow-gray-200">
        <MenuItem to="/schedules">
          <TablerCalendarMonth />
          Schedules
        </MenuItem>
        <MenuItem to="/plans">
          <TablerBook2 />
          Plans
        </MenuItem>
        <MenuItem to="/build">
          <TablerTools />
          Build
        </MenuItem>
        <Tabs.Indicator className="p-4 absolute top-1/2 left-0 z-[-1] h-6 w-[var(--active-tab-width)] -translate-y-1/2 translate-x-[var(--active-tab-left)] rounded-sm bg-gray-200 transition-all duration-200 ease-in-out" />
      </Tabs.List>
      {children}
    </Tabs.Root>
  );
}

export { Menu };
