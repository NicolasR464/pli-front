'use client'

import { useSendEmail } from '@/utils/apiCalls/local/mutations'
import { userMessages } from '@/utils/constants'
import { notify } from '@/utils/functions/toasterHelper'

import { NotificationType } from '@/types'
import type { Article } from '@/types/article'

import { Button } from '@/components/shadcn/ui/button'

const InstantTransactionRequest = ({
    userB,
    articleB,
}: {
    readonly senderEmail: string | undefined
    readonly receiverEmail: string | undefined
    readonly article: Partial<Article>
}): React.JSX.Element => {
    const { mutateAsync: sendEmail, isSuccess: emailSent } = useSendEmail()

    // TODO : Get userA from useUser store

    const handleSendEmail = async (): Promise<void> => {
        if (!userA || !userB || !articleB) {
            notify({
                message: userMessages.requestSent.type.ERROR,
                type: NotificationType.enum.ERROR,
            })
            return
        }

        await sendEmail(
            {
                userA,
                userB,
                articleB,
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

export default InstantTransactionRequest
