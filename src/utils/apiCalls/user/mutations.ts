import { createUser } from './index'

import type { CreateUserResponse } from '@/types/user'

import type { UseMutationResult } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const useCreateUser = (): UseMutationResult<
    CreateUserResponse,
    Error,
    string
> => {
    return useMutation<CreateUserResponse, Error, string>({
        mutationFn: (token: string) => createUser(token),
    })
}
