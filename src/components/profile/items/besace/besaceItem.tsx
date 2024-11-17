import React from 'react'

type BesaceItemProps = {
    article: {
        id: string
        adTitle: string
        description: string
        price: number
        imageUrls: string[]
    }
    onEdit: () => void
    onDelete: () => void
}

const BesaceItem: React.FC<BesaceItemProps> = ({
    article,
    onEdit,
    onDelete,
}) => {
    return (
        <div className='rounded-lg border p-4 shadow-md'>
            <img
                src={article.imageUrls[0] || '/default-image.jpg'}
                alt={article.adTitle}
                className='mb-4 w-full rounded-md'
            />
            <h2 className='text-lg font-bold'>{article.adTitle}</h2>
            <p className='text-sm text-gray-600'>{article.description}</p>
            <p className='text-lg font-semibold'>{article.price} €</p>
            <div className='mt-4 flex justify-between'>
                <button
                    onClick={onEdit}
                    className='rounded-md bg-blueGreen-dark-active px-4 py-2 text-white hover:bg-blueGreen-dark'
                >
                    Modifier
                </button>
                <button
                    onClick={onDelete}
                    className='rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600'
                >
                    Supprimer
                </button>
            </div>
        </div>
    )
}

export default BesaceItem
