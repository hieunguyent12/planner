import type { Meta, StoryObj } from "@storybook/react-vite";

import { SearchResult as SearchResultComp } from ".";
import { Container } from "@/components/container";

const meta = {
  title: "Search Result",
  component: SearchResultComp,
  decorators: [
    (Story) => {
      return (
        <div className="grid grid-cols-4 gap-4 items-start">
          <Container className="col-span-1 h-[500px]">
            <Story />
          </Container>
        </div>
      );
    },
  ],
} satisfies Meta<typeof SearchResultComp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchResult: Story = {};
