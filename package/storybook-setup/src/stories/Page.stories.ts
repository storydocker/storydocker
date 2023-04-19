import type { Meta, StoryObj } from '@storybook/web-components';

import type { PageProps } from './Page';
import { Page } from './Page';
import * as HeaderStories from './Header.stories';
import { getElements, ensureElements, mouseInteraction, keyboardInteraction } from './Page.shared-spec';


const meta = {
  title: 'StoryDocker/Page',
  tags: ['autodocs'],
  render: (args: PageProps) => Page(args),
} satisfies Meta<PageProps>;

export default meta;
type Story = StoryObj<PageProps>;

export const LoggedIn: Story = {
  args: {
    ...HeaderStories.LoggedIn.args,
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args, step);
    await mouseInteraction(elements, args, step);
    await keyboardInteraction(elements, args, step);
  },
};

export const LoggedOut: Story = {
  args: {
    ...HeaderStories.LoggedOut.args,
  },
  play: LoggedIn.play,
};
