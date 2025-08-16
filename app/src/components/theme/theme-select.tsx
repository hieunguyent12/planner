import { useTheme, type Theme } from "./theme-provider";
import { Select, SelectItem } from "@/components/select";
import TablerCheck from "~icons/tabler/check";

// https://base-ui.com/react/components/select
export function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  return (
    <Select
      placeholder={theme}
      value={theme}
      onValueChange={(value) => {
        setTheme(value as Theme);
      }}
    >
      <SelectItem
        value="dark"
        text="Dark"
        indicator={<TablerCheck className="size-3.5" />}
      />
      <SelectItem
        value="light"
        text="Light"
        indicator={<TablerCheck className="size-3.5" />}
      />
      <SelectItem
        value="system"
        text="System"
        indicator={<TablerCheck className="size-3.5" />}
      />
    </Select>
  );
}
