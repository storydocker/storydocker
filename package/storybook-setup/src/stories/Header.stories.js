import { fn } from '@storybook/test';

import { Header } from './Header';
import { getElements, ensureElementsStep, mouseInteractionStep, keyboardInteractionStep } from './Header.shared-spec';

const mockOnLogin = fn();
const mockOnLogout = fn();
const mockOnCreateAccount = fn();

const meta = {
  title: 'Example/Header',
  tags: ['autodocs'],
  component: Header,
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
    await ensureElementsStep(elements, args, step);
    await mouseInteractionStep(elements, args, step);
    await keyboardInteractionStep(elements, args, step);
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
