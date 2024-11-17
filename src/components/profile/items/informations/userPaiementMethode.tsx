import React, { useState, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { getUserById, updateUser } from '@/utils/apiCalls/user'

const PaymentMethods: React.FC = () => {
    const { user: clerkUser } = useUser() // Utilisateur récupéré via Clerk
    const { getToken } = useAuth() // JWT pour l'authentification

    const [isEditing, setIsEditing] = useState(false) // Mode édition
    const [formData, setFormData] = useState({
        iban: '',
        bic: '',
    })
    const [loading, setLoading] = useState(true) // Indicateur de chargement
    const [bankInfo, setBankInfo] = useState<{
        iban: string
        bic: string
    } | null>(null) // Stocke les données actuelles

    // Récupérer les données utilisateur au chargement
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!clerkUser) return
                const token = await getToken()
                if (!token) {
                    console.error('JWT non trouvé')
                    return
                }

                const fullUserData = await getUserById(clerkUser.id)
                if (fullUserData && fullUserData.bankInfo) {
                    // Pré-remplit les données bancaires
                    setBankInfo({
                        iban: fullUserData.bankInfo.iban || 'Non défini',
                        bic: fullUserData.bankInfo.bic || 'Non défini',
                    })
                    setFormData({
                        iban: fullUserData.bankInfo.iban || '',
                        bic: fullUserData.bankInfo.bic || '',
                    })
                }
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des données utilisateur :',
                    error,
                )
            } finally {
                setLoading(false) // Arrêter l'indicateur de chargement
            }
        }

        fetchUserData()
    }, [clerkUser, getToken])

    // Gère les changements dans les champs du formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Gère la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const token = await getToken()
            if (!token) {
                console.error('JWT non trouvé')
                return
            }

            if (!clerkUser) {
                console.error('Utilisateur introuvable.')
                return
            }

            const fullUserData = await getUserById(clerkUser.id)
            if (!fullUserData) {
                console.error(
                    'Impossible de récupérer les données utilisateur.',
                )
                return
            }

            // Prépare les données à mettre à jour
            const updatedUserData = {
                ...fullUserData, // Inclut toutes les informations actuelles
                bankInfo: {
                    ...formData, // Écrase uniquement les informations bancaires
                },
            }

            console.log('Données envoyées :', updatedUserData)

            // Validation locale avant l'envoi
            if (
                !updatedUserData.bankInfo.iban ||
                !updatedUserData.bankInfo.bic
            ) {
                console.error(
                    'Données bancaires incomplètes',
                    updatedUserData.bankInfo,
                )
                return
            }

            // Met à jour les données utilisateur via l'API
            const updatedUser = await updateUser(
                clerkUser.id,
                updatedUserData,
                token,
            )

            console.log('Utilisateur mis à jour :', updatedUser)

            // Mettre à jour les données locales avec les nouvelles données
            setBankInfo({
                iban: updatedUser.bankInfo?.iban || 'Non défini',
                bic: updatedUser.bankInfo?.bic || 'Non défini',
            })
            setFormData({
                iban: updatedUser.bankInfo?.iban || '',
                bic: updatedUser.bankInfo?.bic || '',
            })
            setIsEditing(false) // Quitter le mode édition
        } catch (error) {
            if (error.response) {
                console.error('Erreur du serveur :', error.response.data)
            } else {
                console.error(
                    'Erreur lors de la mise à jour des informations utilisateur :',
                    error,
                )
            }
        }
    }

    if (loading) {
        return <p>Chargement des informations bancaires...</p>
    }

    return (
        <div>
            {isEditing ? (
                // Formulaire d'édition
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-4'
                >
                    {/* IBAN */}
                    <div>
                        <label
                            htmlFor='iban'
                            className='block text-sm font-medium text-gray-700'
                        >
                            IBAN
                        </label>
                        <input
                            type='text'
                            id='iban'
                            name='iban'
                            value={formData.iban}
                            onChange={handleChange}
                            required
                            className='mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blueGreen-dark-active focus:ring-blueGreen-dark-active'
                        />
                    </div>

                    {/* BIC */}
                    <div>
                        <label
                            htmlFor='bic'
                            className='block text-sm font-medium text-gray-700'
                        >
                            BIC
                        </label>
                        <input
                            type='text'
                            id='bic'
                            name='bic'
                            value={formData.bic}
                            onChange={handleChange}
                            required
                            className='mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blueGreen-dark-active focus:ring-blueGreen-dark-active'
                        />
                    </div>

                    {/* Boutons */}
                    <div className='flex gap-4'>
                        <button
                            type='submit'
                            className='rounded-md bg-blueGreen-dark-active px-4 py-2 text-white hover:bg-blueGreen-dark'
                        >
                            Enregistrer
                        </button>
                        <button
                            type='button'
                            onClick={() => setIsEditing(false)}
                            className='rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400'
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            ) : (
                // Affichage des informations bancaires
                <div>
                    <p>
                        <strong>IBAN :</strong> {bankInfo?.iban || 'Non défini'}
                    </p>
                    <p>
                        <strong>BIC :</strong> {bankInfo?.bic || 'Non défini'}
                    </p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className='mt-4 rounded-md bg-blueGreen-dark-active px-4 py-2 text-white hover:bg-blueGreen-dark'
                    >
                        Modifier
                    </button>
                </div>
            )}
        </div>
    )
}

export default PaymentMethods
