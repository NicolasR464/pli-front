'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import UserProfileCard from '@/components/designSystem/UserCard'

import { getUserById } from '@/utils/apiCalls/user'

type UserData = {
    pseudo: string
    avatarUrl?: string
    lastSignInAt?: Date
}

const UserPage: React.FC = () => {
    const params = useParams()
    const id = Array.isArray(params.id) ? params.id[0] : params.id 

    const [user, setUser] = useState<UserData>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return

        const fetchUser = async (): Promise<void> => {
            try {
                const userData = await getUserById(id)
                setUser({
                    pseudo: userData?.pseudo ?? '',
                    avatarUrl: userData?.avatarUrl ?? '',
                    lastSignInAt:
                        userData?.activityStatus.lastConnected ?? undefined,
                })
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [id])

    if (loading) {
        return <p>{'Chargement des données utilisateur…'}</p>
    }

    if (!user) {
        return <p>{'Utilisateur introuvable.'}</p>
    }

    return (
        <div className='space-y-8'>
            {/* Carte utilisateur */}
            <UserProfileCard
                pseudo={user.pseudo}
                avatarUrl={user.avatarUrl}
                lastSignInAt={user.lastSignInAt}
            />

            {/* Besace utilisateur */}
            <div>
                <h2 className='text-xl font-bold'>{'La Besace'}</h2>
            </div>
        </div>
    )
}

export default UserPage
