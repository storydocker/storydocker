import { expect, fn } from '@storybook/test';
global.expect = expect;

/** @type { import('@storybook/react').Preview } */
const preview = {
  args: {
    onClick: fn(),
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ['StoryDocker', 'Example'],
      },
    },
  },
};

export default preview;
