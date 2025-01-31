/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

export const NotificationType = z.enum(['SUCCESS', 'ERROR', 'INFO'])

export type NotificationType = z.infer<typeof NotificationType>

export type ISO8601DateTime =
    `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`

/** The email types */
export const EmailTypeSchema = z.enum([
    'TRANSACTION_REQUEST',
    'TRANSACTION_CONFIRMATION',
])

export type EmailType = z.infer<typeof EmailTypeSchema>
