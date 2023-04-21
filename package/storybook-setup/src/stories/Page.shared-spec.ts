import { within } from '@storybook/testing-library';
import { StepFunction } from '@storybook/types';

import type { PageProps } from './Page';
import { getElements as headerGetElements, ensureElements as headerEnsureElements, mouseInteraction as headerMouseInteraction, keyboardInteraction as headerKeyboardInteraction } from './Header.shared-spec';

/**
 * Extract elements from an HTMLElement
 */
export const getElements = async (canvasElement: HTMLElement) => {
  const screen = within(canvasElement);
  const headerElements = await headerGetElements(canvasElement);

  return {
    ...headerElements,
    screen,
  };
}

/**
 * Helper to add flair when test is shared
 */
const isShared = (shared = false) => shared ? '🤝' : '';

/**
 * Ensure elements are present and have the correct attributes/content
 */
export const ensureElements = async (elements: any, args: PageProps, step: StepFunction<any, any>) => {
  await headerEnsureElements(elements, args, step, true);
}

/**
 * Test mouse interaction
 */
export const mouseInteraction = async (elements: any, args: PageProps, step: StepFunction<any, any>) => {
  await headerMouseInteraction(elements, args, step, true);
}

/**
 * Test keyboard interaction
 */
export const keyboardInteraction = async (elements: any, args: PageProps, step: StepFunction<any, any>) => {
  await headerKeyboardInteraction(elements, args, step, true);
}