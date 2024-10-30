/* eslint-disable new-cap */
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { EmailTemplate } from '@/components/EmailTemplate'

import { environment } from '@/types/environment'

import { Resend } from 'resend'

const resend = new Resend(environment.RESEND_API_KEY)

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    const formData = await request.formData()

    const senderEmail = formData.get('senderEmail')
    const receiverEmail = formData.get('receiverEmail')

    console.log(senderEmail)

    const { data, error } = await resend.emails.send({
        from: senderEmail as string,
        to: [receiverEmail as string],
        subject: 'Hello world',
        react: EmailTemplate({ firstName: 'John' }),
    })

    if (error) {
        return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json(data)
}
