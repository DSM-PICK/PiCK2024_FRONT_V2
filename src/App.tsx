import { RouterProvider } from 'react-router-dom';
import { Router } from './router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyle, theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import Toast from './components/toast';
import * as ChannelService from '@channel.io/channel-web-sdk-loader';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5000,
      retry: 1,
    },
  },
});

const CHATKEY = process.env.VITE_PUBLIC_CHAT_KEY || '';

ChannelService.loadScript();

ChannelService.boot({
  pluginKey: CHATKEY,
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Toast />
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
