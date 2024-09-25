'use client'

import { useEffect, useState } from 'react'

import { setAuthToken } from '../axiosInstances'
import { useAuth } from '@clerk/nextjs'
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

    const { getToken } = useAuth()

    useEffect(() => {
        const setToken = async (): Promise<void> => {
            const token = await getToken({ template: 'trocup-1' })
            if (token) {
                setAuthToken(token)
            }
        }
        setToken()
    }, [getToken])

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            {children}
        </QueryClientProvider>
    )
}
export default ReactQueryProvider
