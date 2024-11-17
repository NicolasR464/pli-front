/* eslint-disable no-console */
'use client'

import { useState } from 'react'

import { Button } from '@/components/shadcn/ui/button'

import { useUserStore } from '@/stores/user'
import { useSendEmail } from '@/utils/apiCalls/local/mutations'
import { useCreatePreTransaction } from '@/utils/apiCalls/transaction/mutations'
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
export type TransactionRequestProps = {
    readonly userB: Pick<User, 'id' | 'email'>
    readonly articleB: PartialArticleFields
    // If the transaction is 1to1, the articleA info is required
    readonly articleA?: PartialArticleFields
    readonly textButton?: string
}

/**
 * Component for the transaction requests made by the user (1to1 and 1toM)
 * @param {object} props - Component props
 * @param {User['id']} props.userB - The recipient user id
 * @param {ArticleFields} props.articleB - The article being requested
 * @param {ArticleFields} [props.articleA] - The article being offered in exchange (for 1to1 trades)
 * @param {string} props.textButton - The text of the button
 * @exports TransactionRequest
 */
const TransactionRequest = ({
    userB,
    articleB,
    // If the transaction is 1to1, the articleA info is required
    articleA = undefined,
    textButton = 'Je veux !',
}: TransactionRequestProps): React.JSX.Element => {
    const { mutateAsync: sendEmail, isSuccess: emailSent } = useSendEmail()
    const { getToken } = useAuth()

    const { mutateAsync: createPreTransaction } = useCreatePreTransaction()

    console.log('userB', userB)
    console.log('articleB', articleB)

    // The userA is the user who is sending the request
    const userAstore = useUserStore((state) => state.user)
    const { userId: userA } = useAuth()

    const [buttonTxt, setButtonTxt] = useState(textButton)

    if (articleA) {
        // @TODO : For 1to1 transactions, do a post request to transaction service - to do a pre-transaction

        // eslint-disable-next-line no-console
        console.log('articleA', articleA)
    }

    const handleTransactionRequest = async (): Promise<void> => {
        const JWT = await getToken({ template: 'trocup-1' })

        if (!JWT || !userA || !userB.id) {
            notify({
                message: userMessages.requestSent.type.ERROR,
                type: NotificationType.enum.ERROR,
            })
            return
        }

        const { id: transactionID } = await createPreTransaction(
            {
                data: {
                    userA,
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
                        setButtonTxt('Demande déjà envoyée !')
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
                    userA: userAstore,
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

                    setButtonTxt('Demande envoyée !')
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
                className='rounded-lg bg-gradient-to-r from-teal-400 to-teal-600 px-6 py-2 text-white shadow-md transition duration-300 ease-in-out hover:from-teal-500 hover:to-teal-700'
                aria-label='transaction request'
            >
                {buttonTxt}
            </Button>
        </div>
    )
}

export default TransactionRequest
