'use client'

import { Button } from '@/components/shadcn/ui/button'

import { useUserStore } from '@/stores/user'
import { useSendEmail } from '@/utils/apiCalls/local/mutations'
import { userMessages } from '@/utils/constants'
import { notify } from '@/utils/functions/toasterHelper'

import { EmailTypeSchema, NotificationType } from '@/types'
import type { Article } from '@/types/article'
import type { User } from '@/types/user'

/**
 * Fields of the article that are required for the transaction request
 * @exports ArticleFields
 */
type ArticleFields = {
    adTitle: Article['adTitle']
    description: Article['description']
    /** Get the first image url of the article - imageUrls[0] */
    imageUrl: Article['imageUrls'][number]
}

/**
 * Props for the TransactionRequest component
 * @exports TransactionRequestProps
 */
type TransactionRequestProps = {
    readonly userB: Partial<User>
    readonly articleB: ArticleFields
    // If the transaction is 1to1, the articleA info is required
    readonly articleA?: ArticleFields
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

    // The userA is the user who is sending the request
    const userA = useUserStore((state) => state.user)

    if (articleA) {
        // @TODO : For 1to1 transactions, do a post request to transaction service - to do a pre-transaction

        // eslint-disable-next-line no-console
        console.log('articleA', articleA)
    }

    const handleSendEmail = async (): Promise<void> => {
        if (!userA.pseudo || !userB.email || !articleB.adTitle) {
            notify({
                message: userMessages.requestSent.type.ERROR,
                type: NotificationType.enum.ERROR,
            })

            return
        }

        await sendEmail(
            {
                contentData: {
                    userA,
                    userB,
                    articleB,
                },
                emailType: EmailTypeSchema.enum.TRANSACTION_REQUEST,
            },

            {
                onSuccess: () => {
                    notify({
                        message: userMessages.requestSent.type.SUCCESS,
                        type: NotificationType.enum.SUCCESS,
                    })
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
                    handleSendEmail()
                }}
                className='bg-teal-500 text-white'
                aria-label='Je veux acheter cet article'
            >
                {emailSent ? 'Demande envoyée !' : 'Je veux !'}
            </Button>
        </div>
    )
}

export default TransactionRequest
