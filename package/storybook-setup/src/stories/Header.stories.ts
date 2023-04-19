import { jest } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { HeaderProps } from './Header';
import { Header } from './Header';
import { getElements, ensureElements, mouseInteraction, keyboardInteraction } from './Header.shared-spec';

const mockOnLogin = jest.fn();
const mockOnLogout = jest.fn();
const mockOnCreateAccount = jest.fn();

const meta = {
  title: 'StoryDocker/Header',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/web-components/writing-docs/docs-page
  tags: ['autodocs'],
  render: (args: HeaderProps) => Header(args),
} satisfies Meta<HeaderProps>;

export default meta;
type Story = StoryObj<HeaderProps>;

export const LoggedIn: Story = {
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

export const LoggedOut: Story = {
  args: {
    onLogin: mockOnLogin,
    onLogout: mockOnLogout,
    onCreateAccount: mockOnCreateAccount,
  },
  play: LoggedIn.play,
};
