import { NextResponse } from 'next/server'

/**
 * POST endpoint for storing and analyzing an image.
 * @returns {Promise<NextResponse>} A response object with the analysis result or an error message.
 */
// eslint-disable-next-line @typescript-eslint/require-await
export const POST = async (): Promise<NextResponse> => {
    return NextResponse.json(
        { data: 'test' },
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        },
    )
}
