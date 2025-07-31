import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";
import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import TablerCheck from "~icons/tabler/check";
import { cn } from "@/utils/cn";

export function CheckboxGroup({
  children,
  value,
  className,
  onValueChange,
  disabled,
}: {
  children: React.ReactNode;
  value?: string[];
  onValueChange?: (val: string[]) => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <BaseCheckboxGroup
      aria-labelledby="filters-caption"
      className={cn(
        "flex flex-wrap items-start text-primary-foreground data-[disabled]:opacity-40",
        className
      )}
      value={value}
      onValueChange={(val) => {
        onValueChange?.(val);
      }}
      disabled={disabled}
    >
      {children}
    </BaseCheckboxGroup>
  );
}

export function Checkbox({
  name,
  value,
  checked,
  onCheckedChange,
  disabled,
}: {
  name: string;
  value: any;
  checked?: boolean;
  onCheckedChange?: (val: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <BaseCheckbox.Root
      name={name}
      value={value}
      checked={checked}
      onCheckedChange={(val) => {
        onCheckedChange?.(val);
      }}
      disabled={disabled}
      className="flex size-5 items-center justify-center rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 data-[checked]:bg-gray-800 dark:data-[checked]:bg-gray-200 data-[unchecked]:border data-[unchecked]:border-gray-300 data-[disabled]:opacity-40"
    >
      <BaseCheckbox.Indicator className="flex data-[unchecked]:hidden text-white dark:text-gray-800">
        <TablerCheck className="size-4" />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
