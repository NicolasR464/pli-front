'use client'

import { useEffect } from 'react'

import { useUsersStore } from '@/stores/users'

/** Display all users data */
const Users = (): JSX.Element => {
    const { getUsersData, users } = useUsersStore()

    useEffect(() => {
        getUsersData().catch(() => {
            /* Empty */
        })
    }, [getUsersData])

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <span>{JSON.stringify(users)}</span>
        </main>
    )
}

export default Users
