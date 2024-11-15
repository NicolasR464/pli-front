import React from 'react'
import { Home, MessageSquare, PlusCircle, User } from 'react-feather'
import Link from 'next/link'

import UserProfileMenu from './userProfilMenu'

import { pagePaths } from '@/utils/constants'

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

const MobileNavigationBar: React.FC = () => {
    return (
        <div className='fixed bottom-0 left-0 right-0 flex justify-around border-t border-gray-200 bg-white py-2 lg:hidden'>
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

            {/* Icône Favoris */}
            <Link
                href={pagePaths.ARTICLES || '/'}
                aria-label='Piscine - VOIR LES ARTICLES'
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

            {/* Icône Créer un article */}
            <Link
                href={pagePaths.ARTICLE_CREATION || '/'}
                aria-label='Créer un article'
            >
                <PlusCircle
                    className='cursor-pointer text-blueGreen-dark'
                    strokeWidth={1.5}
                />
            </Link>

            {/* Gestion des utilisateurs */}
            <SignedOut>
                <SignInButton>
                    <User
                        className='cursor-pointer text-blueGreen-dark'
                        strokeWidth={1.5}
                    />
                </SignInButton>
            </SignedOut>
            <SignedIn>
                {/* Sheet pour afficher le profil utilisateur */}
                <UserProfileMenu />
            </SignedIn>

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
        </div>
    )
}

export default MobileNavigationBar
