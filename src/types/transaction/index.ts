/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

import { DeliveryType } from '../article'

const Delivery = z.object({
    _id: z.string(),
    type: DeliveryType,
    packageWeight: z.number().positive(),
    sent: z.date(),
    cost: z.number().positive(),
    qrCodeUrl: z.string().url(),
})

export const Transaction = z.object({
    _id: z.string(),
    version: z.number().int(),
    receiver: z.string(),
    article: z.string(),
    sender: z.string(),
    delivery: Delivery,
})

export type Transaction = z.infer<typeof Transaction>
