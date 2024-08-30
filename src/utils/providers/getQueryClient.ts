/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {
    defaultShouldDehydrateQuery,
    isServer,
    QueryClient,
} from '@tanstack/react-query'

const makeQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1_000,
            },
            dehydrate: {
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending',
            },
        },
    })
}

// eslint-disable-next-line @typescript-eslint/init-declarations
let browserQueryClient: QueryClient | undefined

export const getQueryClient = () => {
    if (isServer) {
        // Server: always make a new query client
        return makeQueryClient()
    }

    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
}
