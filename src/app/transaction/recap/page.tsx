'use client'

import React, { useState } from 'react'

import ArticleList from '@/components/transacArticles/articleList'
import ConfirmationButton from '@/components/transacArticles/confirmTransac'
import ExchangeRecap from '@/components/transacArticles/transacRecap'

import { useTransactionStore } from '@/stores/transaction'

import useArticlesByUser from '@/hooks/useArticlesByUser'
import useUserById from '@/hooks/useUserById'
import { useUser } from '@clerk/nextjs'
import router from 'next/router'

const TransactionPage = (): React.JSX.Element => {
    // Get connected user info
    const { user } = useUser()
    const userConnectedId = user?.id

    // security check, only connected users can access this page
    if (!user) {
        return (
            <div className='flex flex-col items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-teal-500 p-6 shadow-lg'>
                <h1 className='mb-4 text-4xl font-bold text-white'>
                    🔒 Oups, vous n'êtes pas connecté !
                </h1>
                <p className='mb-6 text-xl text-white'>
                    Connectez-vous pour commencer un échange passionnant ! 🌟
                </p>
                <button
                    onClick={() => router.push('/')}
                    className='transform rounded-full bg-yellow-400 px-6 py-2 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-white'
                >
                    Se connecter
                </button>
                <div className='mt-6 animate-pulse'>
                    <span className='text-xl text-white'>
                        Prêt pour l'aventure ? 🚀
                    </span>
                </div>
            </div>
        )
    }

    // Get info from article/id page and set variable with heir values
    const { owner, articlePageId } = useTransactionStore((state) => ({
        owner: state.owner,
        articlePageId: state.articlePageId,
    }))
    const ownerId = String(owner)
    const initalArticle = String(articlePageId)
    // get params to send transaction request :
    const { setQueryParams, queryParams } = useTransactionStore((state) => ({
        setQueryParams: state.setQueryParams,
        queryParams: state.queryParams,
    }))

    // Get info about the owner and their articles
    const { data: ownerUser } = useUserById(ownerId)
    const { data: ownerArticles } = useArticlesByUser(ownerId)
    // Get info about the user and their articles
    const { data: myUser } = useUserById(userConnectedId)
    const { data: myArticles } = useArticlesByUser(userConnectedId)

    //create selected state article I want and the one I exchange
    const [selectedArticles, setSelectedArticles] = useState<
        string | undefined
    >(initalArticle)
    const [selectedMyArticles, setSelectedMyArticles] = useState<
        string | undefined
    >()

    // handle select function : article I want and article I give
    const handleSelectArticle = (articleId: string): void => {
        setSelectedArticles(articleId)
        // Update queryParams when article is selected
        setQueryParams({
            sender: userConnectedId,
            receiver: ownerId,
            articleSender: selectedMyArticles,
            articleReceiver: articleId,
        })
    }
    const handleSelectMyArticle = (articleId: string): void => {
        setSelectedMyArticles(articleId)

        // Update queryParams when article is selected
        setQueryParams({
            sender: userConnectedId,
            receiver: ownerId,
            articleSender: articleId,
            articleReceiver: selectedArticles,
        })
    }

    // Get selected articles data for the recap
    const chosenArticle = ownerArticles?.find(
        (article) => article.id === selectedArticles,
    )
    const givenArticle = myArticles?.find(
        (article) => article.id === selectedMyArticles,
    )

    // Cannot send request if articles not selected
    const isConfirmationDisabled = !(selectedArticles && selectedMyArticles)

    return (
        <div className='flex w-full flex-col items-center justify-center bg-gray-50 p-4'>
            {!!myUser && !!ownerUser && (
                <>
                    <h1 className='mb-4 text-3xl font-extrabold text-teal-600'>
                        {`Besace de ${ownerUser.pseudo}`}
                    </h1>
                    <p className='mb-8 text-lg text-gray-600'>
                        {'Sélectionnez l’article qui vous intéresse !'}
                    </p>

                    {/* Receiver User's Articles */}
                    <ArticleList
                        articles={ownerArticles ?? []}
                        selectedArticleId={selectedArticles}
                        onSelectArticle={handleSelectArticle}
                    />

                    <h2 className='mb-4 mt-8 text-3xl font-extrabold text-teal-600'>
                        {`Ma besace ${myUser.pseudo}`}
                    </h2>
                    <p className='mb-8 text-lg text-gray-600'>
                        {
                            'Sélectionnez l’article que vous souhaitez donner en échange :'
                        }
                    </p>

                    {/* My User's Articles */}
                    <ArticleList
                        articles={myArticles ?? []}
                        selectedArticleId={selectedMyArticles}
                        onSelectArticle={handleSelectMyArticle}
                    />

                    {/* Exchange Recap */}
                    <ExchangeRecap
                        chosenArticle={chosenArticle}
                        givenArticle={givenArticle}
                    />

                    {/* Pass queryParams to the ConfirmationButton */}
                    <ConfirmationButton
                        queryParams={queryParams}
                        isDisabled={isConfirmationDisabled}
                    />
                </>
            )}
        </div>
    )
}

export default TransactionPage
