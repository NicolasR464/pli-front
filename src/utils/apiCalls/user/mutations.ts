import type { CreateUserResponse } from './index'
import { createUser } from './index'

import type { User } from '@/types/user'

import type { UseMutationResult } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

type CreateUserParams = {
    data: Partial<User>
    JWT: string
}

export const useCreateUser = (): UseMutationResult<
    CreateUserResponse,
    Error,
    CreateUserParams
> => {
    return useMutation<CreateUserResponse, Error, CreateUserParams>({
        mutationFn: ({ data, JWT }) => createUser(data, JWT),
    })
}
