import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plan } from "..";
import type { Course } from "@/types";

const meta = {
  title: "Four Year Plan",
  component: Plan,
} satisfies Meta<typeof Plan>;

export default meta;
type Story = StoryObj<typeof meta>;

const courses: Course[] = [
  {
    id: "1",
    code: "MAC2303",
    name: "Calculus 3",
    description: "this is a description",

    credits: {
      min: 4,
      max: 4,
      display: "4",
    },
  },

  {
    id: "2",
    code: "ENT3003",
    name: "Intro to Entrepreneurship",
    description: "this is a description",

    credits: {
      min: 3,
      max: 3,
      display: "3",
    },
  },

  {
    id: "3",
    code: "ACG2001",
    name: "Financial Accounting",
    description: "this is a description",

    credits: {
      min: 4,
      max: 4,
      display: "4",
    },
  },
];

export const BasicFourYearPlan: Story = {
  args: {
    fourYearPlan: [
      {
        semesters: {
          fall: {
            courses,
          },
          spring: {
            courses,
          },
          summer: {
            courses,
          },
        },
      },
      {
        semesters: {
          fall: {
            courses,
          },
          spring: {
            courses,
          },
          summer: {
            courses,
          },
        },
      },
    ],
  },
};
