/* eslint-disable no-console */
'use client'

import { useState } from 'react'

import { Button } from '@/components/shadcn/ui/button'

import { useUserStore } from '@/stores/user'
import { useSendEmail } from '@/utils/apiCalls/local/mutations'
import { useCreateTransaction } from '@/utils/apiCalls/transaction/mutations'
import { userMessages } from '@/utils/constants'
import { notify } from '@/utils/functions/toasterHelper'

import { EmailTypeSchema, NotificationType } from '@/types'
import {
    type PartialArticleFields,
    TransactionStatesSchema,
} from '@/types/transaction/actions'
import type { User } from '@/types/user'

import { useAuth } from '@clerk/nextjs'

/**
 * Props for the TransactionRequest component
 */
type TransactionRequestProps = {
    readonly userB: Partial<User>
    readonly articleB: PartialArticleFields
    // If the transaction is 1to1, the articleA info is required
    readonly articleA?: PartialArticleFields
}

/**
 * Component for the transaction requests made by the user (1to1 and 1toM)
 * @param {object} props - Component props
 * @param {Partial<User>} props.userB - The recipient user
 * @param {ArticleFields} props.articleB - The article being requested
 * @param {ArticleFields} [props.articleA] - The article being offered in exchange (for 1to1 trades)
 * @exports TransactionRequest
 */
const TransactionRequest = ({
    userB,
    articleB,
    // If the transaction is 1to1, the articleA info is required
    articleA = undefined,
}: TransactionRequestProps): React.JSX.Element => {
    const { mutateAsync: sendEmail, isSuccess: emailSent } = useSendEmail()
    const { getToken } = useAuth()

    const { mutateAsync: createTransaction } = useCreateTransaction()

    // The userA is the user who is sending the request
    const userA = useUserStore((state) => state.user)
    const { userId: userIdA } = useAuth()

    const [buttonText, setButtonText] = useState('Je veux !')

    if (articleA) {
        // @TODO : For 1to1 transactions, do a post request to transaction service - to do a pre-transaction

        // eslint-disable-next-line no-console
        console.log('articleA', articleA)
    }

    const handleTransactionRequest = async (): Promise<void> => {
        const JWT = await getToken({ template: 'trocup-1' })

        if (!JWT || !userIdA || !userB.id) {
            notify({
                message: userMessages.requestSent.type.ERROR,
                type: NotificationType.enum.ERROR,
            })
            return
        }

        const { id: transactionID } = await createTransaction(
            {
                data: {
                    userA: userIdA,
                    userB: userB.id,
                    articleB: {
                        id: articleB.id,
                        price: articleB.price,
                    },
                    ...(articleA && {
                        articleA: {
                            id: articleA.id,
                            price: articleA.price,
                        },
                    }),
                    state: TransactionStatesSchema.enum.PENDING,
                },
                JWT,
            },
            {
                onError: (error: unknown) => {
                    if (
                        error &&
                        typeof error === 'object' &&
                        'status' in error &&
                        error.status === 409
                    ) {
                        setButtonText('Demande déjà envoyée !')
                    } else {
                        notify({
                            message: userMessages.requestSent.type.ERROR,
                            type: NotificationType.enum.ERROR,
                        })
                    }
                },
            },
        )

        await sendEmail(
            {
                contentData: {
                    userA,
                    userB,
                    articleB,
                    transactionID,
                },
                emailType: EmailTypeSchema.enum.TRANSACTION_REQUEST,
            },

            {
                onSuccess: () => {
                    notify({
                        message: userMessages.requestSent.type.SUCCESS,
                        type: NotificationType.enum.SUCCESS,
                    })

                    setButtonText('Demande envoyée !')
                },
                onError: () => {
                    notify({
                        message: userMessages.requestSent.type.ERROR,
                        type: NotificationType.enum.ERROR,
                    })
                },
            },
        )
    }

    return (
        <div>
            <Button
                disabled={emailSent}
                onClick={() => {
                    handleTransactionRequest()
                }}
                className='bg-teal-500 text-white'
                aria-label='transaction request'
            >
                {buttonText}
            </Button>
        </div>
    )
}

export default TransactionRequest
