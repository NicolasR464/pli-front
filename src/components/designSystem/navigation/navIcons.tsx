import React from 'react'
import { Home, MessageSquare } from 'react-feather'
import Link from 'next/link'

import { Button } from '@/components/shadcn/ui/button'
import UserProfileMenu from './userProfilMenu'

import { pagePaths } from '@/utils/constants'

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

const NavigationIcons: React.FC = () => {
    return (
        <div className='hidden items-center space-x-4 lg:flex'>
            {/* Icône Accueil */}
            <Link
                href={pagePaths.HOME || '/'}
                aria-label='Accueil'
            >
                <Home
                    className='cursor-pointer text-blueGreen-dark'
                    strokeWidth={1.5}
                />
            </Link>

            <Link
                href={pagePaths.ARTICLES || '/'}
                aria-label='Piscine - Voir tous les articles'
            >
                <svg
                    xmlns='https://www.w3.org/2000/svg'
                    height='24'
                    viewBox='0 0 24 24'
                    width='24'
                    fill='#248c87'
                >
                    <path
                        d='M0 0h24v24H0z'
                        fill='none'
                    />
                    <path d='M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2zm0-4.5c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36s-.78.13-1.15.36c-.47.27-1.09.64-2.2.64v-2c.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36v2zM8.67 12c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.12-.07.26-.15.41-.23L10.48 5C8.93 3.45 7.5 2.99 5 3v2.5c1.82-.01 2.89.39 4 1.5l1 1-3.25 3.25c.31.12.56.27.77.39.37.23.59.36 1.15.36z' />
                    <circle
                        cx='16.5'
                        cy='5.5'
                        r='2.5'
                    />
                </svg>
            </Link>

            {/* Connexion ou profil utilisateur */}
            <SignedOut>
                <SignInButton mode='modal'>
                    <Button className='w-full border border-blueGreen-light-hover bg-transparent text-blueGreen-dark hover:bg-blueGreen-dark hover:text-white'>
                        {'🚀 Connexion'}
                    </Button>
                </SignInButton>
            </SignedOut>

            <SignedIn>
                {/* Sheet pour afficher le profil utilisateur */}
                <UserProfileMenu />
                {/* Icône Messages */}
                <Link
                    href={pagePaths.MESSAGES || '/'}
                    aria-label='Messages'
                >
                    <MessageSquare
                        className='cursor-pointer text-blueGreen-dark'
                        strokeWidth={1.5}
                    />
                </Link>
            </SignedIn>
        </div>
    )
}

export default NavigationIcons
