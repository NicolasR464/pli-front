/* eslint-disable @typescript-eslint/no-redeclare */

import { z } from 'zod'

import type { Geopoints } from '@/types/address/userAddress'
import { AddressSchema } from '@/types/address/userAddress'

const BankInfoSchema = z.object({
    IBAN: z.string(),
    BIC: z.string(),
})

const ActivityStatusSchema = z.object({
    lastConnected: z.date(),
    birthday: z.date(),
})

export const UserSchema = z.object({
    id: z.string(),
    version: z.number().int(),
    pseudo: z.string(),
    name: z.string(),
    surname: z.string(),
    address: z.custom<Address>(),
    geopoints: z.custom<Geopoints>(),
    email: z.string().email(),
    password: z.string(),
    sexe: z.enum(['masculin', 'féminin', 'autre']),
    phoneNumber: z.string().optional(),
    activityStatus: ActivityStatusSchema,
    birthDate: z.date(),
    bankInfo: BankInfoSchema.optional(),
    avatarUrl: z.string().url().optional(),
    isPremium: z.boolean(),
    favoriteArticles: z.array(z.string()).optional(),
    credit: z.number().int().optional(),
    comments: z.array(z.string()).optional(),
    articles: z.array(z.string()).optional(),
    debit: z.array(z.string()).optional(),
})

export type User = z.infer<typeof UserSchema>
