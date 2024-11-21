'use client'

import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryOptions = {
    defaultOptions: {
        queries: {
            staleTime: 60 * 1_000,
        },
    },
}

const ReactQueryProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>): React.JSX.Element => {
    // eslint-disable-next-line react/hook-use-state
    const [queryClient] = useState(() => new QueryClient(queryOptions))

    return (
        <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools /> */}
            {children}
        </QueryClientProvider>
    )
}
export default ReactQueryProvider
