import type { Meta, StoryObj } from "@storybook/react-vite";
import { AddCourseDialog } from "../add-course-dialog";

const meta = {
  title: "Add Course Dialog",
  component: AddCourseDialog,
} satisfies Meta<typeof AddCourseDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicAddCourseDialog: Story = {
  args: {
    isOpen: true,
    toggle: () => {},
  },
};
