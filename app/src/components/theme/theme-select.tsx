import { useTheme, type Theme } from "./theme-provider";
import { CheckIcon, Select, SelectItem } from "@/components/select";

// https://base-ui.com/react/components/select
export function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  return (
    <Select
      placeholder={theme}
      defaultValue={theme}
      onValueChange={(value) => {
        setTheme(value as Theme);
      }}
      className="absolute top-2 right-2 w-21 text-sm"
    >
      <SelectItem
        value="dark"
        text="Dark"
        indicator={<CheckIcon className="size-3" />}
      />
      <SelectItem
        value="light"
        text="Light"
        indicator={<CheckIcon className="size-3" />}
      />
      <SelectItem
        value="system"
        text="System"
        indicator={<CheckIcon className="size-3" />}
      />
    </Select>
  );
}
