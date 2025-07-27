import type { Meta, StoryObj } from "@storybook/react-vite";

import { SearchCourse } from ".";

const meta = {
  title: "Search Courses",
  component: SearchCourse,
} satisfies Meta<typeof SearchCourse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ScheduleActionsBar: Story = {};
