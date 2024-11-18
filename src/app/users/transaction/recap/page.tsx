'use client'

import React, { useState } from 'react'

import AskLogin from '@/components/AskLogin'
import ArticleList from '@/components/transactions/ArticleList'
import ConfirmationButton from '@/components/transactions/ConfirmTransac'
import ExchangeRecap from '@/components/transactions/TransacRecap'

import { useTransactionStore } from '@/stores/transaction'

import useArticlesByUser from '@/hooks/useArticlesByUser'
import useUserById from '@/hooks/useUserById'
import { useUser } from '@clerk/nextjs'

const TransactionPage = (): React.JSX.Element => {
    // Get connected user info
    const { user } = useUser()
    const userConnectedId = user?.id

    // Get info from article/id page and set variable with heir values
    const { transacUser_b } = useTransactionStore((state) => ({
        transacUser_b: state.transacUser_b,
    }))
    const user_b_id = String(transacUser_b)

    // get params to send transaction request :
    const { setQueryParams, queryParams } = useTransactionStore((state) => ({
        setQueryParams: state.setQueryParams,
        queryParams: state.queryParams,
    }))

    // Get info about the owner and their articles
    const { data: user_b_data } = useUserById(user_b_id)
    const { data: user_b_articles } = useArticlesByUser(user_b_id)
    // Get info about the user and their articles
    const { data: myUser } = useUserById(userConnectedId)
    const { data: myArticles } = useArticlesByUser(userConnectedId)

    //create selected state article I want and the one I exchange
    const [selectedArticles, setSelectedArticles] = useState<
        string | undefined
    >()
    const [selectedMyArticles, setSelectedMyArticles] = useState<
        string | undefined
    >()

    // handle select function : article I want
    const handleSelectArticle = (article_b_id: string): void => {
        setSelectedArticles(article_b_id)

        // Find the article requested (article I want)
        const chosenArticle = user_b_articles?.find(
            (article) => article.id === article_b_id,
        )
        const givenArticle = myArticles?.find(
            (article) => article.id === selectedMyArticles,
        )

        if (chosenArticle && givenArticle) {
            // Update queryParams when article is selected
            setQueryParams({
                user_a: userConnectedId,
                user_b: user_b_id,
                article_a: selectedMyArticles,
                article_a_title: givenArticle.adTitle,
                article_a_image: givenArticle.imageUrls[0],
                article_a_delivery: givenArticle.deliveryType,

                article_b: article_b_id,
                article_b_title: chosenArticle.adTitle,
                article_b_image: chosenArticle.imageUrls[0],
                article_b_delivery: chosenArticle.deliveryType,
            })
        }
    }

    // handle select function : article I give
    const handleSelectMyArticle = (article_a_id: string): void => {
        setSelectedMyArticles(article_a_id)

        // Find the article offered (article I give)
        const givenArticle = myArticles?.find(
            (article) => article.id === article_a_id,
        )
        const chosenArticle = user_b_articles?.find(
            (article) => article.id === selectedArticles,
        )

        if (givenArticle && chosenArticle) {
            // Update queryParams when article is selected
            setQueryParams({
                user_a: userConnectedId,
                user_b: user_b_id,
                article_a: article_a_id,
                article_a_title: givenArticle.adTitle,
                article_a_image: givenArticle.imageUrls[0],
                article_a_delivery: givenArticle.deliveryType,

                article_b: selectedArticles,
                article_b_title: chosenArticle.adTitle,
                article_b_image: chosenArticle.imageUrls[0],
                article_b_delivery: chosenArticle.deliveryType,
            })
        }
    }

    // Get selected articles data for the recap
    const chosenArticle = user_b_articles?.find(
        (article) => article.id === selectedArticles,
    )
    const givenArticle = myArticles?.find(
        (article) => article.id === selectedMyArticles,
    )

    // Cannot send request if articles not selected
    const isConfirmationDisabled = !(selectedArticles && selectedMyArticles)

    return (
        <div className='flex w-full flex-col items-center justify-center bg-gray-50 p-4'>
            {/* Check if user and user_b_data are available */}
            {user && myUser && user_b_data ? (
                <>
                    <h1 className='mb-4 text-3xl font-extrabold text-teal-600'>
                        {`Besace de ${user_b_data.pseudo}`}
                    </h1>
                    <p className='mb-8 text-lg text-gray-600'>
                        {'Sélectionnez l’article qui vous intéresse !'}
                    </p>

                    {/* Other User's Articles */}
                    <ArticleList
                        articles={user_b_articles ?? []}
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
            ) : (
                <AskLogin />
            )}
        </div>
    )
}

export default TransactionPage
