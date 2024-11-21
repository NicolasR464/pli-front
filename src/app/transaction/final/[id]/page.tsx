/* eslint-disable multiline-comment-style */
'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/shadcn/ui/button'

import { getArticleById } from '@/utils/apiCalls/article'
import { getTransaction } from '@/utils/apiCalls/transaction'
import { useConfirmTransaction } from '@/utils/apiCalls/transaction/mutations'
import { pagePaths, rqKeys, userMessages } from '@/utils/constants'
import { notify } from '@/utils/functions/toasterHelper'

import { NotificationType } from '@/types'
import type { TransactionStates } from '@/types/transaction/actions'
import { TransactionStatesSchema } from '@/types/transaction/actions'

import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'

const PostTransaction = (): React.JSX.Element => {
    const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false)
    const [jwtToken, setJwtToken] = useState<string>()
    const router = useRouter()

    const { mutateAsync: confirmTransaction } = useConfirmTransaction()
    const { getToken } = useAuth()
    const params = useParams()
    const transactionId = params.id as string

    useEffect(() => {
        const fetchJWT = async (): Promise<void> => {
            const token = await getToken()
            if (token) setJwtToken(token)

            if (!token) {
                notify({
                    message: userMessages.notLoggedIn.type.ERROR,
                    type: NotificationType.enum.ERROR,
                })
            }
        }
        fetchJWT()
    }, [getToken])

    // Fetch the transaction data
    const { data: transaction, isFetched: isTransactionFetched } = useQuery({
        queryKey: [rqKeys.TRANSACTION, transactionId, jwtToken],
        queryFn: () => getTransaction(transactionId, jwtToken!),
        enabled: !!transactionId && !!jwtToken,
    })

    // Set the transaction confirmed state
    useEffect(() => {
        if (
            transaction &&
            transaction.state === TransactionStatesSchema.enum.ACCEPTED
        ) {
            setIsTransactionConfirmed(true)
        }
    }, [transaction, isTransactionFetched])

    // Fetch the articleB data
    const { data: articleB, isFetched: isArticleBFetched } = useQuery({
        queryKey: [rqKeys.ARTICLE, transaction?.articleB, transaction],
        queryFn: () => getArticleById(transaction!.articleB),
        enabled:
            isTransactionFetched && !!transaction && !!transaction.articleB,
    })

    // Fetch the articleA data
    const { data: articleA, isFetched: isArticleAFetched } = useQuery({
        queryKey: [rqKeys.ARTICLE, transaction?.articleA, transaction],
        queryFn: () => getArticleById(transaction!.articleA!),
        enabled:
            isTransactionFetched &&
            !!transaction &&
            'articleA' in transaction &&
            !!transaction.articleA,
    })

    // Fetch the userA data (the one who requested the transaction)

    // const { data: userA, isFetched: isUserAFetched } = useQuery({
    //     queryKey: [rqKeys.USER, transaction?.userA, transaction],
    //     queryFn: () => getUserById(transaction!.userA),
    //     enabled: isTransactionFetched && !!transaction && !!transaction.userA,
    // })

    /**
     * Handle the confirmation of the transaction by userB (the one who is asked a transaction request)
     * @param {TransactionStates} state - The state of the transaction
     */
    const handleConfirmTransaction = async (
        state: TransactionStates,
    ): Promise<void> => {
        const JWT = await getToken()

        if (!JWT) {
            notify({
                message: userMessages.notLoggedIn.type.ERROR,
                type: NotificationType.enum.ERROR,
            })
            return
        }

        if (!transactionId) {
            notify({
                message:
                    'Une erreur est survenue lors de la confirmation de la transaction.',
                type: NotificationType.enum.ERROR,
            })
            return
        }

        // Create confirm transaction mutation
        confirmTransaction(
            {
                data: {
                    id: transactionId,
                    state,
                },
                JWT,
            },
            {
                onSuccess: () => {
                    if (state === TransactionStatesSchema.enum.REFUSED) {
                        router.push(pagePaths.HOME)
                    } else {
                        setIsTransactionConfirmed(true)
                    }
                },
                onError: () => {
                    setIsTransactionConfirmed(false)
                    notify({
                        message:
                            'Une erreur est survenue lors de la confirmation de la transaction.',
                        type: NotificationType.enum.ERROR,
                    })
                },
            },
        )
    }

    return (
        <div>
            <h1
                className={`mt-4 text-center text-2xl font-bold ${
                    isTransactionConfirmed && 'text-green-500'
                }`}
            >
                {!!isTransactionFetched &&
                    !!isTransactionConfirmed &&
                    'Transaction confirmée !'}

                {!!isTransactionFetched && !isTransactionConfirmed && (
                    <>
                        {'Confirmer le '}
                        <i>{'trocUp'}</i>
                    </>
                )}
            </h1>

            <div className='mt-4 flex w-full flex-wrap justify-around p-4'>
                {!!isArticleAFetched && !!articleA && (
                    <div className='flex flex-col items-center rounded-md border border-[#173141] p-4'>
                        <span className='text-center text-lg font-bold'>
                            {'J’échange'}
                        </span>

                        <Image
                            src={articleA.imageUrls[0]}
                            alt='Product image'
                            width={300}
                            height={300}
                        />

                        <h2 className='text-center text-lg font-bold'>
                            {articleA.adTitle}
                        </h2>
                    </div>
                )}

                {!!isArticleBFetched && !!articleB && (
                    <div className='flex flex-col items-center rounded-md border border-[#F7BB1E] p-4'>
                        {!!isArticleAFetched && !!articleA && (
                            <span className='text-center text-lg font-bold'>
                                {'Contre'}
                            </span>
                        )}

                        <Image
                            src={articleB.imageUrls[0]}
                            alt='Product image'
                            width={300}
                            height={300}
                        />

                        <h2 className='text-center text-lg font-bold'>
                            {articleB.adTitle}
                        </h2>
                    </div>
                )}
            </div>

            {!!isTransactionFetched && !isTransactionConfirmed && (
                <div className='flex justify-center'>
                    <Button
                        className='text-[#ff5234] underline underline-offset-2'
                        onClick={() => {
                            handleConfirmTransaction(
                                TransactionStatesSchema.enum.REFUSED,
                            )
                        }}
                    >
                        {'Je refuse'}
                    </Button>

                    <Button
                        className='transform bg-[#55ff42] transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-[#35ff50] hover:bg-opacity-75'
                        onClick={() => {
                            handleConfirmTransaction(
                                TransactionStatesSchema.enum.ACCEPTED,
                            )
                        }}
                    >
                        {'Je confirme'}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default PostTransaction
