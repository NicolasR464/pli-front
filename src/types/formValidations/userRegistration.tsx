import { z } from 'zod'

import type { Address } from '../user'

export const userRegistrationSchema = z.object({
    pseudo: z
        .string()
        .min(3, {
            message: 'Le pseudo doit contenir au moins 3 caractères',
        })
        .max(20),
    avatarUrl: z.string().url(),
    addressInput: z.string().optional(),
    addressObject: z.custom<Address>().optional(),
})

export type UserRegistration = z.infer<typeof userRegistrationSchema>
