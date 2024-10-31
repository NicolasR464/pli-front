import { z } from 'zod'

/**
 * @description Schema for the Geopoints object
 * @exports GeopointsSchema
 */
export const GeopointsSchema = z.object({
    type: z.string(),
    coordinates: z.array(z.number()),
})

/**
 * @description Schema for the Address object
 * @exports AddressSchema
 */
export const AddressSchema = z.object({
    label: z.string().optional(),
    housenumber: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    postcode: z.string().optional(),
    citycode: z.string().optional(),
    floor: z.number().int().optional(),
    extra: z.string().optional(),
    geopoints: GeopointsSchema.optional(),
})

// Type inference
export type Address = z.infer<typeof AddressSchema>
