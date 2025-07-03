import clsx from "clsx";
import type { DayOfWeek, ScheduleBlock } from "@/types";
import type { DateTime } from "luxon";

type BlockProps = {
  children?: React.ReactNode;
  startHour: DateTime;
  day: DayOfWeek;
  collapsed: boolean;
  highlighted: boolean;
  onBlockSelected?: (block: ScheduleBlock) => void;
};

const Block = ({
  startHour,
  day,
  collapsed = false,
  highlighted = false,
  children,
  onBlockSelected,
}: BlockProps) => {
  return (
    <div
      className={clsx(
        "text-primary-foreground relative border-dashed border-r-1 border-b-1 border-calendar-border",
        collapsed ? "h-5" : "min-h-18",
        highlighted && "bg-slate-400 hover:bg-slate-500",
        !children && "hover:bg-calendar-block-hover"
      )}
      onClick={() =>
        onBlockSelected?.({
          day,
          start: startHour,
        })
      }
      style={{
        gridArea: `hour${startHour.hour} / ${day}`,
      }}
    >
      {children}
    </div>
  );
};

export { Block };
