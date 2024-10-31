'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import { Card, CardContent, CardFooter } from '@/components/shadcn/ui/card'

import { getArticleById } from '@/utils/apiCalls/article'
import { getUserById } from '@/utils/apiCalls/user'

import { useAuth, useUser } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import router from 'next/router'

// receiverIdd: string
const TransactionPage = (): React.JSX.Element => {
    const { getToken } = useAuth()
    const [token, setToken] = useState<string>('')
    const { user } = useUser()

    const {} = useParams()

    const receiverId = 'user_2ncuxuDM3OEzHnstwawPctDPzYU'
    const userConnectedId = user?.id
    // const userConnectedId = 'user_2ncIl6OmYzbFV4S9YW0FgpIhx8x'

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

    // React query to get receiver user data
    const { data: receiverUser } = useQuery({
        queryKey: ['receiverUser', receiverId, token],
        queryFn: () => getUserById(receiverId, token),
        enabled: !!receiverId,
    })
    // React query to get my user's data
    const { data: myUser } = useQuery({
        queryKey: ['ConnectedUser', userConnectedId, token],
        queryFn: () => getUserById(userConnectedId, token),
        enabled: !!userConnectedId,
    })

    // get article by user :
    const { data: receiverArticles } = useQuery({
        queryKey: ['receiverArticles', receiverUser?.articles],
        queryFn: async () => {
            if (receiverUser?.articles) {
                return Promise.all(
                    receiverUser.articles.map((articleId) =>
                        getArticleById(articleId),
                    ),
                )
            }
            return []
        },
        enabled: !!receiverUser?.articles,
    })

    const { data: myArticles } = useQuery({
        queryKey: ['myArticles', myUser?.articles],
        queryFn: async () => {
            if (myUser?.articles) {
                return Promise.all(
                    myUser.articles.map((articleId) =>
                        getArticleById(articleId),
                    ),
                )
            }
            return []
        },
        enabled: !!myUser?.articles,
    })

    const [selectedReceiverArticles, setSelectedReceiverArticles] = useState<
        string | null
    >(null)
    const [selectedMyArticles, setSelectedMyArticles] = useState<string | null>(
        null,
    )

    const handleSelectReceiverArticle = (articleId: string) => {
        setSelectedReceiverArticles(articleId)
    }

    const handleSelectMyArticle = (articleId: string) => {
        setSelectedMyArticles(articleId)
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push(
            `/transaction/final?sender=${userConnectedId}&receiver=${receiverId}&articleSender=${selectedMyArticles}&articleReceiver=${selectedReceiverArticles}`,
        )
    }

    return (
        <div className='flex w-full flex-col items-center justify-center p-4'>
            {!!myUser && !!receiverUser && (
                <>
                    <h1 className='mb-2 text-xl font-bold'>
                        {`Besace de ${receiverUser.pseudo}`}
                    </h1>
                    <p className='mb-4 text-gray-500'>
                        {'Sélectionnez les produits qui vous intéressent !'}
                    </p>

                    {/* Receiver User's Articles */}
                    <div className='mb-6 w-full max-w-lg bg-gray-100 p-4'>
                        <h2 className='mb-2 font-bold'>
                            {/* {`Nombre d’objet(s) : ${selectedReceiverArticles.length}`} */}
                        </h2>
                        <div className='flex space-x-4'>
                            {receiverArticles && receiverArticles.length > 0 ? (
                                receiverArticles.map((article, index) => (
                                    <div
                                        key={
                                            article._id ||
                                            `receiver-article-${index}`
                                        }
                                        onClick={() => {
                                            handleSelectReceiverArticle(
                                                article.id,
                                            )
                                        }}
                                        className={`border p-4 ${selectedReceiverArticles?.includes(article.id) ? 'border-green-500' : 'border-gray-300'} cursor-pointer`}
                                    >
                                        <Card className='h-60 w-40 text-center'>
                                            <CardContent className='flex h-40 items-center justify-center overflow-hidden'>
                                                {' '}
                                                {!!article.imageUrls[0] && (
                                                    <Image
                                                        src={
                                                            article.imageUrls[0]
                                                        }
                                                        alt='Image de l’article'
                                                        className='h-full w-full object-cover'
                                                        width={160}
                                                        height={160}
                                                        priority
                                                    />
                                                )}
                                            </CardContent>
                                            <CardFooter className='flex justify-center'>
                                                <p className='text-sm font-medium'>
                                                    {article.adTitle}
                                                </p>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                ))
                            ) : (
                                <p>{'Cet utilisateur n’a pas d’articles'}</p>
                            )}
                        </div>
                    </div>

                    <h2 className='mb-2 text-xl font-bold'>
                        {`Ma besace ${myUser.pseudo}`}
                    </h2>

                    {/* My User's Articles */}
                    <div className='mb-6 w-full max-w-lg bg-gray-100 p-4'>
                        <h2 className='mb-2 font-bold'>
                            {/* {`Nombre d’objet(s) : ${selectedMyArticles.length}`} */}
                        </h2>
                        <div className='flex space-x-4'>
                            {myArticles && myArticles.length > 0 ? (
                                myArticles.map((article, index) => (
                                    <div
                                        key={
                                            article._id ||
                                            `receiver-article-${index}`
                                        }
                                        onClick={() => {
                                            handleSelectMyArticle(article.id)
                                        }}
                                        className={`border p-4 ${selectedMyArticles?.includes(article.id) ? 'border-green-500' : 'border-gray-300'} cursor-pointer`}
                                    >
                                        <Card className='h-60 w-40 text-center'>
                                            <CardContent className='flex h-40 items-center justify-center overflow-hidden'>
                                                {!!article.imageUrls[0] && (
                                                    <Image
                                                        src={
                                                            article.imageUrls[0]
                                                        }
                                                        alt='Image de l’article'
                                                        className='h-full w-full object-cover'
                                                        width={160}
                                                        height={160}
                                                        priority
                                                    />
                                                )}
                                            </CardContent>
                                            <CardFooter className='flex justify-center'>
                                                <p className='text-sm font-medium'>
                                                    {article.adTitle}
                                                </p>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                ))
                            ) : (
                                <p>{'Vous n’avez pas d’articles'}</p>
                            )}
                        </div>
                    </div>
                    {/* Confirmation Button */}
                    <div className='mr-100 flex w-2 justify-end'>
                        <button
                            onClick={handleClick}
                            className='justify-end rounded bg-teal-500 px-6 py-3 font-bold text-white'
                        >
                            Valider
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default TransactionPage
