import React from 'react'
import Image from 'next/image'

import { Card, CardContent } from '@/components/shadcn/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/shadcn/ui/carousel'

type CarouselImagesProps = {
    imageUrls: string[]
}

const CarouselImages: React.FC<CarouselImagesProps> = ({ imageUrls }) => {
    return (
        <Carousel
            className='mx-auto w-full max-w-md'
            aria-label='Carousel of article images'
            role='region'
            tabIndex={0}
        >
            <CarouselContent>
                {imageUrls.map(
                    (imageUrl, index) =>
                        imageUrl && (
                            <CarouselItem key={String(imageUrl)}>
                                <div className='p-1'>
                                    <Card>
                                        <CardContent className='flex aspect-square items-center justify-center p-6'>
                                            <Image
                                                src={imageUrl}
                                                alt={`Image of article ${index + 1}`}
                                                className='h-full w-full object-cover'
                                                width={250}
                                                height={250}
                                                role='img'
                                                aria-label={`Image ${index + 1} of the article`}
                                                loading='lazy'
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ),
                )}
            </CarouselContent>

            {/* Carousel navigation buttons with accessible labels */}
            <CarouselPrevious
                className='ml-4'
                aria-label='Previous image'
                role='button'
                aria-controls='carousel'
                tabIndex={0}
            />
            <CarouselNext
                className='mr-4'
                aria-label='Next image'
                role='button'
                aria-controls='carousel'
                tabIndex={0}
            />
        </Carousel>
    )
}

export default CarouselImages
