import React, { useState, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { getUserById, updateUser } from '@/utils/apiCalls/user'

const UserInfo: React.FC = () => {
    const { user: clerkUser } = useUser() // Utilisateur récupéré via Clerk
    const { getToken } = useAuth() // JWT pour l'authentification

    const [isEditing, setIsEditing] = useState(false) // Mode édition
    const [formData, setFormData] = useState({
        pseudo: '',
        name: '',
        surname: '',
        email: '',
        sexe: '',
        phoneNumber: '',
        birthDate: '',
    })
    const [loading, setLoading] = useState(true) // Indicateur de chargement

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
                if (fullUserData) {
                    // Mettre à jour les données du formulaire avec les données existantes
                    setFormData({
                        pseudo: fullUserData.pseudo || '',
                        name: fullUserData.name || '',
                        surname: fullUserData.surname || '',
                        email: fullUserData.email || '',
                        sexe: fullUserData.sexe || '',
                        phoneNumber: fullUserData.phoneNumber || '',
                        birthDate: fullUserData.birthDate
                            ? new Date(fullUserData.birthDate)
                                  .toISOString()
                                  .split('T')[0] // Format YYYY-MM-DD
                            : '',
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
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
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
                ...formData, // Écrase uniquement les champs modifiables
                birthDate: formData.birthDate
                    ? new Date(formData.birthDate)
                    : fullUserData.birthDate, // Conversion
            }

            console.log('Données envoyées :', updatedUserData)

            // Validation locale avant l'envoi
            if (
                !updatedUserData.pseudo ||
                !updatedUserData.email ||
                !updatedUserData.name
            ) {
                console.error(
                    'Données utilisateur incomplètes',
                    updatedUserData,
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
            setFormData({
                pseudo: updatedUser.pseudo,
                name: updatedUser.name,
                surname: updatedUser.surname,
                email: updatedUser.email,
                sexe: updatedUser.sexe,
                phoneNumber: updatedUser.phoneNumber,
                birthDate: updatedUser.birthDate
                    ? new Date(updatedUser.birthDate)
                          .toISOString()
                          .split('T')[0]
                    : '',
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
        return <p>Chargement des informations utilisateur...</p>
    }

    return (
        <div>
            {isEditing ? (
                // Formulaire d'édition
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-4'
                >
                    {/* Pseudo */}
                    <div>
                        <label
                            htmlFor='pseudo'
                            className='block text-sm font-medium text-blueGreen-dark-active '
                        >
                            Pseudo
                        </label>
                        <input
                            type='text'
                            id='pseudo'
                            name='pseudo'
                            value={formData.pseudo}
                            onChange={handleChange}
                            required
                            className='mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blueGreen-dark-active focus:ring-blueGreen-dark-active'
                        />
                    </div>

                    {/* Nom */}
                    <div>
                        <label
                            htmlFor='name'
                            className='block text-sm font-medium text-blueGreen-dark-active '
                        >
                            Nom
                        </label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blueGreen-dark-active  focus:ring-blueGreen-dark-active '
                        />
                    </div>

                    {/* Prénom */}
                    <div>
                        <label
                            htmlFor='surname'
                            className='block text-sm font-medium text-blueGreen-dark-active '
                        >
                            Prénom
                        </label>
                        <input
                            type='text'
                            id='surname'
                            name='surname'
                            value={formData.surname}
                            onChange={handleChange}
                            required
                            className='mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blueGreen-dark-active  focus:ring-blueGreen-dark-active '
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium text-blueGreen-dark-active '
                        >
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blueGreen-dark-active  focus:ring-blueGreen-dark-active '
                        />
                    </div>

                    {/* Sexe */}
                    <div>
                        <label
                            htmlFor='sexe'
                            className='block text-sm font-medium text-blueGreen-dark-active '
                        >
                            Sexe
                        </label>
                        <select
                            id='sexe'
                            name='sexe'
                            value={formData.sexe}
                            onChange={handleChange}
                            className='mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blueGreen-dark-active  focus:ring-blueGreen-dark-active '
                        >
                            <option value=''>Sélectionnez</option>
                            <option value='M'>Masculin</option>
                            <option value='F'>Féminin</option>
                        </select>
                    </div>

                    {/* Téléphone */}
                    <div>
                        <label
                            htmlFor='phoneNumber'
                            className='block text-sm font-medium text-blueGreen-dark-active '
                        >
                            Numéro de téléphone
                        </label>
                        <input
                            type='tel'
                            id='phoneNumber'
                            name='phoneNumber'
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className='mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blueGreen-dark-active  focus:ring-blueGreen-dark-active '
                        />
                    </div>

                    {/* Date de naissance */}
                    <div>
                        <label
                            htmlFor='birthDate'
                            className='block text-sm font-medium text-blueGreen-dark-active '
                        >
                            Date de naissance
                        </label>
                        <input
                            type='date'
                            id='birthDate'
                            name='birthDate'
                            value={formData.birthDate}
                            onChange={handleChange}
                            className='mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blueGreen-dark-active  focus:ring-blueGreen-dark-active '
                        />
                    </div>

                    {/* Boutons */}
                    <div className='flex gap-4'>
                        <button
                            type='submit'
                            className='rounded-md bg-blueGreen-dark-active  px-4 py-2 text-white hover:bg-blue-600'
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
                // Affichage des informations utilisateur
                <div>
                    <p>
                        <strong>Pseudo :</strong>{' '}
                        {formData.pseudo || 'Non défini'}
                    </p>
                    <p>
                        <strong>Nom :</strong> {formData.name || 'Non défini'}
                    </p>
                    <p>
                        <strong>Prénom :</strong>{' '}
                        {formData.surname || 'Non défini'}
                    </p>
                    <p>
                        <strong>Email :</strong>{' '}
                        {formData.email || 'Non défini'}
                    </p>
                    <p>
                        <strong>Sexe :</strong> {formData.sexe || 'Non défini'}
                    </p>
                    <p>
                        <strong>Téléphone :</strong>{' '}
                        {formData.phoneNumber || 'Non défini'}
                    </p>
                    <p>
                        <strong>Date de naissance :</strong>{' '}
                        {formData.birthDate || 'Non défini'}
                    </p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className='mt-4 rounded-md bg-blueGreen-dark-active  px-4 py-2 text-white hover:bg-blue-600'
                    >
                        Modifier
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserInfo
