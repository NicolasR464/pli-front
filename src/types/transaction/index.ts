/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

const Delivery = z.object({
    _id: z.string(),
    type: z.enum(['standard', 'express']),
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

type Transaction = z.infer<typeof Transaction>
