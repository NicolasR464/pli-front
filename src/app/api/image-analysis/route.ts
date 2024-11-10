import { NextResponse } from 'next/server'

// eslint-disable-next-line jsdoc/require-jsdoc, func-style, prefer-arrow-functions/prefer-arrow-functions, @typescript-eslint/explicit-function-return-type, @typescript-eslint/require-await, @typescript-eslint/explicit-module-boundary-types
export async function OPTIONS() {
    return new NextResponse(undefined, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin':
                'https://trocup-front-git-front-77-nicolasr464s-projects.vercel.app',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        },
    })
}

// eslint-disable-next-line jsdoc/require-param
/**
 * POST endpoint for storing and analyzing an image.
 * @returns {Promise<NextResponse>} A response object with the analysis result or an error message.
 */
// eslint-disable-next-line func-style, prefer-arrow-functions/prefer-arrow-functions, @typescript-eslint/require-await
export async function POST(): Promise<NextResponse> {
    console.log('🔥 test')

    return NextResponse.json(
        { data: 'test' },
        {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin':
                    'https://trocup-front-git-front-77-nicolasr464s-projects.vercel.app',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Credentials': 'true',
            },
        },
    )
}
