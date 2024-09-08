/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

const Geopoints = z.object({
    type: z.string(),
    coordinates: z.array(z.number()),
})

export type Geopoints = z.infer<typeof Geopoints>

const Address = z.object({
    street: z.string(),
    city: z.string(),
    postcode: z.number().int(),
    citycode: z.number().int(),
    floor: z.number().int().optional(),
    extra: z.string().optional(),
    geopoints: Geopoints,
})

export type Address = z.infer<typeof Address>

const BankInfo = z.object({
    IBAN: z.string(),
    BIC: z.string(),
})

export type BankInfo = z.infer<typeof BankInfo>

export const User = z.object({
    id: z.string(),
    version: z.number().int(),
    pseudo: z.string(),
    name: z.string(),
    surname: z.string(),
    address: Address,
    geopoints: Geopoints,
    email: z.string().email(),
    password: z.string(),
    sexe: z.enum(['masculin', 'féminin', 'autre']),
    phoneNumber: z.string().optional(),
    activityStatus: z.string(),
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
