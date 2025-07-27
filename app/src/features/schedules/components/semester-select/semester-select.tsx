import { CheckIcon, Select, SelectItem } from "@/components/select";

function SemesterSelect() {
  return (
    <Select
      placeholder={"Select semester"}
      defaultValue={"theme"}
      onValueChange={(value) => {}}
      className="text-sm border-none"
    >
      <SelectItem
        value="fall2025"
        text="🍂 Fall 2025"
        indicator={<CheckIcon className="size-3" />}
      />
      <SelectItem
        value="summer2025"
        text="☀️ Summer 2025"
        indicator={<CheckIcon className="size-3" />}
      />
      <SelectItem
        value="spring2025"
        text="🍀 Spring 2025"
        indicator={<CheckIcon className="size-3" />}
      />
    </Select>
  );
}

export { SemesterSelect };
