import { composeStories } from '@storybook/react'
import { render } from '@testing-library/react';

import * as stories from './Page.stories';
import { userSetState, getElements, ensureElements, mouseInteraction, keyboardInteraction } from './Page.shared-spec';

const { LoggedIn, LoggedOut } = composeStories(stories);

/**
 * Uses the shared spec assertions inside vitest test functions
 * @param Component - OG component or a composed-via-storybook version
 * @param args - props to pass to the component
 */
const pageTestSuite = (Component, args) => {
  it('should have properly configured attributes', async () => {
    const rendered = render(<Component {...args} />);
    if (args.user) {
      await userSetState(rendered.container);
    }
    const elements = await getElements(rendered.container);
    await ensureElements(elements, args);
  });
  it('should respond to mouse interaction', async () => {
    const rendered = render(<Component {...args} />)
    if (args.user) {
      await userSetState(rendered.container);
    }
    const elements = await getElements(rendered.container);
    await mouseInteraction(elements, args);
  });
  it('should respond to keyboard interaction', async () => {
    const rendered = render(<Component {...args} />)
    if (args.user) {
      await userSetState(rendered.container);
    }
    const elements = await getElements(rendered.container);
    await keyboardInteraction(elements, args);
  });
}

describe('Page', () => {
  describe('LoggedIn', () => {
    const args = {
      user: {
        name: 'Jane Doe',
      }
    };
    pageTestSuite(LoggedIn, args);
  });
  describe('LoggedOut', () => {
    pageTestSuite(LoggedOut, {});
  });
})