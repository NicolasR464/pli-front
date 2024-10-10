import React from 'react'
import { Heart } from 'react-feather'

interface ProductCardProps {
    size?: 'small' | 'large'
    title: string
}

export const ProductCardSmallText = () => (
    <div className='flex items-start space-x-4 rounded-lg border p-4 shadow-sm'>
        <div className='h-16 w-16 bg-gray-300'></div>
        <div>
            <h3 className='text-xl font-bold'>Lorem ipsum dolor sit amet</h3>
            <p className='text-gray-600'>
                Lorem ipsum dolor sit amet consectetur. Id senectus amet massa
                eu. Molestie eu convallis elit massa.
            </p>
        </div>
    </div>
)

export const ProductCardLargeTitle = () => (
    <div className='flex items-center space-x-4 p-4'>
        <div className='h-20 w-20 bg-gray-300'></div>
        <div>
            <h1 className='text-4xl font-bold'>Lorem ipsum dolor sit amet</h1>
        </div>
    </div>
)

export const ProductCardWithBorder = () => (
    <div className='flex space-x-4 rounded-lg border bg-gray-50 p-4 shadow-md'>
        <div className='h-16 w-16 rounded-md border-2 border-purple-500 bg-gray-300'></div>
        <div>
            <h3 className='text-lg font-bold text-gray-800'>
                Lorem ipsum dolor sit amet
            </h3>
            <p className='text-gray-600'>
                Lorem ipsum dolor sit amet consectetur. Id senectus amet massa
                eu. Molestie eu convallis elit massa.
            </p>
        </div>
    </div>
)

export const ProductCard: React.FC<ProductCardProps> = ({
    size = 'large',
    title,
}) => {
    const isLarge = size === 'large'

    return (
        <div
            className={`relative ${isLarge ? 'h-80 w-64' : 'h-56 w-40'} rounded-lg bg-gray-300`}
        >
            {/* Heart Icon */}
            <div className='absolute bottom-2 right-2'>
                <Heart className='text-gray-600' />
            </div>

            {/* Title under the image */}
            <h3
                className={`mt-4 text-center font-bold ${isLarge ? 'text-xl' : 'text-base'}`}
            >
                {title}
            </h3>
        </div>
    )
}
