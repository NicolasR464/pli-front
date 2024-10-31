'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import type { TransactionParams } from '@/utils/apiCalls/transaction/mutations'
import { useCreateTransaction } from '@/utils/apiCalls/transaction/mutations'

import { useAuth } from '@clerk/nextjs'

const PostTransaction = (): React.JSX.Element => {
    const [isTransactionCreated, setIsTransactionCreated] = useState(false)
    const { mutateAsync: createTransaction } = useCreateTransaction()
    const [paramsObject, setParamsObject] =
        useState<Partial<TransactionParams>>()
    const { getToken } = useAuth()
    const searchParams = useSearchParams()

    useEffect(() => {
        for (const [key, value] of searchParams.entries()) {
            setParamsObject((prev) => ({ ...prev, [key]: value }))
        }
    }, [searchParams])

    // data to send: sender, receiver, senderArticle, receiverArticle
    useEffect(() => {
        const createTransactionWithToken = async (): Promise<void> => {
            const JWT = await getToken({ template: 'trocup-1' })

            if (
                paramsObject &&
                'sender' in paramsObject &&
                paramsObject.sender &&
                'receiver' in paramsObject &&
                paramsObject.receiver &&
                'senderArticle' in paramsObject &&
                paramsObject.senderArticle &&
                JWT
            ) {
                createTransaction(
                    {
                        data: {
                            sender: paramsObject.sender as string,
                            receiver: paramsObject.receiver as string,
                            senderArticle: paramsObject.senderArticle as string,
                        },
                        JWT,
                    },
                    {
                        onSuccess: () => {
                            setIsTransactionCreated(true)
                        },
                    },
                )
            }
        }

        createTransactionWithToken()
    }, [createTransaction, getToken, paramsObject, searchParams])

    return (
        <div>
            {'Transaction final'}
            {JSON.stringify(paramsObject)}
            {!!isTransactionCreated && 'Transaction created'}
        </div>
    )
}

export default PostTransaction
