'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/shadcn/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/shadcn/ui/form'
import { Input } from '@/components/shadcn/ui/input'

import { getUserById, updateUser } from '@/utils/apiCalls/user'

import { useAuth, useUser } from '@clerk/nextjs'

// Schéma de validation avec Zod
const userSchema = z.object({
    pseudo: z.string().min(1, 'Le pseudo est obligatoire.'),
    name: z.string().min(1, 'Le nom est obligatoire.'),
    surname: z.string().min(1, 'Le prénom est obligatoire.'),
    email: z.string().email('Adresse email invalide.'),
    sexe: z.enum(['masculin', 'féminin', 'autre']).optional(),
    phoneNumber: z.string().optional(),
    birthDate: z.string().optional(),
})

type UserFormValues = z.infer<typeof userSchema>

const UserInfo: React.FC = () => {
    const { user: clerkUser } = useUser()
    const { getToken } = useAuth()
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState<string>('')

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            pseudo: '',
            name: '',
            surname: '',
            email: '',
            sexe: undefined,
            phoneNumber: '',
            birthDate: '',
        },
    })

    // Chargement des données utilisateur
    useEffect(() => {
        const fetchUserData = async (): Promise<void> => {
            try {
                if (!clerkUser) return

                const token = await getToken()
                if (!token) throw new Error('JWT introuvable.')

                const fullUserData = await getUserById(clerkUser.id)
                if (fullUserData) {
                    form.reset({
                        pseudo: fullUserData.pseudo,
                        name: fullUserData.name,
                        surname: fullUserData.surname,
                        email: fullUserData.email,
                        sexe: fullUserData.sexe,
                        phoneNumber: fullUserData.phoneNumber,
                        birthDate: new Date(fullUserData.birthDate)
                            .toISOString()
                            .split('T')[0],
                    })
                }
            } catch {
                setError(
                    'Erreur lors de la récupération des données utilisateur.',
                )
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [clerkUser, getToken, form])

    // Soumission du formulaire
    const handleSubmit = async (values: UserFormValues): Promise<void> => {
        try {
            const token = await getToken()
            if (!token) throw new Error('JWT introuvable.')

            if (!clerkUser) throw new Error('Utilisateur introuvable.')

            const fullUserData = await getUserById(clerkUser.id)
            if (!fullUserData)
                throw new Error('Données utilisateur introuvables.')

            const updatedUserData = {
                ...fullUserData,
                ...values,
                birthDate: values.birthDate
                    ? new Date(values.birthDate)
                    : fullUserData.birthDate,
            }

            await updateUser(clerkUser.id, updatedUserData, token)
            setIsEditing(false)
        } catch {
            setError(
                'Erreur lors de la mise à jour des informations utilisateur.',
            )
        }
    }

    if (loading) return <p>{'Chargement des informations utilisateur…'}</p>

    return (
        <div>
            {error.trim() && (
                <div className='mb-4 rounded-lg bg-red-100 p-4 text-red-700'>
                    {error}
                </div>
            )}
            {isEditing ? (
                <Form {...form}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit((values) =>
                                handleSubmit(values).catch(
                                    (error_: unknown) => {
                                        setError(
                                            error_ instanceof Error
                                                ? error_.message
                                                : 'Erreur inattendue.',
                                        )
                                    },
                                ),
                            )()
                        }}
                        className='grid gap-6'
                    >
                        {/* Pseudo - Champ unique */}
                        <div className='col-span-full'>
                            <FormField
                                name='pseudo'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{'Pseudo'}</FormLabel>
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
                            {/* Nom */}
                            <FormField
                                name='name'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{'Nom'}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Prénom */}
                            <FormField
                                name='surname'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{'Prénom'}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Email */}
                            <FormField
                                name='email'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{'Email'}</FormLabel>
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
                            {/* Sexe */}
                            <FormField
                                name='sexe'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{'Sexe'}</FormLabel>
                                        <FormControl>
                                            <select
                                                className='w-full rounded-md border-gray-300 p-2'
                                                {...field}
                                            >
                                                <option value=''>
                                                    {'Sélectionnez'}
                                                </option>
                                                <option value='masculin'>
                                                    {'Masculin'}
                                                </option>
                                                <option value='féminin'>
                                                    {'Féminin'}
                                                </option>
                                                <option value='autre'>
                                                    {'Autre'}
                                                </option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Numéro de téléphone */}
                            <FormField
                                name='phoneNumber'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {'Numéro de téléphone'}
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Date de naissance */}
                            <FormField
                                name='birthDate'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {'Date de naissance'}
                                        </FormLabel>
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
                                onClick={() => {
                                    setIsEditing(false)
                                }}
                                className='bg-gray-200 text-black hover:bg-gray-300'
                            >
                                {'Annuler'}
                            </Button>
                            <Button
                                type='submit'
                                className='bg-blueGreen-dark text-white'
                            >
                                {'Enregistrer'}
                            </Button>
                        </div>
                    </form>
                </Form>
            ) : (
                <div>
                    {/* Mode vue */}
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <p>
                            <strong>{'Pseudo :'}</strong>{' '}
                            {form.getValues('pseudo')}
                        </p>
                        <p>
                            <strong>{'Nom :'}</strong> {form.getValues('name')}
                        </p>
                        <p>
                            <strong>{'Prénom :'}</strong>{' '}
                            {form.getValues('surname')}
                        </p>
                        <p>
                            <strong>{'Email :'}</strong>{' '}
                            {form.getValues('email')}
                        </p>
                        <p>
                            <strong>{'Sexe :'}</strong> {form.getValues('sexe')}
                        </p>
                        <p>
                            <strong>{'Téléphone :'}</strong>{' '}
                            {form.getValues('phoneNumber')}
                        </p>
                        <p>
                            <strong>{'Date de naissance :'}</strong>{' '}
                            {form.getValues('birthDate')}
                        </p>
                    </div>

                    {/* Bouton Modifier */}
                    <Button
                        type='button'
                        onClick={() => {
                            setIsEditing(false)
                        }}
                        className='mt-4 bg-blueGreen-dark text-white'
                    >
                        {'Modifier'}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default UserInfo
