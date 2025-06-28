import { Select } from "@base-ui-components/react/select";
import { useTheme, type Theme } from "./theme-provider";
import "./styles.css";

// https://base-ui.com/react/components/select
export function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  return (
    <Select.Root
      defaultValue={theme}
      onValueChange={(value) => {
        setTheme(value as Theme);
      }}
    >
      <Select.Trigger className="select-trigger">
        <Select.Value className="capitalize" placeholder={theme} />
        <Select.Icon className="flex">
          <ChevronUpDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className="outline-none" sideOffset={8}>
          <Select.ScrollUpArrow className="top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]" />
          <Select.Popup className="group select-popup">
            <Select.Item className="select-item" value="dark">
              <Select.ItemIndicator className="col-start-1">
                <CheckIcon className="size-3" />
              </Select.ItemIndicator>
              <Select.ItemText className="col-start-2">Dark</Select.ItemText>
            </Select.Item>
            <Select.Item className="select-item" value="light">
              <Select.ItemIndicator className="col-start-1">
                <CheckIcon className="size-3" />
              </Select.ItemIndicator>
              <Select.ItemText className="col-start-2">Light</Select.ItemText>
            </Select.Item>
            <Select.Item className="select-item" value="system">
              <Select.ItemIndicator className="col-start-1">
                <CheckIcon className="size-3" />
              </Select.ItemIndicator>
              <Select.ItemText className="col-start-2">System</Select.ItemText>
            </Select.Item>
          </Select.Popup>
          <Select.ScrollDownArrow className="bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]" />
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

function ChevronUpDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M0.5 4.5L4 1.5L7.5 4.5" />
      <path d="M0.5 7.5L4 10.5L7.5 7.5" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}
