// src/app/layout.tsx
'use client' // Composant client

import { Toaster } from 'react-hot-toast'
import { usePathname } from 'next/navigation'
import { ClerkProvider } from '@clerk/nextjs'
import { Carrois_Gothic_SC, Quattrocento_Sans, Questrial } from 'next/font/google'

import Footer from '@/components/designSystem/footer'
import Navbar from '@/components/designSystem/navigation/navbar'
import ReactQueryProvider from '@/utils/providers/ReactQuery'
import UserStoreProvider from '@/utils/providers/UserStoreProvider'
import { pagePaths } from '@/utils/constants'

import './globals.css'

const carroisGothic = Carrois_Gothic_SC({
    weight: '400',
    subsets: ['latin'],
})

const quattrocentoSans = Quattrocento_Sans({
    weight: ['400'],
    subsets: ['latin'],
})

const questrial = Questrial({
    weight: '400',
    subsets: ['latin'],
})

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>): React.JSX.Element => {
    const pathname = usePathname()

    return (
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
                            {/* N'affiche pas Navbar si sur '/aide' */}
                            {pathname !== '/aide' && <Navbar />}
                        </header>
                        <div className='flex min-h-screen flex-col'>
                            <main className='flex-grow'>
                                <UserStoreProvider />
                                <Toaster />
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </ReactQueryProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}

export default Layout
