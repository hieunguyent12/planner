import { Select } from "@/components/select";
import { SchedulesManagerContext } from "@/features/schedules/context";
import { useContext } from "react";
import TablerCheck from "~icons/tabler/check";

function ScheduleSelect() {
  const { schedulesManager } = useContext(SchedulesManagerContext);

  const selectedSchedule = schedulesManager.getSelectedSchedule();

  const schedules = schedulesManager.getAllSchedules().map((schedule) => {
    return {
      label: schedule.name,
      value: schedule.id,
    };
  });

  return (
    <div>
      <Select
        items={schedules}
        value={selectedSchedule.id}
        onValueChange={(value) => {
          // TODO: refactor this
          const idx = schedulesManager.getScheduleByIndexId(value);
          schedulesManager.onSetSelectedSchedule(idx === -1 ? 0 : idx);
        }}
        indicator={<TablerCheck className="size-3.5" />}
        className="w-40 text-base"
      />
    </div>
  );
}

export { ScheduleSelect };
