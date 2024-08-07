import type { Meta, StoryObj } from '@storybook/react';

import Index from './index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const meta = {
  component: Index,
} satisfies Meta<typeof Index>;

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } },
});

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
