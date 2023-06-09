import { within, userEvent } from '@storybook/testing-library';

import { 
  getElements as headerGetElements,
  ensureElements as headerEnsureElements,
  ensureElementsStep as headerEnsureElementsStep,
  mouseInteraction as headerMouseInteraction,
  mouseInteractionStep as headerMouseInteractionStep,
  keyboardInteraction as headerKeyboardInteraction,
  keyboardInteractionStep as headerKeyboardInteractionStep,
} from './Header.shared-spec';

export const userSetState = async (canvasElement) => {
  const canvas = within(canvasElement);
  const loginButton = await canvas.queryByRole('button', {
    name: /Log in/i,
  });
  if (loginButton) {
    await userEvent.click(loginButton);
  }
}
/**
 * Extract elements from an HTMLElement
 */
export const getElements = async (canvasElement) => {
  const screen = within(canvasElement);
  const headerElements = await headerGetElements(canvasElement);
  return {
    ...headerElements,
    screen,
  };
}

/**
 * Ensure elements are present and have the correct attributes/content
 */
export const ensureElements = async (elements, args) => {
  await headerEnsureElements(elements, args);
}

/**
 * Ensure elements wrapped in Storybook's `step` function
 */
export const ensureElementsStep = async (elements, args, step, shared = false) => {
  await headerEnsureElementsStep(elements, args, step, true);
}

/**
 * Test mouse interaction
 */
export const mouseInteraction = async (elements, args) => {
  await headerMouseInteraction(elements, args);
}

/**
 * Mouse interaction test wrapped in Storybook's `step` function
 */
export const mouseInteractionStep = async (elements, args, step, shared = false) => {
  await headerMouseInteractionStep(elements, args, step, true);
}

/**
 * Test keyboard interaction
 */
export const keyboardInteraction = async (elements, args) => {
  await headerKeyboardInteraction(elements, args);
}

/**
 * Keyboard interaction test wrapped in Storybook's `step` function
 */
export const keyboardInteractionStep = async (elements, args, step, shared = false) => {
  await headerKeyboardInteractionStep(elements, args, step, true);
}