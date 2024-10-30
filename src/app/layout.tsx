import { Bell } from 'react-feather'
import { Toaster } from 'react-hot-toast'
import type { Metadata } from 'next'
import {
    Carrois_Gothic_SC,
    Quattrocento_Sans,
    Questrial,
} from 'next/font/google'
import Link from 'next/link'

import { Button } from '@/components/shadcn/ui/button'

import { pagePaths } from '@/utils/constants'
import ReactQueryProvider from '@/utils/providers/ReactQuery'

import './globals.css'
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    SignInButton,
    SignOutButton,
} from '@clerk/nextjs'

// const inter = Inter({ subsets: ['latin'] })

// eslint-disable-next-line new-cap
const carroisGothic = Carrois_Gothic_SC({
    weight: '400',
    subsets: ['latin'],
})

// eslint-disable-next-line new-cap
const quattrocentoSans = Quattrocento_Sans({
    weight: ['400'],
    subsets: ['latin'],
})
// eslint-disable-next-line new-cap
const questrial = Questrial({
    weight: '400',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'TrocUp',
    description: 'Le troc 2.0',
    icons: {
        icon: '/trocup_icon.ico',
    },
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://troc-up.vercel.app',
        siteName: 'TrocUp',
    },
    other: {
        custom: ['utf8'],
    },
}

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>): React.JSX.Element => (
    <ClerkProvider
        signUpFallbackRedirectUrl={pagePaths.ONBOARDING}
        afterSignOutUrl={pagePaths.HOME}
    >
        <html lang='en'>
            <body
                className={`${carroisGothic.className} ${quattrocentoSans.className} ${questrial.className}`}
            >
                <ReactQueryProvider>
                    <header>
                        <SignedOut>
                            <SignInButton
                                forceRedirectUrl={pagePaths.HOME}
                                signUpForceRedirectUrl={pagePaths.ONBOARDING}
                                mode='modal'
                            >
                                <Button>{'🚀 Connexion'}</Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <SignOutButton redirectUrl={pagePaths.HOME}>
                                <Button>{'Déconnexion'}</Button>
                            </SignOutButton>
                        </SignedIn>
                    </header>

                    <main>
                        <Toaster />
                        {children}
                    </main>
                </ReactQueryProvider>
            </body>
        </html>
    </ClerkProvider>
)
export default Layout
