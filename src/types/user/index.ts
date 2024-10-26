/* eslint-disable @typescript-eslint/no-redeclare */

import { z } from 'zod'

import type { Address, Geopoints } from '@/types/address/userAddress'

const BankInfo = z.object({
    IBAN: z.string(),
    BIC: z.string(),
})

type BankInfo = z.infer<typeof BankInfo>

const ActivityStatus = z.object({
    lastConnected: z.date(), 
    birthday: z.date(), 
});

export const User = z.object({
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
    activityStatus: ActivityStatus,
    birthDate: z.date(),
    bankInfo: BankInfo.optional(),
    avatarUrl: z.string().url().optional(),
    isPremium: z.boolean(),
    favoriteArticles: z.array(z.string()).optional(),
    credit: z.number().int().optional(),
    comments: z.array(z.string()).optional(),
    articles: z.array(z.string()).optional(),
    debit: z.array(z.string()).optional(),
})

export type User = z.infer<typeof User>
