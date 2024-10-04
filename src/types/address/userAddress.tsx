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
    label: z.string(),
    housenumber: z.string().optional(),
    street: z.string().optional(),
    city: z.string(),
    postcode: z.string(),
    citycode: z.string(),
    floor: z.number().int().optional(),
    extra: z.string().optional(),
    geopoints: GeopointsSchema,
})

// Type inference
export type Geopoints = z.infer<typeof GeopointsSchema>
export type Address = z.infer<typeof AddressSchema>
