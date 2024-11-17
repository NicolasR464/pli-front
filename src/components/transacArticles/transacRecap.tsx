'use client'
import React from 'react'

import type { Article } from '@/types/article'

type ExchangeRecapProps = {
    chosenArticle: Article | undefined
    givenArticle: Article | undefined
}

const ExchangeRecap: React.FC<ExchangeRecapProps> = ({
    chosenArticle,
    givenArticle,
}) => {
    if (!chosenArticle || !givenArticle)
        return <p style={{ display: 'none' }}>{'Aucun échange sélectionné'}</p>

    return (
        <div className='mx-auto mb-6 w-full max-w-3xl rounded-lg bg-gradient-to-r from-teal-50 to-teal-100 p-6 shadow-lg'>
            <p className='text-lg font-semibold text-gray-800'>
                <span className='text-xl font-bold text-teal-700'>
                    {'🎉 Vous souhaitez échanger votre article'}{' '}
                    <strong>{`"${chosenArticle.adTitle}"`}</strong>{' '}
                    {'pour obtenir'}{' '}
                    <strong>{`"${givenArticle.adTitle}"`}</strong>
                    {'!'}
                </span>
                <br />
                <span className='flex justify-center text-sm text-gray-500'>
                    {'C’est un échange gagnant-gagnant ! 🤩'}
                </span>
            </p>
        </div>
    )
}

export default ExchangeRecap
