import { Page } from './Page';
import { userSetState, getElements, ensureElementsStep, mouseInteractionStep, keyboardInteractionStep } from './Page.shared-spec';

const meta = {
  title: 'Example/Page',
  tags: ['autodocs'],
  render: (args) => Page(args),
};

export default meta;

export const LoggedIn = {
  play: async ({ args, canvasElement, step }) => {
    args.userSetState = await userSetState(canvasElement);
    args.user = {
      name: 'Jane Doe',
    };
    const elements = await getElements(canvasElement);
    await ensureElementsStep(elements, args, step);
    // turned off since `onClick`s are internal to component
    // await mouseInteractionStep(elements, args, step);
    await keyboardInteractionStep(elements, args, step);
  },
};

export const LoggedOut = {
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElementsStep(elements, args, step);
    // turned off since `onClick`s are internal to component
    // await mouseInteractionStep(elements, args, step);
    await keyboardInteractionStep(elements, args, step);
  },
};
