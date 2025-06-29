import { ScheduleSelect } from "../schedule-select";
import { ActionItem } from "./action-item";
import TablerEdit from "~icons/tabler/edit";
import TablerTrash from "~icons/tabler/trash";
import TablerCalendarPlus from "~icons/tabler/calendar-plus";

function ActionBar() {
  return (
    <div className="flex justify-between items-center text-gray-400 dark:text-menu-foreground">
      <ScheduleSelect />
      <div className="flex">
        <ActionItem>
          <TablerCalendarPlus />
        </ActionItem>
        <ActionItem className="ml-2 mr-1">
          <TablerEdit />
        </ActionItem>
        <ActionItem className="hover:text-red-400 dark:hover:text-red-400">
          <TablerTrash />
        </ActionItem>
      </div>
    </div>
  );
}

export { ActionBar };
