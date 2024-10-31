/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import type { Article } from '@/types/article'
import { environment } from '@/types/environment'

import mail from '@sendgrid/mail'

mail.setApiKey(environment.SENDGRID_API_KEY)

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
        receiverEmail &&
        senderEmail &&
        article?.imageUrls &&
        article.imageUrls.length > 0 &&
        article._id
    ) {
        const mailBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Nouvelle demande sur TrocUp!</h2>
            <p>Quelqu’un est intéressé.e par votre article:</p>
            <div style="margin: 20px 0;">
                <img src="${article.imageUrls[0]}" alt="Article image" style="max-width: 300px; height: auto;"/>
            </div>
            <p><strong>${article.adTitle}</strong></p>
            <p>Pour voir les détails, <a href="https://localhost:3000/${article._id}">cliquez ici</a></p>
            <p>L’équipe TrocUp</p>
        </div>
    `
        const message = {
            to: receiverEmail,
            from: senderEmail,
            subject: 'TrocUp',
            content: [
                {
                    type: 'text/html',
                    value: mailBody,
                },
            ],
        }

        const mailMsg = await mail.send(message).then(
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
