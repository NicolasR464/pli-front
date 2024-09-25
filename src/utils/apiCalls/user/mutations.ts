import { createUser } from './index'

import type { User } from '@/types/user'

import type { UseMutationResult } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const useCreateUser = (): UseMutationResult<User, Error, string> => {
    return useMutation<User, Error, string>({
        mutationFn: (data: User) => createUser(data),
    })
}
