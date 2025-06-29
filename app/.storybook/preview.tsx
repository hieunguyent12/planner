import type { Preview } from "@storybook/react-vite";
import { ThemeProvider } from "../src/components/theme/theme-provider";

import "../src/index.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story, context) => {
      return (
        <div className="bg-menu w-full h-screen p-3">
          <ThemeProvider theme={context.globals.backgrounds?.value}>
            <Story />
          </ThemeProvider>
        </div>
      );
    },
  ],
};

export default preview;
