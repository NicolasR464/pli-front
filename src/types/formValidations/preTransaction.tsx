import { z } from 'zod'

import { AddressSuggestionSchema } from '@/types/address/gouvApiCall'
import { AddressSchema } from '@/types/address/userAddress'

/**
 * Zod schema for pre-transaction form validation.
 * @property {string} [savedUserAddressLabel] - Optional label for saved address
 * @property {string} addressInput - User input for address
 * @property {Address} newAddressObject - New address structure
 * @property {Address} registeredAddressObject - Registered address structure
 * @property {AddressSuggestion[]} [addressSuggestions] - Optional array of address suggestions
 */
export const preTransactionSchema = z.object({
    savedUserAddressLabel: z.string().optional(),
    addressInput: z.string(),
    newAddressObject: AddressSchema,
    registeredAddressObject: AddressSchema,
    addressSuggestions: z.array(AddressSuggestionSchema).optional(),
})

export type PreTransactionFormData = z.infer<typeof preTransactionSchema>
