import React from 'react'
import Image from 'next/image'

import type { Article } from '@/types/article'

export type TransactionWithArticleDataProps = {
    transaction: {
        id: string
        delivery?: {
            type?: string
            sent?: string
        }
    }
    articleData: Article
}

const TransactionItem: React.FC<TransactionWithArticleDataProps> = ({
    transaction,
    articleData,
}) => {
    return (
        <div className='flex rounded-lg border p-4 shadow-md'>
            {/* Image de l'article */}
            <Image
                src={articleData.imageUrls[0] || '/default-image.jpg'}
                alt={articleData.adTitle || 'Image article'}
                className='mr-4 h-24 w-24 rounded-md object-cover'
                width={96}
                height={96}
            />
            {/* Informations de la transaction */}
            <div className='flex flex-col justify-between'>
                <h2 className='text-lg font-bold'>
                    {articleData.adTitle || 'Article inconnu'}
                </h2>
                {!!transaction.delivery && !!transaction.delivery.sent && (
                    <p className='text-sm text-gray-600'>
                        {new Date(transaction.delivery.sent).toLocaleDateString(
                            'fr-FR',
                        )}
                    </p>
                )}

                {!!transaction.delivery && !!transaction.delivery.type && (
                    <p className='text-sm font-semibold text-blueGreen-dark'>
                        {transaction.delivery.type}
                    </p>
                )}
            </div>
        </div>
    )
}

export default TransactionItem
