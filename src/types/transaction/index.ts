/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

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
    receiver: z.string(),
    article: z.string(),
    sender: z.string(),
    delivery: Delivery.optional(),
})

export type Transaction = z.infer<typeof TransactionSchema>
