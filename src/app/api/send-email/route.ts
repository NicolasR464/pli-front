import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { EmailTypeSchema } from '@/types'
import type { Article } from '@/types/article'
import { environment } from '@/types/environment'
import { TransactionTypesSchema } from '@/types/transaction/actions'

import type { MailDataRequired } from '@sendgrid/mail'
import mail from '@sendgrid/mail'

mail.setApiKey(environment.SENDGRID_API_KEY)

const sendgridTemplateIDs = {
    TRANSACTION_REQUEST_1ToM: 'd-5c5f77fe1ad44491b80b1bf551d3fa2b',
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    const formData = await request.formData()
    const senderEmail = formData.get('senderEmail')
    const receiverEmail = formData.get('receiverEmail')
    const articleParam = formData.get('article')

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const article: Partial<Article> | undefined = articleParam
        ? JSON.parse(articleParam as string)
        : undefined

    if (
        emailType === EmailTypeSchema.enum.TRANSACTION_REQUEST &&
        transactionType === TransactionTypesSchema.enum.ONE_TO_MANY
    ) {
        const message: MailDataRequired = {
            to: receiverEmail as string,
            from: senderEmail as string,
            subject: 'Nouvelle demande sur TrocUp !',
            templateId: sendgridTemplateIDs.TRANSACTION_REQUEST_1ToM,
            dynamicTemplateData: {
                userApseudo: userA.pseudo,
                articleAtitle: userB.email,
                articleAimage: article.adTitle,
                transactionId: transaction.id,
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

    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
}
