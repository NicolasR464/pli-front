import { z } from 'zod'

import { AddressSuggestionSchema } from '@/types/address/gouvApiCall'
import { AddressSchema } from '@/types/address/userAddress'

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
        .max(50),
    avatarUrl: z.string().url(),
    addressInput: z.string().optional(),
    addressObject: AddressSchema.optional(),
    addressSuggestions: z.array(AddressSuggestionSchema).optional(),
})

export type UserRegistration = z.infer<typeof userRegistrationSchema>

export const userOnboardingSchema = userRegistrationSchema
    .omit({
        addressInput: true,
        addressSuggestions: true,
    })
    .extend({
        userId: z.string(),
        createdAt: z.date(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
    })

export type UserOnboarding = z.infer<typeof userOnboardingSchema>
