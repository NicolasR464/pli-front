/* eslint-disable no-console */
'use client'

import { useEffect } from 'react'

import { useAuth } from '@clerk/nextjs'

const ShowTokenComponent: React.FC = () => {
    const { getToken } = useAuth()

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const fetchAuthToken = async () => {
            const token = await getToken()
            if (token) {
                console.log('Votre token Clerk est :', token)
            } else {
                console.error('Impossible de récupérer le token')
            }
        }

        fetchAuthToken()
    }, [])

    return (
        <div>
            <h1>{'Token Display Page'}</h1>
            <p>{'Ouvrez la console pour voir le token.'}</p>
        </div>
    )
}

export default ShowTokenComponent
