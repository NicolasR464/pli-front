import { z } from 'zod'

/**
 * @description Schema defining the state of the transaction
 * @exports TransactionStatesSchema
 */
export const TransactionStatesSchema = z.enum([
    'REQUESTED',
    'ACCEPTED',
    'REJECTED',
    'CANCELLED',
    'DELIVERED',
])

/**
 * @description Schema defining the type of the transaction
 * @exports TransactionTypesSchema
 */
export const TransactionTypesSchema = z.enum(['ONE_TO_ONE', 'ONE_TO_MANY'])

export type TransactionStates = z.infer<typeof TransactionStatesSchema>
export type TransactionTypes = z.infer<typeof TransactionTypesSchema>
