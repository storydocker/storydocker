import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Button } from "./Button";
import * as stories from './Button.stories';
import { getElements, ensureElements, mouseInteraction, keyboardInteraction } from './Button.shared-spec';

const { Primary, Secondary, Large, Small } = composeStories(stories);

/**
 * Uses the shared spec assertions inside vitest test functions
 * @param Component - OG component or a composed-via-storybook version
 * @param args - props to pass to the component
 */
const buttonTestSuite = (Component, args) => {
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

describe('Button', () => {
  describe('Configured by Storybook boilerplate stories', () => {
    describe('Primary', () => {
      buttonTestSuite(Primary, Primary.args);
    });
    describe('Secondary', () => {
      buttonTestSuite(Secondary, Secondary.args);
    });
    describe('Large', () => {
      buttonTestSuite(Large, Large.args);
    });
    describe('Small', () => {
      buttonTestSuite(Small, Small.args);
    });
  });
  describe('Not configured in boilerplate', () => {
    describe('Background color', () => {
      const props = {
        label: 'background color',
        backgroundColor: 'red',
      }
      buttonTestSuite(Button, props);
    });
    describe('OnClick event given function', () => {
      const props = {
        label: 'onclicker',
        onClick: vi.fn(),
      }
      buttonTestSuite(Button, props);
    });
  })
})
