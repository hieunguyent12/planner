import { Tabs } from "@base-ui-components/react/tabs";
import TablerCalendarMonth from "~icons/tabler/calendar-month";
import TablerBook2 from "~icons/tabler/book-2";
import TablerTools from "~icons/tabler/tools";
import { MenuItem } from "./menu-item";
import "./styles.css";
import { useLocation } from "@tanstack/react-router";
import { useContext } from "react";
import { AppContext } from "@/appContext";

// https://base-ui.com/react/components/tabs
// The Menu essentially consists of tabs that toggle between different pages
function Menu({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isUFView } = useContext(AppContext);

  // Get the current tab based on URL path
  let defaultTab =
    location.pathname.split("/")[1] === ""
      ? "/schedules"
      : `/${location.pathname.split("/")[1]}`;

  if (isUFView) {
    defaultTab = `${defaultTab}/uf`;
  }

  return (
    <Tabs.Root className="rounded-md border-gray-200 h-full" value={defaultTab}>
      <Tabs.List className="menu">
        <MenuItem to={`${isUFView ? "/schedules/uf" : "/schedules"}`}>
          <TablerCalendarMonth />
          Schedules
        </MenuItem>
        <MenuItem to={`${isUFView ? "/plans/uf" : "/plans"}`}>
          <TablerBook2 />
          Plans
        </MenuItem>
        {isUFView && (
          // @ts-ignore
          <MenuItem to="/build/uf">
            <TablerTools />
            Build
          </MenuItem>
        )}
        <Tabs.Indicator className="menu-item-indicator" />
      </Tabs.List>
      {children}
    </Tabs.Root>
  );
}

export { Menu };
