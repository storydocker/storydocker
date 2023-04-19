import { expect, jest } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import { StepFunction } from '@storybook/types';

import type { ButtonProps } from './Button';

const mockOnClick = jest.fn();

/**
 * Extract elements from an HTMLElement
 * @todo what `type` is being returned? Need `screen` type at least
 */
export const getElements = async (canvasElement: HTMLElement) => {
  const screen = within(canvasElement);
  const button = await screen.queryByRole('button');

  return { 
    screen,
    button,
  };
}

/**
 * Ensure elements are present and have the correct attributes/content
 */
export const ensureElements = async (elements: any, args: ButtonProps, step: StepFunction<any, ButtonProps>) => {
  const { button } = elements;
  const buttonName = args.label ? args.label : 'Button';
  await step(`${buttonName} button element config`, async () => {
    await expect(button).toBeTruthy();
    await expect(button).toHaveTextContent(args.label);
    if (args.primary) {
      await expect(button).toHaveClass('storybook-button--primary');
    } else {
      await expect(button).toHaveClass('storybook-button--secondary');
    }
    if (args.size) {
      await expect(button).toHaveClass(`storybook-button--${args.size}`);
    } else {
      await expect(button).toHaveClass(`storybook-button--medium`);
    }
    if (args.backgroundColor) {
      await expect(button).toHaveAttribute('style', expect.stringContaining('background-color'));
    } else {
      await expect(button).not.toHaveAttribute('style', expect.stringContaining('background-color'));
    }
  });
}

/**
 * Test mouse interaction
 */
export const mouseInteraction = async (elements: any, args: ButtonProps, step: StepFunction<any, ButtonProps>) => {
  const { button } = elements;
  const buttonName = args.label ? args.label : 'Button';
  const onClick = args.onClick ? args.onClick : mockOnClick;
  await step(`${buttonName} mouse interaction`, async () => {
    await userEvent.click(button);
    await expect(onClick).toHaveBeenCalled();
    await expect(onClick).toHaveBeenCalledTimes(1);
    // @ts-ignore
    await onClick.mockClear();
  });
}

/**
 * Test keyboard interaction
 */
export const keyboardInteraction = async (elements: any, args: ButtonProps, step: StepFunction<any, ButtonProps>) => {
  const { button } = elements;
  const buttonName = args.label ? args.label : 'Button';
  const onClick = args.onClick ? args.onClick : mockOnClick;
  await step(`${buttonName} keyboard interaction`, async () => {
    await button.focus();
    await userEvent.keyboard('{enter}');
    await expect(onClick).toHaveBeenCalled();
    await expect(onClick).toHaveBeenCalledTimes(1);
    // @ts-ignore
    await onClick.mockClear();
  });
}