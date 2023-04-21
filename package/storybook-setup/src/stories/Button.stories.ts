import type { Meta, StoryObj } from '@storybook/web-components';
import type { ButtonProps } from './Button';
import { Button } from './Button';
import { getElements, ensureElements, mouseInteraction, keyboardInteraction } from './Button.shared-spec';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/web-components/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  tags: ['autodocs'],
  render: (args) => Button(args),
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'onClick' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args, step);
    await mouseInteraction(elements, args, step);
    await keyboardInteraction(elements, args, step);
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
  play: Primary.play,
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
  play: Primary.play,
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
  play: Primary.play,
};

export const BackgroundColor: Story = {
  args: {
    label: 'With Background',
    backgroundColor: 'purple',
  },
  play: Primary.play,
};
