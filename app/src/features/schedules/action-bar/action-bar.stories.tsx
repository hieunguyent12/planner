import type { Meta, StoryObj } from "@storybook/react-vite";

import { ActionBar } from ".";

const meta = {
  title: "Schedule Actions Bar",
  component: ActionBar,
  decorators: [
    (Story) => {
      return (
        <div className="bg-menu w-[300px] inline-block rounded-md shadow shadow-gray-200 p-2">
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof ActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ScheduleActionsBar: Story = {};
