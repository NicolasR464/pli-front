/* eslint-disable unicorn/prefer-string-raw */
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define a matcher for protected routes
const isProtectedRoute = createRouteMatcher(['/onboarding'])
const isProtectedAdminRoute = createRouteMatcher(['/admin'])
const adminUserIds = new Set(
    (process.env.NEXT_PUBLIC_ADMIN_USER_IDS ?? '').split(','),
)
export default clerkMiddleware((auth, req) => {
    // General protection for onboarding route
    if (isProtectedRoute(req)) {
        auth().protect()
    }
    // Protection with admin user check for admin route
    if (isProtectedAdminRoute(req)) {
        const { userId } = auth()
        // Ensure the user is authenticated and is in the list of admin IDs
        if (!userId || !adminUserIds.has(userId)) {
            return new Response('Forbidden', { status: 403 })
        }
    }

    return new Response('Admin', { status: 200 })
})
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
        '/admin',
    ],
}
