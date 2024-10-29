import { z } from 'zod'

import {
    categoriesList,
    subcategoriesList,
} from '@/utils/constants/productValues'

import { AddressSchema } from '../address/userAddress'

/**
 * @description Schema for dimensions
 * @exports DimensionsSchema
 */
export const DimensionsSchema = z.object({
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    weight: z.number().optional(),
})

/**
 * @description Schema for geo points
 * @exports GeoPointsSchema
 */
export const GeoPointsSchema = z.object({
    type: z.literal('Point'),
    coordinates: z.tuple([z.number(), z.number()]),
})

/**
 * @description Schema for state enum
 * @exports StateSchema
 */
export const StateSchema = z.enum([
    'NEW',
    'LIKE_NEW',
    'VERY_GOOD_CONDITION',
    'GOOD_CONDITION',
    'FAIR_CONDITION',
    'TO_REPAIR',
])

/**
 * @description Schema defining the availability of the article
 * @exports StatusSchema
 */
export const StatusSchema = z.enum(['AVAILABLE', 'UNAVAILABLE', 'RESERVED'])

/**
 * @description Schema for delivery type enum
 * @exports DeliveryTypeSchema
 */
export const DeliveryTypeSchema = z.enum(['PICKUP', 'SHIPPING', 'BOTH'])

/**
 * @description Schema for article
 * @exports ArticleSchema
 */
export const ArticleSchema = z.object({
    id: z.string().optional(),
    owner: z.string(),
    adTitle: z.string(),
    brand: z.string().optional(),
    model: z.string().optional(),
    description: z.string(),
    price: z.number().positive().int(),
    manufactureDate: z.date().optional(),
    purchaseDate: z.date().optional(),
    state: StateSchema,
    status: StatusSchema,
    imageUrls: z.array(z.string().url()),
    createdAt: z.string().datetime(),
    lastModified: z.string().datetime(),
    category: z.enum([...categoriesList] as [string, ...string[]]),
    subCategory: z.enum([...subcategoriesList] as [string, ...string[]]),
    deliveryType: DeliveryTypeSchema,
    dimensions: DimensionsSchema.optional(),
    address: AddressSchema.optional(),
    size: z.string().optional(),
})

export type Dimensions = z.infer<typeof DimensionsSchema>
export type GeoPoints = z.infer<typeof GeoPointsSchema>
export type Address = z.infer<typeof AddressSchema>
export type State = z.infer<typeof StateSchema>
export type Status = z.infer<typeof StatusSchema>
export type DeliveryType = z.infer<typeof DeliveryTypeSchema>
export type Article = z.infer<typeof ArticleSchema>
