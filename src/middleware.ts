/* eslint-disable unicorn/prefer-string-raw */
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define a matcher for protected routes
const isProtectedRoute = createRouteMatcher(['/onboarding'])
const isProtectedAdminRoute = createRouteMatcher(['/admin'])
const adminUserIds = ['user_2nZYiUeq2fax63x4hiRoQNA7Xyb', 'user_2', 'user_3'] // Replace these with actual user IDs


export default clerkMiddleware((auth, req) => {
    // General protection for onboarding route
    if (isProtectedRoute(req)) {
        auth().protect()
    }

    // Protection with admin user check for admin route
    if (isProtectedAdminRoute(req)) {
        const { userId } = auth()  // Retrieve userId from auth

        // Ensure the user is authenticated and is in the list of admin IDs
        if (!userId || !adminUserIds.includes(userId)) {
            return new Response('Forbidden', { status: 403 })
        }
    }
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
