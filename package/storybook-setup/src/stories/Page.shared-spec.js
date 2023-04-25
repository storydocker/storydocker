import { within } from '@storybook/testing-library';

import { getElements as headerGetElements, ensureElements as headerEnsureElements, mouseInteraction as headerMouseInteraction, keyboardInteraction as headerKeyboardInteraction } from './Header.shared-spec';

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
export const ensureElements = async (elements, args, step) => {
  await headerEnsureElements(elements, args, step, true);
}

/**
 * Test mouse interaction
 */
export const mouseInteraction = async (elements, args, step) => {
  await headerMouseInteraction(elements, args, step, true);
}

/**
 * Test keyboard interaction
 */
export const keyboardInteraction = async (elements, args, step) => {
  await headerKeyboardInteraction(elements, args, step, true);
}