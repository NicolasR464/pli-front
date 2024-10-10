import React from 'react'
import Link from 'next/link'
import { getRoutes } from '@/utils/functions/getRoutes'

export default function Footer() {
    // ajouter un filtre pour ne pas récupérer les inside pages User et Produits
    //remplacer les valeurs par celles du design système
    
    const routes = getRoutes()
    return (
        <footer className='bg-teal-50 py-8'>
            <div className='container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4'>
                {routes.map((route, index) => (
                    <div key={index}>
                        <h3 className='mb-4 text-lg font-bold'>
                            Section {index + 1}
                        </h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link href={route}>
                                    <a className='text-gray-600 hover:underline'>
                                        {route}
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </footer>
    )
}
