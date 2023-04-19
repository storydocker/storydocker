import { expect } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import { StepFunction } from '@storybook/types';

import type { HeaderProps } from './Header';
import { ensureElements as buttonEnsureElements, mouseInteraction as buttonMouseInteraction, keyboardInteraction as buttonKeyboardInteraction } from './Button.shared-spec';

/**
 * Extract elements from an HTMLElement
 * @todo what `type` is being returned? Need `screen` type at least
 */
export const getElements = async (canvasElement: HTMLElement) => {
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
 * Ensure elements are present and have the correct attributes/content
 */
export const ensureElements = async (elements: any, args: HeaderProps, step: StepFunction<any, any>) => {
  const { buttons } = elements;
  await step(`Header elements config`, async () => {
    await expect(elements.header).toBeTruthy();
    await expect(elements.title).toBeTruthy();
    await expect(elements.title).toHaveTextContent('Acme');
  });
  if (args.user) {
    await step(`Logged in user`, async () => {
      await expect(buttons).toHaveLength(1);
      await buttonEnsureElements({ button: buttons[0] }, {
        label: 'Log out',
        size: 'small',
      }, step);
    });
  } else {
    await expect(buttons).toHaveLength(2);
    await buttonEnsureElements({ button: buttons[0] }, {
      label: 'Log in',
      size: 'small',
    }, step);
    await buttonEnsureElements({ button: buttons[1] }, {
      label: 'Sign up',
      size: 'small',
      primary: true,
    }, step);
  }
}

/**
 * Test mouse interaction
 */
export const mouseInteraction = async (elements: any, args: HeaderProps, step: StepFunction<any, any>) => {
  const { buttons } = elements;
  if (args.user) {
    await step(`Logged in user`, async () => {
      await expect(buttons).toHaveLength(1);
      await buttonMouseInteraction({ button: buttons[0] }, {
        label: 'Log out',
        size: 'small',
        onClick: args.onLogout,
      }, step);
    });
  } else {
    await expect(buttons).toHaveLength(2);
    await buttonMouseInteraction({ button: buttons[0] }, {
      label: 'Log in',
      size: 'small',
      onClick: args.onLogin,
    }, step);
    await buttonMouseInteraction({ button: buttons[1] }, {
      label: 'Sign up',
      size: 'small',
      primary: true,
      onClick: args.onCreateAccount,
    }, step);
  }
}

/**
 * Test keyboard interaction
 */
export const keyboardInteraction = async (elements: any, args: HeaderProps, step: StepFunction<any, any>) => {
  const { buttons, header } = elements;
  if (args.user) {
    await step(`Logged in user`, async () => {
      await expect(buttons).toHaveLength(1);
      await step(`Tab to button`, async () => {
        await userEvent.tab({ focusTrap: header });
        await expect(buttons[0]).toHaveFocus();
      });
      await buttonKeyboardInteraction({ button: buttons[0] }, {
        label: 'Log out',
        size: 'small',
        onClick: args.onLogout,
      }, step);
    });
  } else {
    await expect(buttons).toHaveLength(2);
    await step(`Tab to buttons`, async () => {
      await userEvent.tab({ focusTrap: header });
      await expect(buttons[0]).toHaveFocus();
      await userEvent.tab({ focusTrap: header });
      await expect(buttons[1]).toHaveFocus();
    });
    await buttonKeyboardInteraction({ button: buttons[0] }, {
      label: 'Log in',
      size: 'small',
      onClick: args.onLogin,
    }, step);
    await buttonKeyboardInteraction({ button: buttons[1] }, {
      label: 'Sign up',
      size: 'small',
      primary: true,
      onClick: args.onCreateAccount,
    }, step);
  }
}