'use client'

import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { getUserById, updateUser } from '@/utils/apiCalls/user'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/shadcn/ui/form'
import { Input } from '@/components/shadcn/ui/input'
import { Button } from '@/components/shadcn/ui/button'

// Validation avec Zod
const userSchema = z.object({
    pseudo: z.string().nonempty('Le pseudo est obligatoire.'),
    name: z.string().nonempty('Le nom est obligatoire.'),
    surname: z.string().nonempty('Le prénom est obligatoire.'),
    email: z.string().email('Adresse email invalide.'),
    sexe: z.string().optional(),
    phoneNumber: z.string().optional(),
    birthDate: z.string().optional(),
})

type UserFormValues = z.infer<typeof userSchema>

const UserInfo: React.FC = () => {
    const { user: clerkUser } = useUser()
    const { getToken } = useAuth()
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false) // Mode édition ou vue

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            pseudo: '',
            name: '',
            surname: '',
            email: '',
            sexe: '',
            phoneNumber: '',
            birthDate: '',
        },
    })

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
                    form.reset({
                        pseudo: fullUserData.pseudo || '',
                        name: fullUserData.name || '',
                        surname: fullUserData.surname || '',
                        email: fullUserData.email || '',
                        sexe: fullUserData.sexe || '',
                        phoneNumber: fullUserData.phoneNumber || '',
                        birthDate: fullUserData.birthDate
                            ? new Date(fullUserData.birthDate)
                                  .toISOString()
                                  .split('T')[0]
                            : '',
                    })
                }
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des données utilisateur :',
                    error,
                )
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [clerkUser, getToken, form])

    const handleSubmit = async (values: UserFormValues) => {
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

            const updatedUserData = {
                ...fullUserData,
                ...values,
                birthDate: values.birthDate
                    ? new Date(values.birthDate)
                    : fullUserData.birthDate,
            }

            await updateUser(clerkUser.id, updatedUserData, token)
            setIsEditing(false) // Quitter le mode édition
            console.log('Utilisateur mis à jour.')
        } catch (error) {
            console.error(
                'Erreur lors de la mise à jour des informations utilisateur :',
                error,
            )
        }
    }

    if (loading) {
        return <p>Chargement des informations utilisateur...</p>
    }

    return (
        <div>
            {isEditing ? (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className='grid gap-6'
                    >
                        {/* Pseudo - Champ unique */}
                        <div className='col-span-full'>
                            <FormField
                                name='pseudo'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pseudo</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Autres champs en grille 2 colonnes */}
                        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                            <FormField
                                name='name'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name='surname'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prénom</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name='email'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='email'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name='sexe'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sexe</FormLabel>
                                        <FormControl>
                                            <select
                                                className='w-full rounded-md border-gray-300 p-2'
                                                {...field}
                                            >
                                                <option value=''>
                                                    Sélectionnez
                                                </option>
                                                <option value='M'>
                                                    Masculin
                                                </option>
                                                <option value='F'>
                                                    Féminin
                                                </option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name='phoneNumber'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Numéro de téléphone
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name='birthDate'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date de naissance</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='date'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Boutons */}
                        <div className='flex justify-end gap-4'>
                            <Button
                                type='button'
                                onClick={() => setIsEditing(false)}
                                className='bg-gray-200 text-black hover:bg-gray-300'
                            >
                                Annuler
                            </Button>
                            <Button
                                type='submit'
                                className='bg-blueGreen-dark text-white'
                            >
                                Enregistrer
                            </Button>
                        </div>
                    </form>
                </Form>
            ) : (
                <div>
                    {/* Mode vue */}
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <p>
                            <strong>Pseudo :</strong> {form.getValues('pseudo')}
                        </p>
                        <p>
                            <strong>Nom :</strong> {form.getValues('name')}
                        </p>
                        <p>
                            <strong>Prénom :</strong>{' '}
                            {form.getValues('surname')}
                        </p>
                        <p>
                            <strong>Email :</strong> {form.getValues('email')}
                        </p>
                        <p>
                            <strong>Sexe :</strong> {form.getValues('sexe')}
                        </p>
                        <p>
                            <strong>Téléphone :</strong>{' '}
                            {form.getValues('phoneNumber')}
                        </p>
                        <p>
                            <strong>Date de naissance :</strong>{' '}
                            {form.getValues('birthDate')}
                        </p>
                    </div>

                    {/* Bouton Modifier */}
                    <Button
                        type='button'
                        onClick={() => setIsEditing(true)}
                        className='mt-4 bg-blueGreen-dark text-white'
                    >
                        Modifier
                    </Button>
                </div>
            )}
        </div>
    )
}

export default UserInfo
