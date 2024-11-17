/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

import { TransactionStatesSchema } from './actions'

import { DeliveryTypeSchema } from '../article'

const Delivery = z.object({
    id: z.string(),
    type: DeliveryTypeSchema,
    packageWeight: z.number().positive(),
    sent: z.date(),
    cost: z.number().positive(),
    qrCodeUrl: z.string().url(),
})

export const TransactionSchema = z.object({
    id: z.string(),
    userA: z.string(),
    userB: z.string(),
    articleB: z.string(),
    state: TransactionStatesSchema,
    delivery: Delivery.optional(),
})

export type Transaction = z.infer<typeof TransactionSchema>
