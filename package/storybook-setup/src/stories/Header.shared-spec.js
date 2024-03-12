import { within, userEvent } from '@storybook/test';

import {
  ensureElements as buttonEnsureElements,
  mouseInteraction as buttonMouseInteraction,
  keyboardInteraction as buttonKeyboardInteraction,
  ensureElementsStep as buttonEnsureElementsStep,
  mouseInteractionStep as buttonMouseInteractionStep,
  keyboardInteractionStep as buttonKeyboardInteractionStep
} from './Button.shared-spec';

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


export const ensureElementsChildren = async (elements, args, step, shared = false) => {
  const btnEnsureElms = step ? buttonEnsureElementsStep : buttonEnsureElements;
  const { buttons } = elements;
  if (args.user) {
    await btnEnsureElms({ button: buttons[0] }, {
      label: 'Log out',
      size: 'small',
    }, step, true);
  } else {
    await btnEnsureElms({ button: buttons[0] }, {
      label: 'Log in',
      size: 'small',
    }, step, true);
    await btnEnsureElms({ button: buttons[1] }, {
      label: 'Sign up',
      size: 'small',
      primary: true,
    }, step, true);
  }
}

/**
 * Ensure elements are present and have the correct attributes/content
 */
export const ensureElements = async (elements, args) => {
  const { buttons } = elements;
  await expect(elements.header).toBeTruthy();
  await expect(elements.title).toBeTruthy();
  await expect(elements.title).toHaveTextContent('Acme');
  if (args.user) {
    await expect(buttons).toHaveLength(1);
  } else {
    await expect(buttons).toHaveLength(2);
  }
}

/**
 * Ensure elements wrapped in Storybook's `step` function
 */
export const ensureElementsStep = async (elements, args, step, shared = false) => {
  await step(`Elements: Header ${isShared(shared)}`, async () => {
    await ensureElements(elements, args);
    await ensureElementsChildren(elements, args, step, shared);
  });
}

/**
 * Test mouse interaction for Logged In user
 */
export const mouseIntereactionLoggedIn = async (elements, args, step, shared = false) => {
  const { buttons } = elements;
  const btnMouseInt = step ? buttonMouseInteractionStep : buttonMouseInteraction;
  await btnMouseInt({ button: buttons[0] }, {
    label: 'Log out',
    size: 'small',
    onClick: args.onLogout,
  }, step, true);
}

/**
 * Test mouse interaction for Logged Out user
 */
export const mouseIntereactionLoggedOut = async (elements, args, step, shared = false) => {
  const { buttons } = elements;
  const btnMouseInt = step ? buttonMouseInteractionStep : buttonMouseInteraction;
  await btnMouseInt({ button: buttons[0] }, {
    label: 'Log in',
    size: 'small',
    onClick: args.onLogin,
  }, step, true);
  if (args.userSetState) {
    await args.userSetState();
  }
  await btnMouseInt({ button: buttons[1] }, {
    label: 'Sign up',
    size: 'small',
    primary: true,
    onClick: args.onCreateAccount,
  }, step, true);
  if (args.userSetState) {
    await args.userSetState();
  }
}

/**
 * Test mouse interaction for the Header component
 */
export const mouseInteraction = async (elements, args) => {
  if (args.user) {
   await mouseIntereactionLoggedIn(elements, args);
  } else {
    await mouseIntereactionLoggedOut(elements, args);
  }
}

/**
 * Mouse interaction test wrapped in Storybook's `step` function
 */
export const mouseInteractionStep = async (elements, args, step, shared = false) => {
  if (args.user) {
    await step(`Mouse: Logged in user ${isShared(shared)}`, async () => {
      await mouseIntereactionLoggedIn(elements, args, step, shared);
    });
  } else {
    await step(`Mouse: Logged out user ${isShared(shared)}`, async () => {
      await mouseIntereactionLoggedOut(elements, args, step, shared);
    });
  }
}

/**
 * Test keyboard navigation for Logged In user
 */
export const keyboardNavigationLoggedIn = async (elements, args) => {
  const { buttons, header } = elements;
  await expect(buttons).toHaveLength(1);
  await userEvent.tab({ focusTrap: header });
  await expect(buttons[0]).toHaveFocus();
}

/**
 * Test keyboard navigation for Logged Out user
 */
export const keyboardNavigationLoggedOut = async (elements, args) => {
  const { buttons, header } = elements;
  await expect(buttons).toHaveLength(2);
  await userEvent.tab({ focusTrap: header });
  await expect(buttons[0]).toHaveFocus();
  await userEvent.tab({ focusTrap: header });
  await expect(buttons[1]).toHaveFocus();
}

/**
 * Test keyboard interaction for Logged In user
 */
export const keyboardIntereactionLoggedIn = async (elements, args, step, shared = false) => {
  const { buttons } = elements;
  const btnKeyboardInt = step ? buttonKeyboardInteractionStep : buttonKeyboardInteraction;
  await btnKeyboardInt({ button: buttons[0] }, {
    label: 'Log out',
    size: 'small',
    onClick: args.onLogout,
  }, step, true);
}

/**
 * Test keyboard interactions for Logged Out user
 */
export const keyboardIntereactionLoggedOut = async (elements, args, step, shared = false) => {
  const { buttons } = elements;
  const btnKeyboardInt = step ? buttonKeyboardInteractionStep : buttonKeyboardInteraction;
  await btnKeyboardInt({ button: buttons[0] }, {
    label: 'Log in',
    size: 'small',
    onClick: args.onLogin,
  }, step, true);
  await btnKeyboardInt({ button: buttons[1] }, {
    label: 'Sign up',
    size: 'small',
    primary: true,
    onClick: args.onCreateAccount,
  }, step, true);
}

/**
 * Test keyboard interactions
 */
export const keyboardInteraction = async (elements, args) => {
  if (args.user) {
    await keyboardNavigationLoggedIn(elements, args);
    await keyboardIntereactionLoggedIn(elements, args);
  } else {
    await keyboardNavigationLoggedOut(elements, args);
    await keyboardIntereactionLoggedOut(elements, args);
  }
}

/**
 * Test keyboard interactions wrapped in Storybook's `step` functions
 */
export const keyboardInteractionStep = async (elements, args, step, shared = false) => {
  if (args.user) {
    await step(`Keyboard: Logged in user ${isShared(shared)}`, async () => {
      await step(`Tab to button ${isShared(shared)}`, async () => {
        await keyboardNavigationLoggedIn(elements, args);
      });
      await keyboardIntereactionLoggedIn(elements, args, step, shared);
    });
  } else {
    await step(`Keyboard: Logged out user ${isShared(shared)}`, async () => {
      await step(`Tab to buttons ${isShared(shared)}`, async () => {
        await keyboardNavigationLoggedOut(elements, args);
      });
      await keyboardIntereactionLoggedOut(elements, args, step, shared);
    });
  }
}