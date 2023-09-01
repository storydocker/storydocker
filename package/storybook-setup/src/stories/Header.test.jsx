import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Header } from './Header';
import { getElements, ensureElements, mouseInteraction, keyboardInteraction } from './Header.shared-spec';

const mockOnLogin = vi.fn();
const mockOnLogout = vi.fn();
const mockOnCreateAccount = vi.fn();

/**
 * Uses the shared spec assertions inside vitest test functions
 * @param Component - OG component or a composed-via-storybook version
 * @param args - props to pass to the component
 */
const headerTestSuite = (Component, args) => {
  it('should have properly configured attributes', async () => {
    const rendered = render(<Component {...args} />)
    const elements = await getElements(rendered.container);
    await ensureElements(elements, args);
  });
  it('should respond to mouse interaction', async () => {
    const rendered = render(<Component {...args} />)
    const elements = await getElements(rendered.container);
    await mouseInteraction(elements, args);
  });
  it('should respond to keyboard interaction', async () => {
    const rendered = render(<Component {...args} />)
    const elements = await getElements(rendered.container);
    await keyboardInteraction(elements, args);
  });
}

describe('Header', () => {
  describe('Configured by Storybook boilerplate stories', () => {
    describe('LoggedIn', () => {
      const args = {
        user: {
          name: 'Jane Doe',
        },
        onLogin: mockOnLogin,
        onLogout: mockOnLogout,
        onCreateAccount: mockOnCreateAccount,
      };
      headerTestSuite(Header, args);
    });
    describe('LoggedOut', () => {
      const args = {
        onLogin: mockOnLogin,
        onLogout: mockOnLogout,
        onCreateAccount: mockOnCreateAccount,
      };
      headerTestSuite(Header, args);
    });
  });
})
