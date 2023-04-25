import { jest } from '@storybook/jest';

import { Header } from './Header';
import { getElements, ensureElements, mouseInteraction, keyboardInteraction } from './Header.shared-spec';

const mockOnLogin = jest.fn();
const mockOnLogout = jest.fn();
const mockOnCreateAccount = jest.fn();

const meta = {
  title: 'Example/Header',
  tags: ['autodocs'],
  render: (args) => Header(args),
};

export default meta;

export const LoggedIn = {
  args: {
    user: {
      name: 'Jane Doe',
    },
    onLogin: mockOnLogin,
    onLogout: mockOnLogout,
    onCreateAccount: mockOnCreateAccount,
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args, step);
    await mouseInteraction(elements, args, step);
    await keyboardInteraction(elements, args, step);
  },
};

export const LoggedOut = {
  args: {
    onLogin: mockOnLogin,
    onLogout: mockOnLogout,
    onCreateAccount: mockOnCreateAccount,
  },
  play: LoggedIn.play,
};
