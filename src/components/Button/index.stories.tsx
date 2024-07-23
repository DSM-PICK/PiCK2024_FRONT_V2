import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './index';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {},
    children: '',
    type: 'main',
    size: 'standard',
  },
};
