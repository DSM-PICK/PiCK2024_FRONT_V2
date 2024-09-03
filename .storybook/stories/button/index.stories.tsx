import type { Meta } from '@storybook/react';

import { Button } from '../../../src/components/Button/index';

export default {
  title: 'components/button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    size: {
      options: ['standard', 'small'],
      control: 'radio',
    },
    type: {
      options: ['main', 'error', 'black', 'error2'],
      control: 'radio',
    },
  },
} as Meta<typeof Button>;

export const ButtonStory = {
  args: {
    children: 'content',
    size: 'standard',
    type: 'main',
  },
};
