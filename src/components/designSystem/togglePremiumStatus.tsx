import React from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { updateUser } from '@/utils/apiCalls/user'
import { useUserStore } from '@/stores/user'

const TogglePremiumButton: React.FC = () => {
    const { user: clerkUser } = useUser()
    const { getToken } = useAuth()

    // Récupère et met à jour le store utilisateur
    const { user, setUserData } = useUserStore((state) => ({
        user: state.user,
        setUserData: state.setUserData,
    }))

    const handleUpgradeToPremium = async () => {
        if (!clerkUser || !user) {
            console.error('Utilisateur introuvable.')
            return
        }

        try {
            console.log('togglePremiumStatus called with userId:', clerkUser.id)
            const token = (await getToken()) ?? ''
            if (!token) {
                console.error('JWT introuvable.')
                return
            }

            // Prépare les données utilisateur pour passer à Premium
            const updatedUserData = {
                ...user,
                isPremium: true, // Forcer le statut premium à true
            }

            console.log('Données envoyées à l’API :', updatedUserData)

            // Met à jour les données côté backend
            const updatedUser = await updateUser(
                clerkUser.id,
                updatedUserData,
                token,
            )

            console.log('Réponse de l’API :', updatedUser)

            // Met à jour le store utilisateur localement
            setUserData({
                ...user,
                isPremium: true,
            })
            console.log(
                'Statut premium mis à jour dans le store :',
                updatedUser.isPremium,
            )
        } catch (error) {
            console.error(
                'Erreur lors de la mise à jour du statut premium :',
                error,
            )
        }
    }

    return user?.isPremium ? (
        <p className='mt-4 text-lg font-semibold text-yellow-dark'>
            Compte Premium
        </p>
    ) : (
        <button
            onClick={handleUpgradeToPremium}
            className='mt-4 rounded-md bg-yellow-dark px-4 py-2 text-white hover:bg-yellow-dark-hover'
        >
            Obtenir Premium
        </button>
    )
}

export default TogglePremiumButton
