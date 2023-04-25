import { within, userEvent } from '@storybook/testing-library';

import { Page } from './Page';
import * as HeaderStories from './Header.stories';
import { getElements, ensureElements, mouseInteraction, keyboardInteraction } from './Page.shared-spec';


const meta = {
  title: 'Example/Page',
  tags: ['autodocs'],
  render: (args) => Page(args),
};

export default meta;

export const LoggedIn = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    args.userSetState = async () => {
      const loginButton = await canvas.queryByRole('button', {
        name: /Log in/i,
      });
      if (loginButton) {
        await userEvent.click(loginButton);
      }
    }
    await args.userSetState();
    args.user = {
      name: 'Jane Doe',
    };
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args, step);
    await mouseInteraction(elements, args, step);
    await keyboardInteraction(elements, args, step);
  },
};

export const LoggedOut = {
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args, step);
    await mouseInteraction(elements, args, step);
    await keyboardInteraction(elements, args, step);
  },
};
