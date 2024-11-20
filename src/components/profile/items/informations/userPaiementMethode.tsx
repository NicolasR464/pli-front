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

// Schéma de validation avec Zod
const bankInfoSchema = z.object({
    iban: z.string().nonempty('L’IBAN est obligatoire.'),
    bic: z.string().nonempty('Le BIC est obligatoire.'),
})

type BankInfoFormValues = z.infer<typeof bankInfoSchema>

const PaymentMethods: React.FC = () => {
    const { user: clerkUser } = useUser()
    const { getToken } = useAuth()
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false) // Mode édition

    const form = useForm<BankInfoFormValues>({
        resolver: zodResolver(bankInfoSchema),
        defaultValues: {
            iban: '',
            bic: '',
        },
    })

    // Charger les informations bancaires
    useEffect(() => {
        const fetchBankInfo = async () => {
            try {
                if (!clerkUser) return
                const token = await getToken()
                if (!token) {
                    console.error('JWT non trouvé')
                    return
                }

                const fullUserData = await getUserById(clerkUser.id)
                if (fullUserData && fullUserData.bankInfo) {
                    form.reset({
                        iban: fullUserData.bankInfo.iban || '',
                        bic: fullUserData.bankInfo.bic || '',
                    })
                }
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des données bancaires :',
                    error,
                )
            } finally {
                setLoading(false)
            }
        }

        fetchBankInfo()
    }, [clerkUser, getToken, form])

    // Soumettre le formulaire
    const handleSubmit = async (values: BankInfoFormValues) => {
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
                bankInfo: {
                    ...values,
                },
            }

            await updateUser(clerkUser.id, updatedUserData, token)
            setIsEditing(false) // Quitter le mode édition
            console.log('Informations bancaires mises à jour.')
        } catch (error) {
            console.error(
                'Erreur lors de la mise à jour des informations bancaires :',
                error,
            )
        }
    }

    if (loading) {
        return <p>Chargement des informations bancaires...</p>
    }

    return (
        <div>
            {isEditing ? (
                // Mode édition
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className='space-y-4'
                    >
                        {/* IBAN */}
                        <FormField
                            name='iban'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>IBAN</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* BIC */}
                        <FormField
                            name='bic'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>BIC</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                // Mode vue
                <div className='space-y-4'>
                    <p>
                        <strong>IBAN :</strong>{' '}
                        {form.getValues('iban') || 'Non défini'}
                    </p>
                    <p>
                        <strong>BIC :</strong>{' '}
                        {form.getValues('bic') || 'Non défini'}
                    </p>

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

export default PaymentMethods
