/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

export const InstantMessageSchema = z.object({
    _id: z.string(),
    roomID: z.string(),
    sender: z.string(),
    receiver: z.string(),
    message: z.string(),
    sentAt: z.date(),
})

export type InstantMessage = z.infer<typeof InstantMessageSchema>

// Modèle de conversation
export const ConversationSchema = z.object({
    id: z.string(),
    title: z.string(),
    participants: z.array(z.string()),
    lastMessage: z.string().optional(),
    lastUpdated: z.date(),
})

export type Conversation = z.infer<typeof ConversationSchema>
