import type { Meta, StoryObj } from '@storybook/react';

import Search from './search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const meta = {
  component: Search,
} satisfies Meta<typeof Search>;

export default meta;

const queryClient = new QueryClient();

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: ({ text, name }) => {},
    value: 'string',
    type: 'Search',
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};
