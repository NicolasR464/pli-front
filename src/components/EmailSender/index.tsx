/* eslint-disable no-console */
'use client'

import { useSendEmail } from '@/utils/apiCalls/local/mutations'

import { Button } from '../shadcn/ui/button'

const EmailSender = (): React.JSX.Element => {
    const { mutateAsync: sendEmail } = useSendEmail()

    const handleSendEmail = async (): Promise<void> => {
        await sendEmail(
            {
                senderEmail: 'nicolas.rocagel@gmail.com',
                receiverEmail: 'rocage_n@etna-alternance.net',
                article: {
                    _id: '123',
                    adTitle: 'Article 1',
                    imageUrls: ['https://example.com/image.jpg'],
                },
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
