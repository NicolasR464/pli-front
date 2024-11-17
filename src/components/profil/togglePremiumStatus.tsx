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

    const handleTogglePremium = async () => {
        if (!clerkUser || !user) {
            console.error('Utilisateur introuvable.')
            return
        }

        try {
            console.log('togglePremiumStatus called with userId:', clerkUser.id)
            const token = (await getToken()) ?? ''
            console.log(token)

            if (!token) {
                console.error('JWT introuvable.')
                return
            }

            // Prépare les nouvelles données utilisateur
            const newIsPremium = user.isPremium === true ? false : true
            const updatedUserData = {
                ...user,
                isPremium: newIsPremium, // Force explicitement true ou false
            }

            console.log("Données envoyées à l'API :", updatedUserData)

            // Met à jour les données côté backend
            const updatedUser = await updateUser(
                clerkUser.id,
                updatedUserData,
                token,
            )

            console.log("Réponse de l'API :", updatedUser)

            // Vérifiez si la réponse reflète correctement le changement
            if (updatedUser.isPremium !== newIsPremium) {
                console.error(
                    "Le backend n'a pas mis à jour correctement le statut premium.",
                )
            }

            // Met à jour le store utilisateur localement
            setUserData({
                ...user,
                isPremium: newIsPremium,
            })
            console.log(
                'Statut premium mis à jour dans le store :',
                updatedUser.isPremium,
            )
        } catch (error) {
            console.error(
                'Erreur lors de la mise à jour du statut premium :',
            )
        }
    }

    return (
        <button
            onClick={handleTogglePremium}
            className={`mt-4 rounded-md px-4 py-2 text-white ${
                user?.isPremium
                    ? 'text-yellow-dark'
                    : 'bg-yellow-dark hover:bg-yellow-dark-hover'
            }`}
        >
            {user?.isPremium ? 'Compte Premium' : 'Obtenir Premium'}
        </button>
    )
}

export default TogglePremiumButton
