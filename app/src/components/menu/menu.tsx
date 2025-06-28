import { Tabs } from "@base-ui-components/react/tabs";
import TablerCalendarMonth from "~icons/tabler/calendar-month";
import TablerBook2 from "~icons/tabler/book-2";
import TablerTools from "~icons/tabler/tools";
import { MenuItem } from "./menu-item";
import "./styles.css";

// https://base-ui.com/react/components/tabs
// The Menu essentially consists of tabs that toggle between different pages
function Menu({ children }: { children: React.ReactNode }) {
  // Get the current tab based on URL path
  const defaultTab =
    location.pathname.split("/")[1] === ""
      ? "/schedules"
      : `/${location.pathname.split("/")[1]}`;

  return (
    <Tabs.Root
      className="rounded-md border-gray-200 h-full"
      defaultValue={defaultTab}
    >
      <Tabs.List className="menu">
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
        <Tabs.Indicator className="menu-item-indicator" />
      </Tabs.List>
      {children}
    </Tabs.Root>
  );
}

export { Menu };
