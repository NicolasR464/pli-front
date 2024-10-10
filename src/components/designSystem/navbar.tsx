'use client'

import { Button } from '@/components/shadcn/ui/button'

import { pagePaths } from '@/utils/constants'

import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs'
import { Bell, ShoppingCart } from 'react-feather' 

export default function Navbar() {
    return (
        <nav className='border-b border-gray-200 bg-white shadow-sm'>
            <div className='container mx-auto flex items-center justify-between py-4'>
                {/* "Déposer une annonce" Button */}
                <button className='rounded-md bg-teal-500 px-4 py-2 text-white hover:bg-teal-600'>
                    Déposer une annonce
                </button>

                {/* Search bar */}
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Rechercher'
                        className='w-64 rounded-full border border-gray-300 px-4 py-2'
                    />
                </div>

                {/* User authentication and icons */}
                <div className='flex space-x-6 text-teal-700'>
                    {/* Signed Out State */}
                    <SignedOut>
                        <SignInButton
                            forceRedirectUrl={pagePaths.HOME}
                            signUpForceRedirectUrl={pagePaths.ONBOARDING}
                            mode='modal'
                        >
                            <Button>{'🚀 Connexion'}</Button>
                        </SignInButton>
                    </SignedOut>

                    {/* Signed In State */}
                    <SignedIn>
                        {/* User, Notification, and Cart icons */}
                        <Bell
                            className='cursor-pointer'
                        />
                        <ShoppingCart
                            className='cursor-pointer'
                        />

                        {/* Sign Out Button */}
                        <SignOutButton redirectUrl={pagePaths.HOME}>
                            <Button>{'Déconnexion'}</Button>
                        </SignOutButton>
                    </SignedIn>
                </div>
            </div>

            {/* Secondary Menu */}
            <div className='bg-teal-100 py-2'>
                <div className='container mx-auto flex justify-between text-teal-700'>
                    <a
                        href='#'
                        className='hover:underline'
                    >
                        Lorem ipsum
                    </a>
                    <a
                        href='#'
                        className='hover:underline'
                    >
                        Lorem ipsum
                    </a>
                    <a
                        href='#'
                        className='hover:underline'
                    >
                        Lorem ipsum
                    </a>
                    <a
                        href='#'
                        className='hover:underline'
                    >
                        Lorem ipsum
                    </a>
                    <a
                        href='#'
                        className='hover:underline'
                    >
                        Lorem ipsum
                    </a>
                </div>
            </div>
        </nav>
    )
}

