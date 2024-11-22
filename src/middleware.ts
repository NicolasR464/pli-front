/* eslint-disable unicorn/prefer-string-raw */
import {
    clerkClient,
    clerkMiddleware,
    createRouteMatcher,
} from '@clerk/nextjs/server'

// Define a matcher for protected routes
const isProtectedRoute = createRouteMatcher([
    '/onboarding',
    '/transaction/recap',
])

// eslint-disable-next-line @typescript-eslint/consistent-return
export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) auth().protect()

    if (req.url.includes('/admin')) {
        const userID = auth().userId

        // Check if userID is not null before proceeding
        if (userID) {
            try {
                // Await the promise to get the actual user object
                const user = await clerkClient().users.getUser(userID)
                if (user.privateMetadata.role !== 'admin') {
                    return Response.redirect(new URL('/', req.url))
                }
            } catch {
                throw new Error('user id is unvalid')
            }
        }
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
