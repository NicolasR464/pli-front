/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

import { categories } from './categories'

const categoryEnum = z.enum(
    Object.keys(categories) as [keyof typeof categories],
)
const subcategoryEnum = z.enum(Object.values(categories).flat() as [string])

const Dimensions = z.object({
    length: z.number(),
    width: z.number(),
    height: z.number(),
    weight: z.number(),
})

export const State = z.enum([
    'Neuf',
    'Comme neuf',
    'Très bon état',
    'Bon état',
    'État correct',
    'À réparer',
])
export type State = z.infer<typeof State>

export const Status = z.enum(['Accessible', 'Inaccessible'])
export type Status = z.infer<typeof Status>

export const DeliveryType = z.enum([
    'La Poste',
    'Mondial Relay',
    'En main propre',
])
export type DeliveryType = z.infer<typeof DeliveryType>

const Article = z.object({
    _id: z.string(),
    version: z.number().int(),
    owner: z.string(),
    adTitle: z.string(),
    brand: z.string().optional(),
    model: z.string().optional(),
    description: z.string(),
    price: z.number().positive(),
    manufactureDate: z.date().optional(),
    purchaseDate: z.date().optional(),
    state: State,
    imageUrls: z.array(z.string().url()),
    createdAt: z.date(),
    lastModified: z.date(),
    category: categoryEnum,
    subCategory: subcategoryEnum,
    deliveryType: DeliveryType,
    dimensions: Dimensions.optional(),
})

export type Article = z.infer<typeof Article>
