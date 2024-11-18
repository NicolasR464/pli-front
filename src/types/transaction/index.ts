/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

import { AddressSchema } from '@/types/address/userAddress'
import {
    DeliveryCompanySchema,
    TransactionStatesSchema,
} from '@/types/transaction/actions'

/**
 * @description Schema defining the delivery of the transaction - only present if this is not a pick-up transaction
 * @exports DeliverySchema
 */
export const DeliverySchema = z.object({
    id: z.string().optional(),
    company: DeliveryCompanySchema.optional(),
    packageWeight: z.number().positive().optional(),
    sent: z.date().optional(),
    cost: z.number().positive().optional(),
    qrCodeUrl: z.string().url().optional(),
    address: AddressSchema,
})

export const TransactionSchema = z.object({
    id: z.string(),
    userA: z.string(),
    userB: z.string(),
    articleA: z.string().optional(),
    articleB: z.string(),
    state: TransactionStatesSchema,
    delivery: DeliverySchema.optional(),
})

export type Transaction = z.infer<typeof TransactionSchema>
