import type { Meta, StoryObj } from '@storybook/react';

import Bottom from './bottom';

const meta = {
  component: Bottom,
} satisfies Meta<typeof Bottom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    firstOnclick: () => {},
    firstType: 'main',
    firstSize: 'small',
    firstContent: 'string',
    second: true,
    secondOnclick: () => {},
    secondType: 'main',
    secondSize: 'small',
    disabled: true,
    secondContent: 'string',
  },
};
