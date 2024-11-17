'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { useConfirmTransaction } from '@/utils/apiCalls/transaction/mutations'

import { TransactionStatesSchema } from '@/types/transaction/actions'

import { useAuth } from '@clerk/nextjs'

const PostTransaction = (): React.JSX.Element => {
    const [isTransactionCreated, setIsTransactionCreated] = useState(false)
    const { mutateAsync: confirmTransaction } = useConfirmTransaction()

    const { getToken } = useAuth()
    const searchParams = useSearchParams()
    const transactionId = searchParams.get('id')

    const handleConfirmTransaction = async (): Promise<void> => {
        const JWT = await getToken()

        if (!JWT || !transactionId) return

        // Create confirm transaction mutation

        confirmTransaction(
            {
                data: {
                    id: transactionId,
                    state: TransactionStatesSchema.enum.ACCEPTED,
                },
                JWT,
            },
            {
                onSuccess: () => {
                    setIsTransactionCreated(true)
                },
                onError: () => {
                    setIsTransactionCreated(false)
                },
            },
        )
    }

    return (
        <div>
            <h1 className='text-center text-2xl font-bold'>
                {isTransactionCreated
                    ? 'Transaction créée !'
                    : 'Une erreur est survenue lors de la création de la transaction.'}
            </h1>

            <button
                onClick={() => {
                    handleConfirmTransaction()
                }}
            >
                {'Confirmer la transaction'}
            </button>
        </div>
    )
}

export default PostTransaction
