import type { Meta, StoryObj } from "@storybook/react-vite";
import TablerSearch from "~icons/tabler/search";

import { Input } from ".";

const meta = {
  title: "Input",
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainInput: Story = {
  args: {
    autoComplete: "off",
  },
};

export const MainInputWithIcon: Story = {
  args: {
    icon: TablerSearch,
    autoComplete: "off",
  },
};
