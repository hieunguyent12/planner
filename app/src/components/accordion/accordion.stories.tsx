import type { Meta, StoryObj } from "@storybook/react-vite";

import { Accordion as AccordionComp } from ".";
import { Container } from "../container";

const meta = {
  title: "Accordion",
  component: AccordionComp,
  decorators: [
    (Story) => {
      return (
        <Container>
          <Story />
        </Container>
      );
    },
  ],
} satisfies Meta<typeof AccordionComp>;

export default meta;
type Story = StoryObj<typeof meta>;

function PlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
    </svg>
  );
}

export const Accordion: Story = {
  args: {
    items: [
      {
        trigger: (
          <>
            <div>
              {/* <div className="flex items-center">
                <p className="text-sm bg-orange-100 rounded-md px-1 font-medium">
                  COP3503
                </p>
              </div> */}
              Programming Fundamentals 2
            </div>
            <PlusIcon className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 group-data-[panel-open]:rotate-45" />
          </>
        ),
        content: (
          <div className="px-3 py-2">
            <p>Test</p>
          </div>
        ),
      },
    ],
  },
};
