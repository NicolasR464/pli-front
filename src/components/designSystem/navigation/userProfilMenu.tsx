import React from 'react'
import { User } from 'react-feather'

import { Button } from '@/components/shadcn/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from '@/components/shadcn/ui/sheet'

import UserProfileCard from '../userCard'
import { SignOutButton } from '@clerk/nextjs'

const UserProfileMenu: React.FC = () => (
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
            <div className='flex-grow p-4'>
                <UserProfileCard />
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

export default UserProfileMenu
