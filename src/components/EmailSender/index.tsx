/* eslint-disable no-console */
'use client'

import { useSendEmail } from '@/utils/apiCalls/local/mutations'

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
    const { mutateAsync: sendEmail } = useSendEmail()

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
                    console.log('email sent')
                },
                onError: (error: Error) => {
                    console.error('Error sending email:', error)
                },
            },
        )
    }

    return (
        <div>
            <Button
                onClick={() => {
                    handleSendEmail().catch(() => {
                        console.error('Error sending email:')
                    })
                }}
                className='bg-teal-500 text-white'
                aria-label='Je veux acheter cet article'
            >
                {'Je le veux !'}
            </Button>
        </div>
    )
}

export default EmailSender
