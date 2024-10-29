import { z } from 'zod'

import { categories } from './categories'

/**
 * @description Schema for category enum
 * @exports CategoryEnumSchema
 */
export const CategoryEnumSchema = z.enum(
    Object.keys(categories) as [keyof typeof categories],
)

/**
 * @description Schema for subcategory enum
 * @exports SubcategoryEnumSchema
 */
export const SubcategoryEnumSchema = z.enum(
    Object.values(categories).flat() as [string],
)

/**
 * @description Schema for dimensions
 * @exports DimensionsSchema
 */
export const DimensionsSchema = z.object({
    length: z.number(),
    width: z.number(),
    height: z.number(),
    weight: z.number(),
})

/**
 * @description Schema for state enum
 * @exports StateSchema
 */
export const StateSchema = z.enum([
    'Neuf',
    'Comme neuf',
    'Très bon état',
    'Bon état',
    'État correct',
    'À réparer',
])

/**
 * @description Schema for status enum
 * @exports StatusSchema
 */
export const StatusSchema = z.enum(['Accessible', 'Inaccessible'])

/**
 * @description Schema for delivery type enum
 * @exports DeliveryTypeSchema
 */
export const DeliveryTypeSchema = z.enum([
    'La Poste',
    'Mondial Relay',
    'En main propre',
])

/**
 * @description Schema for article
 * @exports ArticleSchema
 */
export const ArticleSchema = z.object({
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
    state: StateSchema,
    imageUrls: z.array(z.string().url()),
    createdAt: z.date(),
    lastModified: z.date(),
    category: CategoryEnumSchema,
    subCategory: SubcategoryEnumSchema,
    deliveryType: DeliveryTypeSchema.array(),
    dimensions: DimensionsSchema.optional(),
    // adress
})

// Type inference
export type CategoryEnum = z.infer<typeof CategoryEnumSchema>
export type SubcategoryEnum = z.infer<typeof SubcategoryEnumSchema>
export type Dimensions = z.infer<typeof DimensionsSchema>
export type State = z.infer<typeof StateSchema>
export type Status = z.infer<typeof StatusSchema>
export type DeliveryType = z.infer<typeof DeliveryTypeSchema>
export type Article = z.infer<typeof ArticleSchema>
