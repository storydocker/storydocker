import { expect } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';

import { ensureElements as buttonEnsureElements, mouseInteraction as buttonMouseInteraction, keyboardInteraction as buttonKeyboardInteraction } from './Button.shared-spec';

/**
 * Extract elements from an HTMLElement
 */
export const getElements = async (canvasElement) => {
  const screen = within(canvasElement);
  const buttons = await screen.queryAllByRole('button');
  const title = await screen.queryByRole('heading', { name: /Acme/i });

  return {
    screen,
    buttons,
    title,
    header: title?.closest('header'),
  };
}

/**
 * Helper to add flair when test is shared
 */
const isShared = (shared = false) => shared ? '🤝' : '';

/**
 * Ensure elements are present and have the correct attributes/content
 */
export const ensureElements = async (elements, args, step, shared = false) => {
  const { buttons } = elements;
  await step(`Elements: Header ${isShared(shared)}`, async () => {
    await expect(elements.header).toBeTruthy();
    await expect(elements.title).toBeTruthy();
    await expect(elements.title).toHaveTextContent('Acme');
    if (args.user) {
      await expect(buttons).toHaveLength(1);
    } else {
      await expect(buttons).toHaveLength(2);
    }
  });
  if (args.user) {
    await buttonEnsureElements({ button: buttons[0] }, {
      label: 'Log out',
      size: 'small',
    }, step, true);
  } else {
    await buttonEnsureElements({ button: buttons[0] }, {
      label: 'Log in',
      size: 'small',
    }, step, true);
    await buttonEnsureElements({ button: buttons[1] }, {
      label: 'Sign up',
      size: 'small',
      primary: true,
    }, step, true);
  }
}

/**
 * Test mouse interaction
 */
export const mouseInteraction = async (elements, args, step, shared = false) => {
  const { buttons } = elements;
  if (args.user) {
    await step(`Mouse: Logged in user ${isShared(shared)}`, async () => {
      await buttonMouseInteraction({ button: buttons[0] }, {
        label: 'Log out',
        size: 'small',
        onClick: args.onLogout,
      }, step, true);
    });
  } else {
    await step(`Mouse: Logged out user ${isShared(shared)}`, async () => {
      await buttonMouseInteraction({ button: buttons[0] }, {
        label: 'Log in',
        size: 'small',
        onClick: args.onLogin,
      }, step, true);
      if (args.userSetState) {
        await args.userSetState();
      }
      await buttonMouseInteraction({ button: buttons[1] }, {
        label: 'Sign up',
        size: 'small',
        primary: true,
        onClick: args.onCreateAccount,
      }, step, true);
      if (args.userSetState) {
        await args.userSetState();
      }
    });
  }
}

/**
 * Test keyboard interaction
 */
export const keyboardInteraction = async (elements, args, step, shared = false) => {
  const { buttons, header } = elements;
  if (args.user) {
    await step(`Keyboard: Logged in user ${isShared(shared)}`, async () => {
      await step(`Tab to button ${isShared(shared)}`, async () => {
        await expect(buttons).toHaveLength(1);
        await userEvent.tab({ focusTrap: header });
        await expect(buttons[0]).toHaveFocus();
      });
      await buttonKeyboardInteraction({ button: buttons[0] }, {
        label: 'Log out',
        size: 'small',
        onClick: args.onLogout,
      }, step, true);
    });
  } else {
    await step(`Keyboard: Logged out user ${isShared(shared)}`, async () => {
      await step(`Tab to buttons ${isShared(shared)}`, async () => {
        await expect(buttons).toHaveLength(2);
        await userEvent.tab({ focusTrap: header });
        await expect(buttons[0]).toHaveFocus();
        await userEvent.tab({ focusTrap: header });
        await expect(buttons[1]).toHaveFocus();
      });
      await buttonKeyboardInteraction({ button: buttons[0] }, {
        label: 'Log in',
        size: 'small',
        onClick: args.onLogin,
      }, step, true);
      await buttonKeyboardInteraction({ button: buttons[1] }, {
        label: 'Sign up',
        size: 'small',
        primary: true,
        onClick: args.onCreateAccount,
      }, step, true);
    });
  }
}