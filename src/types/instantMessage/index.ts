/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

export const InstantMessageSchema = z.object({
    _id: z.string(),
    sender: z.string(),
    receiver: z.string(),
    message: z.string(),
    sentAt: z.date(),
})

export type InstantMessage = z.infer<typeof InstantMessageSchema>
