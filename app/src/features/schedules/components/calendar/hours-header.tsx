import { DateTime, type Interval } from "luxon";
import { NUM_HOURS_PER_DAY } from "./constants";

type HoursHeaderProps = {
  timeIntervalToRender?: Interval;
};

const HoursHeader = ({ timeIntervalToRender }: HoursHeaderProps) => {
  if (!timeIntervalToRender) return null;

  const hoursHeader = Array.from({ length: NUM_HOURS_PER_DAY }, (_, idx) => {
    const hour = DateTime.fromFormat(`${idx}:00`, "H:mm", {
      zone: "utc",
    });

    if (timeIntervalToRender.contains(hour)) {
      return (
        <div
          key={idx}
          className="flex items-start justify-end border-r-1 border-b-1 border-calendar-border"
          style={{
            gridArea: `hour${idx}`,
          }}
        >
          <span className="text-muted-foreground text-[10px] relative -left-1">
            {hour.toFormat("h a")}
          </span>
        </div>
      );
    }
  });

  return hoursHeader;
};

export { HoursHeader };
