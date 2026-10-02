'use client';

import { environmentManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true
      }
    }
  });

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
