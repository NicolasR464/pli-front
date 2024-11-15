/* eslint-disable @typescript-eslint/no-redeclare */

import { z } from 'zod'

import { AddressSchema } from '@/types/address/userAddress'

export const ActivityStatusSchema = z.object({
    lastConnected: z.date(),
    birthday: z.date(),
})

export const UserSchema = z.object({
    id: z.string(),
    pseudo: z.string(),
    name: z.string(),
    surname: z.string(),
    address: AddressSchema.array().optional(),
    email: z.string().email(),
    sexe: z.enum(['masculin', 'féminin', 'autre']).optional(),
    phoneNumber: z.string().optional(),
    activityStatus: ActivityStatusSchema,
    birthDate: z.date(),
    avatarUrl: z.string().url().optional(),
    isPremium: z.boolean(),
    favoriteArticles: z.array(z.string()).optional(),
    credit: z.number().optional(),
    balance: z.number().optional(),
    comments: z.array(z.string()).optional(),
    articles: z.array(z.string()).optional(),
})

export type User = z.infer<typeof UserSchema>
