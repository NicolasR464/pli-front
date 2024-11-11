'use client'

import { useSendEmail } from '@/utils/apiCalls/local/mutations'
import { userMessages } from '@/utils/constants'
import { notify } from '@/utils/functions/toasterHelper'

import { NotificationType } from '@/types'
import type { Article } from '@/types/article'

import { Button } from '../shadcn/ui/button'

const EmailSender = ({
    senderEmail,
    receiverEmail,
    article,
}: {
    readonly senderEmail: string | undefined
    readonly receiverEmail: string | undefined
    readonly article: Partial<Article>
}): React.JSX.Element => {
    const { mutateAsync: sendEmail, isSuccess: emailSent } = useSendEmail()

    const handleSendEmail = async (): Promise<void> => {
        if (!senderEmail || !receiverEmail) {
            return
        }

        await sendEmail(
            {
                senderEmail,
                receiverEmail,
                article,
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
                {emailSent ? 'Demande envoyée !' : 'Je le veux !'}
            </Button>
        </div>
    )
}

export default EmailSender
