import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import ReactQueryProvider from '@/utils/providers/ReactQuery'

import './globals.css'

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
    <html lang='en'>
        <head>
        {/* Lien vers les polices Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Carrois+Gothic+SC&family=Century+Gothic:wght@400&family=Quattrocento+Sans:wght@400&display=swap" rel="stylesheet" />
        </head>
        <body className={inter.className}>
            <ReactQueryProvider>
                <h1 className="font-display text-heading-1">{'TrocUp header'}</h1>
                {children}
            </ReactQueryProvider>
        </body>
    </html>
)
export default Layout
