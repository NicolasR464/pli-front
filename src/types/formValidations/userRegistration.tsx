import { z } from 'zod'

import type { Address } from '@/types/address/userAddress'

/**
 * Zod schema for user registration form validation.
 * @property {string} pseudo - User's pseudonym, 3-20 characters long.
 * @property {string} avatarUrl - URL of the user's avatar image.
 * @property {string} [addressInput] - Optional user input for address.
 * @property {Address} [addressObject] - Optional structured address object.
 * @property {string[]} [addressSuggestions] - Optional array of address suggestions.
 */
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
    addressSuggestions: z.array(z.string()).optional(),
})

export type UserRegistration = z.infer<typeof userRegistrationSchema>
