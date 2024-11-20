import React from 'react'
import Image from 'next/image'

type TransactionItemProps = {
    transaction: {
        _id: string
        articleData: {
            adTitle: string
            imageUrls: string[]
        }
        delivery: {
            type: string
            sent: string
        }
    }
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
    return (
        <div className='flex rounded-lg border p-4 shadow-md'>
            {/* Image de l'article */}
            <Image
                src={
                    transaction.articleData.imageUrls[0] || '/default-image.jpg'
                }
                alt={transaction.articleData.adTitle || 'Image article'}
                className='mr-4 h-24 w-24 rounded-md object-cover'
                width={96}
                height={96}
            />
            {/* Informations de la transaction */}
            <div className='flex flex-col justify-between'>
                <h2 className='text-lg font-bold'>
                    {transaction.articleData.adTitle || 'Article inconnu'}
                </h2>
                <p className='text-sm text-gray-600'>
                    {new Date(transaction.delivery.sent).toLocaleDateString(
                        'fr-FR',
                    )}
                </p>
                <p className='text-sm font-semibold text-blueGreen-dark'>
                    {transaction.delivery.type}
                </p>
            </div>
        </div>
    )
}

export default TransactionItem
