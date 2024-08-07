import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from '.';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    options: {
      control: { type: 'object' },
    },
    value: {
      control: { type: 'text' },
    },
    changeHandler: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: 3 },
];

export const Default: Story = {
  args: {
    options,
    value: '1',
    changeHandler: (value: string | number) => console.log(value),
  },
};
