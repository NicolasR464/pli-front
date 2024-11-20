import React from 'react'
import { HelpCircle, User } from 'react-feather'
import Link from 'next/link'

import { Button } from '@/components/shadcn/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from '@/components/shadcn/ui/sheet'

import { useUserStore } from '@/stores/user'
import { pagePaths } from '@/utils/constants'

import UserProfileCard from '../userCard'
import { SignOutButton } from '@clerk/nextjs'

const UserProfileMenu: React.FC = () => {
    const { user } = useUserStore((state) => ({
        user: state.user,
    }))
    return (
        <Sheet>
            <SheetTrigger asChild>
                <User
                    className='cursor-pointer text-blueGreen-dark'
                    strokeWidth={1.5}
                />
            </SheetTrigger>
            <SheetContent
                side='right'
                className='w-full sm:max-w-lg'
            >
                <SheetHeader>
                    <h3 className='text-lg font-bold'>{'Mon Profil'}</h3>
                </SheetHeader>
                {/* Zone scrollable */}
                <div className='max-h-[calc(100vh-100px)] flex-grow overflow-y-auto p-4'>
                    <UserProfileCard
                        pseudo={user.pseudo ?? 'Utilisateur'}
                        avatarUrl={user.avatarUrl}
                        lastSignInAt={user.activityStatus?.lastConnected}
                    />
                    <ul>
                        <li>
                            <Link
                                href={pagePaths.MYPROFILE || '/'}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex cursor-pointer items-center gap-3 rounded-lg p-3 text-left text-h6 text-blueGreen-dark-active'
                            >
                                <User className='h-8 w-8' />
                                <span>{'Mes Informations'}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex cursor-pointer items-center gap-3 rounded-lg p-3 text-left text-h6 text-blueGreen-dark-active'
                            >
                                <HelpCircle className='h-8 w-8' />
                                <span>{'Help Center'}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <SheetFooter>
                    <SignOutButton>
                        <Button className='bg-darkBlue text-white hover:bg-blueGreen'>
                            {'Déconnexion'}
                        </Button>
                    </SignOutButton>
                    <SheetClose />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default UserProfileMenu
