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
        <body className={inter.className}>
            <ReactQueryProvider>
                <h1>TrocUp header</h1>
                {children}
            </ReactQueryProvider>
        </body>
    </html>
)
export default Layout
