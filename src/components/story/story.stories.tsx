import type { Meta, StoryObj } from '@storybook/react';

import Story from './story';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const meta = {
  component: Story,
} satisfies Meta<typeof Story>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'name',
    earlyreturn: 0,
    application: 0,
    id: 'id',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
