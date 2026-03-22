import type { Preview } from "@storybook/react-vite";
import StoryWrapper from "../stories/helpers/StoryWrapper";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {},
    },
    docs: {
      source: {
        code: "",
      },
    },
  },
  decorators: [
    (Story, context) => {
      return <StoryWrapper Story={Story} context={context} />;
    },
  ],
  tags: ["autodocs"],
};

export default preview;
