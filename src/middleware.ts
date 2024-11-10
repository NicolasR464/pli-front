import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define a matcher for protected routes
const isProtectedRoute = createRouteMatcher(['/onboarding'])

// Create a custom middleware that combines Clerk and CORS
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
const combinedMiddleware = async (req: NextRequest, event: NextFetchEvent) => {
    // Run Clerk middleware first
    const clerkResponse = await clerkMiddleware((auth) => {
        if (isProtectedRoute(req)) auth().protect()
    })(req, event)

    // If Clerk middleware returned a response (e.g., redirect), return it
    if (clerkResponse) return clerkResponse

    // Otherwise, proceed with the request and add CORS headers
    const response = NextResponse.next()

    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', 'https://www.trocup.fr')
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
        // Skip Next.js internals and all static files, unless found in search params
        String.raw`/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)`,
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
