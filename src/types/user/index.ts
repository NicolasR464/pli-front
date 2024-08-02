/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

const Address = z.object({
    street: z.string(),
    city: z.string(),
    postcode: z.number().int(),
    citycode: z.number().int(),
    floor: z.number().int().optional(),
    extra: z.string().optional(),
})

const Geopoints = z.object({
    latitude: z.number(),
    longitude: z.number(),
})

const BankInfo = z.object({
    IBAN: z.string(),
    BIC: z.string(),
})

export const User = z.object({
    _id: z.string(),
    version: z.number().int(),
    pseudo: z.string(),
    name: z.string(),
    surname: z.string(),
    address: Address,
    geopoints: Geopoints,
    email: z.string().email(),
    password: z.string(),
    sexe: z.enum(['male', 'female', 'other']),
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

type User = z.infer<typeof User>
