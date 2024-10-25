import { Toaster } from 'react-hot-toast'
import type { Metadata } from 'next'
import {
    Carrois_Gothic_SC,
    Quattrocento_Sans,
    Questrial,
} from 'next/font/google'

import Footer from '@/components/designSystem/footer'
import Navbar from '@/components/designSystem/navbar'

import ReactQueryProvider from '@/utils/providers/ReactQuery'

import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

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
}

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>): React.JSX.Element => (
    <ClerkProvider>
        <html lang='en'>
            <body
                className={`${carroisGothic.className} ${quattrocentoSans.className} ${questrial.className}`}
            >
                <ReactQueryProvider>
                    <header>
                        <Navbar />
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
export default Layout
