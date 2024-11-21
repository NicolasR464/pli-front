import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'TrocUp',
    description: 'Le troc 2.0',
    icons: {
        icon: '/trocup_icon.ico',
    },
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://trocup.fr',
        siteName: 'TrocUp',
    },
    other: {
        custom: ['utf8'],
    },
}

export default metadata
