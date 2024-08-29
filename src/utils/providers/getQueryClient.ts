import { cache } from 'react'

import { queryOptions } from './ReactQuery'

import { QueryClient } from '@tanstack/react-query'

const getQueryClient = cache(() => new QueryClient(queryOptions))

export default getQueryClient
