import { useTheme } from "@/components/theme";
import { ScheduleContext } from "@/features/schedules/context";
import type { OnlineCourseSection } from "@/features/schedules/schedule";
import { useContext } from "react";
import TablerDeviceLaptop from "~icons/tabler/device-laptop";
import TablerX from "~icons/tabler/x";

type OnlineSectionProps = {
  onlineSections: OnlineCourseSection[];
  isRemovable?: boolean;
};
const OnlineSection = ({
  onlineSections,
  isRemovable = true,
}: OnlineSectionProps) => {
  const scheduleContext = useContext(ScheduleContext);
  const { theme } = useTheme();

  const isDarkTheme = theme === "dark" || theme === "system";

  return (
    onlineSections.length > 0 && (
      <div className="flex w-full text-sm">
        <div
          // className="text-[10px] sm:text-xs text-muted-foreground"
          className="text-lg text-primary-foreground relative pl-2 pt-2 opacity-65"
          style={{
            width: "34px",
          }}
        >
          <TablerDeviceLaptop />
        </div>
        <div className="grow-1">
          {onlineSections.map((c) => {
            const backgroundColor = isDarkTheme ? "#2B2B2B" : c.color.bg;
            const backgroundHoverColor = isDarkTheme
              ? "#292929"
              : c.color.hover;

            return (
              <div
                key={c.id}
                className="relative min-h-15 border-calendar-border group"
              >
                <div
                  className="flex absolute w-full h-full cursor-pointer z-50"
                  style={{
                    backgroundColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      backgroundHoverColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = backgroundColor;
                  }}
                >
                  <div
                    className="w-1 h-full"
                    style={{
                      backgroundColor: c.color.side,
                    }}
                  ></div>
                  <div className="px-1 text-[11px] sm:text-sm w-full">
                    <div className="flex justify-between w-full">
                      <p className="py-1 font-sm">{c.code}</p>
                      {isRemovable && (
                        <button
                          onClick={() => scheduleContext.onRemoveSection(c)}
                          className="invisible group-hover:visible cursor-pointer"
                        >
                          <TablerX className="size-4 hover:text-red-600" />
                        </button>
                      )}
                    </div>

                    <p className="text-muted-foreground font-xs">💻 Online</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export { OnlineSection };
