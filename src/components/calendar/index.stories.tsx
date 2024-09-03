import type { Meta, StoryObj } from '@storybook/react';

import Index from './index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default {
  title: 'components/calendar',
  component: Index,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['selfStudy', 'schedule'],
      control: 'radio',
    },
  },
} as Meta<typeof Index>;

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } },
});

export const Default: StoryObj<typeof Index> = {
  args: {
    type: 'schedule',
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};
