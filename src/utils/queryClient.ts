import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Fresh for 1 minute
      refetchOnWindowFocus: true, // Refetch on window focus
    },
  },
});
