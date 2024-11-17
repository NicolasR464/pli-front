import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { EmailTypeSchema } from '@/types'
import { environment } from '@/types/environment'
import type { EmailParams } from '@/types/mutations/local'

import type { MailDataRequired } from '@sendgrid/mail'
import mail from '@sendgrid/mail'

mail.setApiKey(environment.SENDGRID_API_KEY)

const sendgridTemplateIDs = {
    TRANSACTION_REQUEST_1ToM: 'd-5c5f77fe1ad44491b80b1bf551d3fa2b',
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    const { contentData, emailType } = (await request.json()) as EmailParams

    const { userA, userB, articleB, transactionID } = contentData

    if (
        emailType === EmailTypeSchema.enum.TRANSACTION_REQUEST &&
        !('articleA' in contentData) &&
        userA &&
        userB &&
        articleB &&
        transactionID
    ) {
        // This is a request for a 1 to M transaction

        const message: MailDataRequired = {
            to: userB.email,
            from: environment.FROM_EMAIL,
            templateId: sendgridTemplateIDs.TRANSACTION_REQUEST_1ToM,
            dynamicTemplateData: {
                subject: 'Nouvelle demande sur TrocUp !',
                userApseudo: userA.pseudo,
                articleAtitle: articleB.adTitle,
                articleAimage: articleB.imageUrl,
                transactionID,
            },
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const mailMsg: number = await mail.send(message).then(
            () => {
                return 200
            },
            () => {
                return 400
            },
        )

        return NextResponse.json(
            { res: mailMsg === 200 ? 'email sent' : 'email error' },
            { status: mailMsg },
        )
    }

    return NextResponse.json({ message: 'Nothing' })
}
