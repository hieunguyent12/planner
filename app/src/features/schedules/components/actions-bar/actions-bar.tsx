import { ScheduleSelect } from "../schedule-select";
import TablerEdit from "~icons/tabler/edit";
import TablerTrash from "~icons/tabler/trash";
import TablerCalendarPlus from "~icons/tabler/calendar-plus";
import { useContext, useState } from "react";
import { cn } from "@/utils/cn";
import { Input } from "@/components/input";
import {
  ScheduleContext,
  SchedulesManagerContext,
} from "@/features/schedules/context";
import { Popover as BasePopover } from "@base-ui-components/react/popover";
import { Button } from "@/components/button";
import { Separator } from "@base-ui-components/react/separator";
import { AddCourseDialog } from "@/features/schedules/components/add-course-dialog";

export function ActionsBar() {
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [isDeletingSchedule, setIsDeletingSchedule] = useState(false);

  const { schedule } = useContext(ScheduleContext);

  return (
    <>
      <div className="flex justify-between items-center text-gray-400 dark:text-menu-foreground">
        <div className="flex items-center text-gray-400 dark:text-menu-foreground">
          <ScheduleSelect />
          <div className="flex ml-3">
            <ActionItem onClick={() => setIsAddingSchedule(true)}>
              <Popover
                title="New Schedule"
                isOpen={isAddingSchedule}
                toggle={(val) => setIsAddingSchedule(val)}
                trigger={<TablerCalendarPlus />}
              >
                <AddNewScheduleMenu toggle={() => setIsAddingSchedule(false)} />
              </Popover>
            </ActionItem>
            <ActionItem
              onClick={() => setIsEditingSchedule(true)}
              className="ml-2 mr-1"
            >
              <Popover
                title="Edit Schedule"
                isOpen={isEditingSchedule}
                toggle={(val) => setIsEditingSchedule(val)}
                trigger={<TablerEdit />}
              >
                <EditScheduleMenu toggle={() => setIsEditingSchedule(false)} />
              </Popover>
            </ActionItem>
            <ActionItem
              onClick={() => setIsDeletingSchedule(true)}
              className="hover:text-red-400 dark:hover:text-red-400"
            >
              <Popover
                title="Confirm"
                isOpen={isDeletingSchedule}
                toggle={(val) => setIsDeletingSchedule(val)}
                trigger={<TablerTrash />}
              >
                <DeleteScheduleMenu
                  toggle={() => setIsDeletingSchedule(false)}
                />
              </Popover>
            </ActionItem>
          </div>
          <Separator
            orientation="vertical"
            className="w-px bg-primary-border h-5 mx-3"
          />
          <div>
            <span className="text-primary-foreground">
              Credits: {schedule.credits}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-primary-foreground">
            Can't find your course?
          </span>
          <AddCourseDialog label="Add it manually" />
        </div>
      </div>
    </>
  );
}

function Popover({
  isOpen,
  toggle,
  title,
  children,
  trigger,
}: {
  title: string;
  isOpen: boolean;
  toggle: (val: boolean) => void;
  children: React.ReactNode;
  trigger: React.ReactNode;
}) {
  return (
    <BasePopover.Root open={isOpen} onOpenChange={(val) => toggle(val)}>
      <BasePopover.Trigger className="flex">{trigger}</BasePopover.Trigger>
      <BasePopover.Portal>
        <BasePopover.Positioner sideOffset={8}>
          <BasePopover.Popup className="origin-[var(--transform-origin)] rounded-md bg-[canvas] p-3 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
            <BasePopover.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
              <ArrowSvg />
            </BasePopover.Arrow>
            <BasePopover.Title className="text-base font-medium">
              {title}
            </BasePopover.Title>
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-[canvas]"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-gray-200 dark:fill-none"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="dark:fill-gray-300"
      />
    </svg>
  );
}

function AddNewScheduleMenu({ toggle }: { toggle: () => void }) {
  const { schedulesManager } = useContext(SchedulesManagerContext);

  const [newScheduleName, setNewScheduleName] = useState(
    `Schedule #${schedulesManager.getAllSchedules().length + 1}`
  );

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <label>Enter a name:</label>
      <Input
        placeholder={newScheduleName}
        onChange={(e) => setNewScheduleName(e.target.value)}
      />
      <div className="flex items-center gap-1 mt-2">
        <Button variant="secondary" onClick={toggle} className="flex-1">
          Cancel
        </Button>
        <Button
          onClick={() => {
            schedulesManager.onAddSchedule(newScheduleName);
            toggle();
          }}
          className="flex-1"
        >
          Create
        </Button>
      </div>
    </div>
  );
}

function EditScheduleMenu({ toggle }: { toggle: () => void }) {
  const { schedulesManager } = useContext(SchedulesManagerContext);
  const selectedSchedule = schedulesManager.getSelectedSchedule();

  const [newScheduleName, setNewScheduleName] = useState(selectedSchedule.name);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <label>Enter a new name:</label>
      <Input
        placeholder={newScheduleName}
        onChange={(e) => setNewScheduleName(e.target.value)}
        value={newScheduleName}
      />
      <div className="flex items-center gap-1 mt-2">
        <Button variant="secondary" onClick={toggle} className="flex-1">
          Cancel
        </Button>
        <Button
          onClick={() => {
            selectedSchedule.setName(newScheduleName);
            toggle();
          }}
          className="flex-1"
        >
          Save
        </Button>
      </div>
    </div>
  );
}

function DeleteScheduleMenu({ toggle }: { toggle: () => void }) {
  const { schedulesManager } = useContext(SchedulesManagerContext);
  const selectedSchedule = schedulesManager.getSelectedSchedule();

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center gap-1 mt-2">
        <Button
          onClick={toggle}
          variant="secondary"
          className="flex-1 py-2 px-3"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            schedulesManager.onRemoveSchedule(selectedSchedule);
            toggle();
          }}
          className="flex-1 py-2 px-3"
          variant="danger"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export function ActionItem({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "p-1 hover:text-gray-500 dark:hover:text-menu-foreground-hover hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-md",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
