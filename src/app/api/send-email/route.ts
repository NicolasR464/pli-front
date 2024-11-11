import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import type { Article } from '@/types/article'
import { environment } from '@/types/environment'

import type { MailDataRequired } from '@sendgrid/mail'
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
        article.id
    ) {
        const mailBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
           
            <h2>Nouvelle demande sur TrocUp!</h2>

            <p>Quelqu’un est intéressé.e par votre article:</p>

            <div style="margin: 20px 0;">
                <img src="${article.imageUrls[0]}" alt="Article image" style="max-width: 300px; height: auto; margin: 0 auto;"/>
            </div>

            <p><strong>${article.adTitle}</strong></p>

            <a href="http://localhost:3000/transaction/final?receiver=${String(receiverEmail)}&sender=${String(senderEmail)}&senderArticle=${article.id}&validation=true" style="display: inline-block; margin: 10px; padding: 10px 20px; border: 2px solid green; border-radius: 5px; color: green; text-decoration: none;">J’accepte</a>

            <a href="http://localhost:3000/transaction/final?receiver=${String(receiverEmail)}&sender=${String(senderEmail)}&senderArticle=${article.id}&validation=false" style="display: inline-block; margin: 10px; padding: 10px 20px; border: 2px solid red; border-radius: 5px; color: red; text-decoration: none;">Je refuse</a>

            <div style="width: 100%; text-align: center;">
                <img src="https://res.cloudinary.com/etna-assets/image/upload/v1723194846/Fichier_33_4x_cbaogn.png" alt="TrocUp logo" style="width: 200px; height: auto; margin: 0 auto;"/>
            </div>
        </div>
    `
        const message: MailDataRequired = {
            to: receiverEmail as string,
            from: senderEmail as string,
            subject: 'Nouvelle demande sur TrocUp !',
            content: [
                {
                    type: 'text/html',
                    value: mailBody,
                },
            ],
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
