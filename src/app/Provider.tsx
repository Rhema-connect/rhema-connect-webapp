'use client';
import React from 'react' 
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();
function Provider({ children }: any) {
  return (
   <QueryClientProvider client={queryClient}>
    {children}
   </QueryClientProvider>
  )
}

export default Provider