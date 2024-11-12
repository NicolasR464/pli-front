// TransactionPage.tsx
'use client'

import React, { useState } from 'react'
import { useTransactionStore } from '@/stores/transaction'
import ArticleList from '@/components/transacArticles/articleList'
import { useUser } from '@clerk/nextjs'
import ExchangeRecap from '@/components/transacArticles/transacRecap'
import ConfirmationButton from '@/components/transacArticles/confirmTransac'
import useUserById from '@/hooks/useUserById'
import useArticlesByUser from '@/hooks/useArticlesByUser'

const TransactionPage = (): React.JSX.Element => {
    // Transaction store :

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

    // Get connected user info
    const { user } = useUser()
    const userConnectedId = user?.id

    // Get info about the owner and their articles
    const { data: ownerUser } = useUserById(ownerId)
    const { data: ownerArticles } = useArticlesByUser(ownerId)
    // Get info about the user and their articles
    const { data: myUser } = useUserById(userConnectedId)
    const { data: myArticles } = useArticlesByUser(userConnectedId)

    // Article I want : selected state, select function and article recap
    const [selectedArticles, setSelectedArticles] = useState<
        string | undefined
    >(initalArticle)
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
    const chosenArticle = ownerArticles?.find(
        (article) => article.id === selectedArticles,
    )

    // Article I give in exchange : selected state, select function and article recap
    const [selectedMyArticles, setSelectedMyArticles] = useState<
        string | undefined
    >()
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
                        {"Sélectionnez l'article qui vous intéresse !"}
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
                            "Sélectionnez l'article que vous souhaitez donner en échange :"
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
