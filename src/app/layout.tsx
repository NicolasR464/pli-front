import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import ReactQueryProvider from '@/utils/providers/ReactQuery'

import './globals.css'
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from '@clerk/nextjs'

// eslint-disable-next-line new-cap
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'TrocUp',
    description: 'Le troc 2.0',
}

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>): React.JSX.Element => (
    <ClerkProvider>
        <html lang='en'>
            <body className={inter.className}>
            <ReactQueryProvider>
                <header>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </header>

                <main> {children}</main>
            </ReactQueryProvider>
            </body>
        </html>
    </ClerkProvider>
)
export default Layout
