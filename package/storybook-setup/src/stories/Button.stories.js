import { Button } from './Button';
import { getElements, ensureElements, mouseInteraction, keyboardInteraction } from './Button.shared-spec';


// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    label: 'Primary',
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args, step);
    await mouseInteraction(elements, args, step);
    await keyboardInteraction(elements, args, step);
  },
};

export const Secondary = {
  args: {
    label: 'Button',
  },
  play: Primary.play,
};

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
  play: Primary.play,
};

export const Small = {
  args: {
    size: 'small',
    label: 'Button',
  },
  play: Primary.play,
};

export const BackgroundColor = {
  args: {
    label: 'With Background',
    backgroundColor: 'pink',
  },
  play: Primary.play,
};
