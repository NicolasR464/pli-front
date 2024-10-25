import React from 'react'
import { Heart } from 'react-feather'
import Image from 'next/image'
import Link from 'next/link'

type ProductCardProps = {
    size?: 'small' | 'large'
    title: string
    url: string
    imageUrl: string
}

// Carte produit avec texte petit
export const CardSmallText: React.FC = () => (
    <div className='m-8 flex max-w-[50%] items-start space-x-4 rounded-lg border p-4 shadow-sm'>
        <div className='h-16 w-16 bg-neutrals-grey-normal' />
        <div>
            <h3 className='text-h6 font-bold'>
                {'Lorem ipsum dolor sit amet'}
            </h3>
            <p className='text-neutrals-grey-dark'>
                {
                    'Lorem ipsum dolor sit amet consectetur. Id senectus amet massa'
                }
                {'eu. Molestie eu convallis elit massa.'}
            </p>
        </div>
    </div>
)

// Carte produit avec titre large
export const CardLargeTitle: React.FC = () => (
    <div className='m-8 flex max-w-[50%] items-center space-x-4 p-4'>
        <div className='h-20 w-20 bg-neutrals-grey-normal' />
        <div>
            <h1 className='text-h5 font-bold text-neutrals-blacks-darker'>
                {'Lorem ipsum dolor sit amet'}
            </h1>
        </div>
    </div>
)

// Carte produit avec bordure
export const CardWithBorder: React.FC = () => (
    <div className='m-8 flex max-w-[50%] items-start space-x-4 rounded-lg border bg-neutrals-grey-light p-4 shadow-md'>
        <div className='h-16 w-16 rounded-md border-2 bg-neutrals-grey-light' />
        <div>
            <h3 className='font-heading text-text-1 font-bold text-neutrals-blacks-darker'>
                {'Lorem ipsum dolor sit amet'}
            </h3>
            <p className='text-text-3 text-neutrals-blacks-darker'>
                {
                    'Lorem ipsum dolor sit amet consectetur. Id senectus amet massa'
                }
                {'eu. Molestie eu convallis elit massa.'}
            </p>
        </div>
    </div>
)

// Composant générique ProductCard
export const ProductCard: React.FC<ProductCardProps> = ({
    size = 'large',
    title,
    url,
    imageUrl,
}) => {
    const isLarge = size === 'large'

    return (
        <Link href={url}>
            <div
                className={`relative ${isLarge ? 'h-80 w-64' : 'h-56 w-40'} m-8 cursor-pointer rounded-lg bg-neutrals-grey-normal shadow-md`}
            >
                {/* Image du produit */}
                <div className='relative h-full w-full overflow-hidden rounded-t-lg'>
                    <Image
                        src={imageUrl}
                        alt={title}
                        layout='fill'
                        objectFit='cover'
                        className='rounded-t-lg'
                    />
                </div>

                {/* Icône cœur */}
                <div className='absolute bottom-4 right-4'>
                    <Heart className='text-black' />
                </div>

                {/* Titre du produit */}
                <h3
                    className={`mt-4 text-center font-body font-light ${isLarge ? 'text-text-2' : 'text-text-3'}`}
                >
                    {title}
                </h3>
            </div>
        </Link>
    )
}
