import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/onboarding'])

// eslint-disable-next-line unicorn/prefer-set-has
const allowedOrigins = ['https://www.trocup.fr', 'https://trocup.fr']

const combinedMiddleware = async (
    req: NextRequest,
    event: NextFetchEvent,
): Promise<NextResponse | undefined> => {
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        const response = new NextResponse(undefined, { status: 200 })
        response.headers.set('Access-Control-Allow-Origin', '*')
        response.headers.set(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS',
        )
        response.headers.set(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization',
        )
        response.headers.set('Access-Control-Max-Age', '86400')
        return response
    }

    // Run Clerk middleware
    const clerkResponse = await clerkMiddleware((auth) => {
        if (isProtectedRoute(req)) auth().protect()
    })(req, event)

    if (clerkResponse) return NextResponse.rewrite(clerkResponse.url)

    const origin = req.headers.get('origin')
    const response = NextResponse.next()

    // Set CORS headers
    if (origin && allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin)
    }
    response.headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
    )
    response.headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
    )
    response.headers.set('Access-Control-Allow-Credentials', 'true')

    return response
}

export default combinedMiddleware

export const config = {
    matcher: [
        String.raw`/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)`,
        '/(api|trpc)(.*)',
    ],
}
