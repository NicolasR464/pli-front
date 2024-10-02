import type { Metadata } from 'next'
import {
    Carrois_Gothic_SC,
    Quattrocento_Sans,
    Questrial,
} from 'next/font/google'

import ReactQueryProvider from '@/utils/providers/ReactQuery'

import './globals.css'

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
    <html lang='en'>
        <head />
        <body
            className={`${carroisGothic.className} ${quattrocentoSans.className} ${questrial.className}`}
        >
            <ReactQueryProvider>
                <h1 className='text-heading-1·font-display'>
                    {'TrocUp header'}
                </h1>
                {children}
            </ReactQueryProvider>
        </body>
    </html>
)
export default Layout
