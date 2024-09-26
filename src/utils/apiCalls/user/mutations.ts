import type { CreateUserResponse } from './index'
import { createUser } from './index'

import type { User } from '@/types/user'

import type { UseMutationResult } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

type CreateUserParams = {
    data: Partial<User>
    JWT: string
}

/**
 * Custom hook for creating a user using React Query's useMutation.
 *
 * This hook encapsulates the logic for creating a user, leveraging React Query's
 * powerful state management and caching capabilities. It returns a mutation
 * result object that includes functions to trigger the mutation and access
 * its state (loading, error, data).
 * @returns {UseMutationResult} A mutation result object for creating a user, which includes methods like mutate, mutateAsync, and properties like isLoading, isError, and data.
 */
export const useCreateUser = (): UseMutationResult<
    CreateUserResponse,
    Error,
    CreateUserParams
> => {
    return useMutation<CreateUserResponse, Error, CreateUserParams>({
        mutationFn: ({ data, JWT }) => createUser(data, JWT),
    })
}
