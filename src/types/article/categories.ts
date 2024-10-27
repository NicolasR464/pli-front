import { z } from 'zod'

export const ProductCategoriesSchema = z.object({
    categories: z.record(
        z.object({
            tag: z.string(),
            subcategories: z.record(z.string()),
        }),
    ),
})

export type ProductCategories = z.infer<typeof ProductCategoriesSchema>
