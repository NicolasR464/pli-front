import { z } from 'zod'

import type { Article } from '@/types/article'
import type { User } from '@/types/user'

/**
 * @description Schema defining the state of the transaction
 * @exports TransactionStatesSchema
 */
export const TransactionStatesSchema = z.enum([
    'PENDING',
    'ACCEPTED',
    'REFUSED',
    'DELIVERED',
])

/**
 * Fields of the article that are required for the transaction request
 */
export type PartialArticleFields = {
    id?: Article['id']
    adTitle: Article['adTitle']
    address: Article['address']
    description?: Article['description']
    /** Get the first image url of the article - imageUrls[0] */
    imageUrl: Article['imageUrls'][number]
    price?: Article['price']
    deliveryType: Article['deliveryType']
}

export const DeliveryCompanySchema = z.enum(['MONDIAL_RELAY', 'LA_POSTE'])

export type TransactionStates = z.infer<typeof TransactionStatesSchema>

export type UserB = Pick<User, 'id' | 'email'>
