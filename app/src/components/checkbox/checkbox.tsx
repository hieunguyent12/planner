import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";
import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import TablerCheck from "~icons/tabler/check";

export function CheckboxGroup({ children }: { children: React.ReactNode }) {
  return (
    <BaseCheckboxGroup
      aria-labelledby="filters-caption"
      className="flex flex-wrap items-start gap-5 text-primary-foreground"
    >
      {children}
    </BaseCheckboxGroup>
  );
}

export function Checkbox({ name, value }: { name: string; value: any }) {
  return (
    <BaseCheckbox.Root
      name={name}
      value={value}
      className="flex size-5 items-center justify-center rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 data-[checked]:bg-gray-800 dark:data-[checked]:bg-gray-200 data-[unchecked]:border data-[unchecked]:border-gray-300"
    >
      <BaseCheckbox.Indicator className="flex data-[unchecked]:hidden text-white dark:text-gray-800">
        <TablerCheck className="size-4" />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
