import Image from 'next/image'

import { useUser } from '@clerk/nextjs'

const UserProfileCard: React.FC = () => {
    const { user } = useUser()

    if (!user) {
        return <p>{'Chargement des informations utilisateur…'}</p>
    }

    // Formatage de la date de dernière connexion
    const lastLoginDate = user.lastSignInAt
        ? new Date(user.lastSignInAt).toLocaleDateString('fr-FR', {
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
                    src={user.imageUrl}
                    alt='User avatar'
                    width={100}
                    height={100}
                    className='rounded-full'
                />
            </div>

            {/* Nom utilisateur */}
            <h2 className='font-heading text-lg font-bold text-neutrals-blacks-normal'>
                {user.fullName ?? 'Utilisateur'}
            </h2>

            {/* Dernière connexion */}
            <p className='text-neutrals-grey-dark'>
                {'Dernière connexion : '}
                {lastLoginDate}
            </p>

            {/* Bouton premium */}
            <button className='mt-4 rounded-md bg-yellow px-4 py-2 text-white hover:bg-yellow-hover'>
                {'Get Premium'}
            </button>
        </div>
    )
}

export default UserProfileCard
