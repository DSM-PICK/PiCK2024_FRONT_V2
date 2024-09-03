import type { Meta } from '@storybook/react';

import Input from '../../../src/components/input/index';

export default {
  title: 'components/input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    widthtype: {
      options: ['long', 'login'],
      control: 'radio',
    },
    label: {
      control: 'text',
    },
    password: {
      control: 'boolean',
    },
  },
} as Meta<typeof Input>;

export const InputDefault = {
  args: {
    placeholder: 'placeholder',
    widthType: 'long',
  },
};
