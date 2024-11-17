import React, { useState } from 'react'

import { useUserStore } from '@/stores/user'
import { updateUser } from '@/utils/apiCalls/user'

import { useAuth, useUser } from '@clerk/nextjs'

const TogglePremiumButton: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('')
    const { user: clerkUser } = useUser()
    const { getToken } = useAuth()

    // Récupère et met à jour le store utilisateur
    const { user, setUserData } = useUserStore((state) => ({
        user: state.user,
        setUserData: state.setUserData,
    }))

    const handleUpgradeToPremium = async (): Promise<void> => {
        try {
            const token = (await getToken()) ?? ''

            // Prépare les données utilisateur pour passer à Premium
            const updatedUserData = {
                ...user,
                isPremium: true,
            }

            await updateUser(clerkUser?.id ?? '', updatedUserData, token)

            // Met à jour le store utilisateur localement
            setUserData({
                ...user,
                isPremium: true,
            })
        } catch {
            setErrorMessage(
                `Erreur lors de la mise à jour du statut premium. Veuillez réesseyer`,
            )
        }
    }
    return (
        <div>
            {/* Affichage du message d'erreur */}
            {!!errorMessage && (
                <p className='mt-2 text-sm text-red-500'>{errorMessage}</p>
            )}

            {/* Contenu du bouton */}
            {user.isPremium ? (
                <p className='mt-4 text-lg font-semibold text-yellow-dark'>
                    {'Compte Premium'}
                </p>
            ) : (
                <button
                    type='button'
                    onClick={() => {
                        void handleUpgradeToPremium()
                    }}
                    className='mt-4 rounded-md bg-yellow-dark px-4 py-2 text-white hover:bg-yellow-dark-hover'
                >
                    {'Obtenir Premium'}
                </button>
            )}
        </div>
    )
}

export default TogglePremiumButton
