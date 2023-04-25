import { expect, jest } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';

/**
 * Extract elements from an HTMLElement
 */
export const getElements = async (canvasElement) => {
  const screen = within(canvasElement);

  return { 
    screen,
    button: await screen.queryByRole('button'),
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
  const { button } = elements;
  const buttonName = args.label ? args.label : 'Button';
  await step(`Elements: "${buttonName}" button ${isShared(shared)}`, async () => {
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
export const mouseInteraction = async (elements, args, step, shared = false) => {
  if (!args.onClick) return;
  const { button } = elements;
  const buttonName = args.label ? args.label : 'Button';
  await step(`Mouse: "${buttonName}" button ${isShared(shared)}`, async () => {
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    // @ts-ignore
    await args.onClick.mockClear();
  });
}

/**
 * Test keyboard interaction
 */
export const keyboardInteraction = async (elements, args, step, shared = false) => {
  if (!args.onClick) return;
  const { button } = elements;
  const buttonName = args.label ? args.label : 'Button';
  await step(`Keyboard: "${buttonName}" button ${isShared(shared)}`, async () => {
    await button.focus();
    await userEvent.keyboard('{enter}');
    await expect(args.onClick).toHaveBeenCalled();
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    // @ts-ignore
    await args.onClick.mockClear();
  });
}