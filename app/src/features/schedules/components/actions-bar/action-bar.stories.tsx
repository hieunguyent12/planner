import type { Meta, StoryObj } from "@storybook/react-vite";

import { ActionsBar } from ".";
import { Container } from "@/components/container";

const meta = {
  title: "Schedule Actions Bar",
  component: ActionsBar,
  decorators: [
    (Story) => {
      return (
        <Container className="w-[300px]">
          <Story />
        </Container>
      );
    },
  ],
} satisfies Meta<typeof ActionsBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ScheduleActionsBar: Story = {};
