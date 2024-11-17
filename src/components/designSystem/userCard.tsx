import React from 'react'
import Image from 'next/image'

import TogglePremiumButton from './togglePremiumStatus'

import { useUserStore } from '@/stores/user'

import { useUser } from '@clerk/nextjs'

const UserProfileCard: React.FC = () => {
    const { user: clerkUser } = useUser()
    const { user } = useUserStore((state) => ({
        user: state.user,
    }))

    // Formatage de la date de dernière connexion
    const lastLoginDate = clerkUser?.lastSignInAt
        ? new Date(clerkUser.lastSignInAt).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
          })
        : 'Date non disponible'

    return (
        <div className='mx-auto max-w-lg rounded-lg bg-grey-light-active p-8 text-center'>
            {/* Avatar utilisateur */}
            <div className='mb-4 flex justify-center'>
                <Image
                    src={user.avatarUrl ?? '/default-avatar.png'}
                    alt='User avatar'
                    width={100}
                    height={100}
                    className='rounded-full'
                />
            </div>

            {/* Nom utilisateur */}
            <h2 className='text-neutrals-blacks-normal font-heading text-lg font-bold'>
                {user.pseudo ?? 'Utilisateur'}
            </h2>

            {/* Dernière connexion */}
            <p className='text-neutrals-grey-dark'>
                {'Dernière connexion : '}
                {lastLoginDate}
            </p>

            {/* Bouton premium */}
            <div className='bottom-0 flex justify-center align-middle'>
                <TogglePremiumButton />
            </div>
        </div>
    )
}

export default UserProfileCard
