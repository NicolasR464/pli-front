import { Toaster } from 'react-hot-toast'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
import Navbar from '@/components/designSystem/navbar'
import Footer from '@/components/designSystem/footer'
import { ProductCard, ProductCardLargeTitle, ProductCardSmallText, ProductCardWithBorder } from '@/components/designSystem/productCard'

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
                        <Navbar />
                        {/* <SignedOut>
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
                        </SignedIn> */}
                    </header>
                    <main>
                        <Toaster />
                        {children}
                    </main>
                    <ProductCardSmallText />
                    <ProductCardLargeTitle />
                    <ProductCardWithBorder />
                    <ProductCard title={'Lorem Ipsum'} />
                    <Footer />
                </ReactQueryProvider>
            </body>
        </html>
    </ClerkProvider>
)
export default Layout
