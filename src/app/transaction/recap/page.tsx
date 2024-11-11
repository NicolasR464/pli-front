'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import ArticleList from '@/components/transacArticles/articleList'

import { useTransactionStore } from '@/stores/useTransaction'
import { getArticlesByUser } from '@/utils/apiCalls/article'
import { getUserById } from '@/utils/apiCalls/user'

import type { Article } from '@/types/article'
import type { User } from '@/types/user'

import { useAuth, useUser } from '@clerk/nextjs'
import { useQueries } from '@tanstack/react-query'

const TransactionPage = (): React.JSX.Element => {
    const { getToken } = useAuth()
    const [token, setToken] = useState<string>('')

    // Get info from article/id page
    const { owner, articlePageId } = useTransactionStore()
    const ownerId = String(owner)
    const initalArticle = String(articlePageId)

    // Get connected user info
    const { user } = useUser()
    const userConnectedId = user?.id

    // useEffect to retreive connected user's token
    useEffect(() => {
        const fetchToken = async (): Promise<void> => {
            const fetchedToken = (await getToken()) ?? ''
            if (fetchedToken) {
                setToken(String(fetchedToken))
            } else {
                throw new Error('Aucun token trouvé.')
            }
        }
        fetchToken()
    }, [getToken])

    // Get info about the owner + their articles and the connected user + their articles
    const queries = useQueries({
        queries: [
            {
                queryKey: ['ownerUser', ownerId, token],
                queryFn: (): Promise<User | undefined> =>
                    getUserById(ownerId, token),
                enabled: !!ownerId && !!token,
            },
            {
                queryKey: ['myUser', userConnectedId, token],
                queryFn: (): Promise<User | undefined> =>
                    getUserById(userConnectedId, token),
                enabled: !!userConnectedId && !!token,
            },
            {
                queryKey: ['ownerArticles', ownerId, token],
                queryFn: (): Promise<Article[]> =>
                    getArticlesByUser(ownerId, token),
                enabled: !!ownerId,
            },
            {
                queryKey: ['myArticles', userConnectedId, token],
                queryFn: (): Promise<Article[]> => {
                    if (userConnectedId) {
                        return getArticlesByUser(userConnectedId, token)
                    }
                    return Promise.resolve([])
                },
                enabled: !!userConnectedId,
            },
        ],
    })

    const ownerUser = queries[0].data
    const myUser = queries[1].data
    const ownerArticles = queries[2].data
    const myArticles = queries[3].data

    //State for selected articles
    const [selectedArticles, setSelectedArticles] = useState<
        string | undefined
    >(initalArticle)
    const [selectedMyArticles, setSelectedMyArticles] = useState<
        string | undefined
    >()

    // Function to handle selection of chosen articles
    const handleSelectArticle = (articleId: string): void => {
        setSelectedArticles(articleId)
    }
    // Function to handle selection of articles to give
    const handleSelectMyArticle = (articleId: string): void => {
        setSelectedMyArticles(articleId)
    }
    // Function to redirect user to finalise transaction
    const queryParams = {
        sender: userConnectedId,
        receiver: ownerId,
        articleSender: selectedMyArticles,
        articleReceiver: selectedArticles,
    }

    // Find the selected articles using their IDs
    const chosenArticle = ownerArticles?.find(
        (article) => article._id === selectedArticles,
    )
    const givenArticle = myArticles?.find(
        (article) => article._id === selectedMyArticles,
    )

    return (
        <div className='flex w-full flex-col items-center justify-center bg-gray-50 p-4'>
            {!!myUser && !!ownerUser && (
                <>
                    <h1 className='mb-4 text-3xl font-extrabold text-teal-600'>
                        {`Besace de ${ownerUser.pseudo}`}
                    </h1>
                    <p className='mb-8 text-lg text-gray-600'>
                        {'Sélectionnez les produits qui vous intéressent !'}
                    </p>

                    {/* Receiver User's Articles */}
                    <ArticleList
                        articles={ownerArticles || []}
                        selectedArticleId={selectedArticles}
                        onSelectArticle={handleSelectArticle}
                    />

                    <h2 className='mb-4 mt-8 text-3xl font-extrabold text-teal-600'>
                        {`Ma besace ${myUser.pseudo}`}
                    </h2>
                    <p className='mb-8 text-lg text-gray-600'>
                        {
                            'Sélectionnez le produit que vous souhaitez donner en échange :'
                        }
                    </p>

                    {/* My User's Articles */}
                    <ArticleList
                        articles={myArticles ?? []}
                        selectedArticleId={selectedMyArticles}
                        onSelectArticle={handleSelectMyArticle}
                    />

                    {/* Exchange Recap */}
                    {!!chosenArticle && !!givenArticle && (
                        <div className='mx-auto mb-6 w-full max-w-3xl rounded-lg bg-gradient-to-r from-teal-50 to-teal-100 p-6 shadow-lg'>
                            <p className='text-lg font-semibold text-gray-800'>
                                <span className='text-xl font-bold text-teal-700'>
                                    {'🎉 Vous souhaitez échanger votre produit'}{' '}
                                    <strong>
                                        {'"'}
                                        {chosenArticle.adTitle}
                                        {'"'}
                                    </strong>{' '}
                                    {'pour obtenir'}{' '}
                                    <strong>
                                        {'"'}
                                        {givenArticle.adTitle}
                                        {'"'}
                                    </strong>
                                    {'!'}
                                </span>
                                <br />
                                <span className='flex justify-center text-sm text-gray-500'>
                                    {'C’est un échange gagnant-gagnant ! 🤩'}
                                </span>
                            </p>
                        </div>
                    )}

                    {/* Confirmation Button */}
                    <div className='flex justify-center'>
                        <Link
                            href={{
                                pathname: '/transaction/final',
                                query: queryParams,
                            }}
                            className='transform justify-end rounded-xl bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 p-6 px-8 py-4 font-bold text-white shadow-lg shadow-xl transition-all hover:scale-105 hover:bg-yellow-600'
                        >
                            {'Envoyer la proposition 🚀'}
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default TransactionPage
