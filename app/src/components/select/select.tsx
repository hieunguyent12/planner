import { Select as _Select } from "@base-ui-components/react/select";
import "./styles.css";
import { cn } from "@/utilts/cn";

type SelectProps = {
  defaultValue: any;
  placeholder: React.ReactNode;
  children: React.ReactNode;
  className?: string;

  onValueChange?: (val: any) => void;
};

// https://base-ui.com/react/components/select
export function Select({
  defaultValue,
  placeholder,
  children,
  onValueChange,
  className,
}: SelectProps) {
  return (
    <_Select.Root
      onValueChange={(value) => onValueChange?.(value)}
      defaultValue={defaultValue}
    >
      <_Select.Trigger className={cn("select-trigger", className)}>
        <_Select.Value className="capitalize" placeholder={placeholder} />
        <_Select.Icon className="flex">
          <ChevronUpDownIcon className="text-menu-foreground" />
        </_Select.Icon>
      </_Select.Trigger>
      <_Select.Portal>
        <_Select.Positioner
          alignItemWithTrigger={false}
          className="outline-none"
          sideOffset={8}
        >
          <_Select.ScrollUpArrow className="top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]" />
          <_Select.Popup className="group select-popup">
            {children}
          </_Select.Popup>
          <_Select.ScrollDownArrow className="bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]" />
        </_Select.Positioner>
      </_Select.Portal>
    </_Select.Root>
  );
}

type SelectItemProps = {
  value: any;
  text: string;
  indicator?: any;
};

export function SelectItem({ value, text, indicator }: SelectItemProps) {
  return (
    <_Select.Item className="select-item" value={value}>
      <_Select.ItemIndicator className="col-start-1">
        {indicator}
      </_Select.ItemIndicator>
      <_Select.ItemText className="col-start-2">{text}</_Select.ItemText>
    </_Select.Item>
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
