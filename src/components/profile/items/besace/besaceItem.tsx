import React from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
} from '@/components/shadcn/ui/card'
import { Button } from '@/components/shadcn/ui/button'

type BesaceItemProps = {
    article: {
        id: string
        adTitle: string
        description: string
        price: number
        imageUrls: string[]
    }
    onDelete: () => void
}

const BesaceItem: React.FC<BesaceItemProps> = ({
    article,
    onDelete,
}) => {
    return (
        <Card className='w-full'>
            <CardHeader>
                <img
                    src={article.imageUrls[0] || '/default-image.jpg'}
                    alt={article.adTitle}
                    className='h-48 w-full rounded-md object-cover'
                />
            </CardHeader>
            <CardContent>
                <CardTitle className='text-lg font-bold'>
                    {article.adTitle}
                </CardTitle>
                <CardDescription className='text-sm text-gray-600'>
                    {article.description}
                </CardDescription>
                <p className='text-lg font-semibold text-blueGreen-dark-active'>
                    {article.price} €
                </p>
            </CardContent>
            <CardFooter className='flex justify-between'>
                <Button
                    variant='destructive'
                    onClick={onDelete}
                >
                    Supprimer
                </Button>
            </CardFooter>
        </Card>
    )
}

export default BesaceItem
