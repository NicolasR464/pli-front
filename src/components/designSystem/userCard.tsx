import React from 'react'
import Image from 'next/image'

type UserProfileCardProps = {
    pseudo: string
    avatarUrl?: string
    lastSignInAt?: Date | null
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
    pseudo,
    avatarUrl,
    lastSignInAt,
}) => {
    // Formatage de la date de dernière connexion
    const lastLoginDate = lastSignInAt
        ? new Date(lastSignInAt).toLocaleDateString('fr-FR', {
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
                    src={avatarUrl ?? '/default-avatar.png'}
                    alt='User avatar'
                    width={100}
                    height={100}
                    className='rounded-full'
                />
            </div>

            {/* Nom utilisateur */}
            <h2 className='text-neutrals-blacks-normal font-heading text-lg font-bold'>
                {pseudo}
            </h2>

            {/* Dernière connexion */}
            <p className='text-neutrals-grey-dark'>
                {'Dernière connexion : '}
                {lastLoginDate}
            </p>
        </div>
    )
}

export default UserProfileCard
