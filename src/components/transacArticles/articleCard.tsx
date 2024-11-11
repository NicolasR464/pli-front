'use client'
import React from 'react'
import Image from 'next/image'

import { Card, CardContent, CardFooter } from '@/components/shadcn/ui/card'

import type { Article } from '@/types/article'

const ArticleCard: React.FC<{
    article: Article
    isSelected: boolean
    onSelect: () => void
}> = ({ article, isSelected, onSelect }) => {
    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.key === 'Enter' || e.key === ' ') {
            onSelect()
        }
    }

    return (
        <button
            onClick={onSelect}
            onKeyDown={handleKeyDown}
            aria-label={`Sélectionner l’article : ${article.adTitle}`}
            className={`transform cursor-pointer transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 ${
                isSelected
                    ? 'border-8 border-teal-500'
                    : 'border-2 border-gray-300'
            } rounded-xl p-4 shadow-lg hover:border-teal-500 hover:bg-teal-100 hover:shadow-2xl`}
        >
            <Card className='h-60 w-40 overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:scale-105'>
                <CardContent className='flex h-40 items-center justify-center overflow-hidden'>
                    {!!article.imageUrls[0] && (
                        <Image
                            src={article.imageUrls[0]}
                            alt={`Image de l’article : ${article.adTitle}`}
                            className='h-full w-full object-cover transition-all'
                            width={160}
                            height={160}
                            priority
                        />
                    )}
                </CardContent>
                <CardFooter className='flex justify-center bg-white'>
                    <p className='text-sm font-medium text-gray-800'>
                        {article.adTitle}
                    </p>
                </CardFooter>
            </Card>
        </button>
    )
}

export default ArticleCard
