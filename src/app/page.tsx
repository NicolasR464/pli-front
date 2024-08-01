'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { enableMocks } from '@/mocks'

const Home = (): JSX.Element => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        enableMocks()
            .then(() => {
                fetchData()
            })
            .catch((error) => {
                console.error('Failed to enable mocks:', error)
            })
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch('https://example.com/user')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const user = await response.json()
            setData(user)
        } catch (error) {
            setError(error)
            console.error('Failed to fetch data:', error)
        }
    }

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1>{process.env.NODE_ENV}</h1>
            <Button>{'button'}</Button>
            {error ? (
                <p>
                    {'Error: '}
                    {error.message}
                </p>
            ) : null}
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : null}
        </main>
    )
}

export default Home
