'use client' // Ajoute cette ligne pour indiquer que ce fichier est un composant client

import { Toaster } from 'react-hot-toast'
import { Metadata } from 'next'
import {
    Carrois_Gothic_SC,
    Quattrocento_Sans,
    Questrial,
} from 'next/font/google'
import { usePathname } from 'next/navigation'

// Ajoute ce hook pour obtenir le pathname actuel
import Footer from '@/components/designSystem/footer'
import Navbar from '@/components/designSystem/navigation/navbar'

import { pagePaths } from '@/utils/constants'
import ReactQueryProvider from '@/utils/providers/ReactQuery'
import UserStoreProvider from '@/utils/providers/UserStoreProvider'

import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

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

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>): React.JSX.Element => {
    const pathname = usePathname() // Récupère le chemin actuel

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
                            {/* N'affiche pas Navbar si sur '/aide'*/}
                            {pathname !== '/aide' && <Navbar />}
                        </header>
                        <main className='flex-grow'>
                            <Toaster />
                            {children}
                        </main>
                        <Footer />
                    </ReactQueryProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
export default Layout
