'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'

import { useConfirmTransaction } from '@/utils/apiCalls/transaction/mutations'

import { TransactionStatesSchema } from '@/types/transaction/actions'

import { useAuth } from '@clerk/nextjs'
import { NotificationType } from '@/types'
import { notify } from '@/utils/functions/toasterHelper'

const PostTransaction = (): React.JSX.Element => {
    const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false)
    const { mutateAsync: confirmTransaction } = useConfirmTransaction()

    const { getToken } = useAuth()
    const params = useParams()
    const transactionId = params.id as string

    const handleConfirmTransaction = async (): Promise<void> => {
        const JWT = await getToken()

        console.log('🔥 handleConfirmTransaction')

        console.log(JWT, transactionId)

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
                    console.log('🔥 onSuccess')
                    setIsTransactionConfirmed(true)
                },
                onError: () => {
                    console.log('🔥 onError')
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
            <h1 className='text-center text-2xl font-bold'>
                {isTransactionConfirmed
                    ? 'Transaction confirmée !'
                    : 'Confirmer la transaction'}
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
