'use client'

import { useEffect, useState } from 'react'

import { getUsers } from '@/utils/apiCalls/user'

import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'

const Admin = (): React.JSX.Element => {
    const { getToken } = useAuth()
    const [token, setToken] = useState<string | null>()

    // Fetch token on mount
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const fetchToken = async () => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const token = await getToken({ template: 'trocup-1' })
            setToken(token)
        }

        fetchToken()
    }, [getToken])

    // Fetch users data using React Query
    const {
        data: users,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['users', token],
        queryFn: () =>
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
            token ? getUsers(0, token) : Promise.reject('No token'),
        enabled: !!token,
    })

    if (isLoading) return <div>{'Loading users…'}</div>
    if (isError) return <div>{'Error loading users'}</div>

    return (
        <div className='p-4'>
            <h1 className='mb-4 text-2xl font-semibold'>{'Admin Page'}</h1>
            <div className='overflow-x-auto'>
                <table className='min-w-full rounded-lg border border-gray-300 bg-white shadow-md'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='border-b px-4 py-2 text-left font-medium text-gray-600'>
                                {'ID'}
                            </th>
                            <th className='border-b px-4 py-2 text-left font-medium text-gray-600'>
                                {'Name'}
                            </th>
                            <th className='border-b px-4 py-2 text-left font-medium text-gray-600'>
                                {'Email'}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.users.map((user) => (
                            <tr
                                key={user.id}
                                className='hover:bg-gray-50'
                            >
                                <td className='border-b px-4 py-2 text-gray-700'>
                                    {user.id}
                                </td>
                                <td className='border-b px-4 py-2 text-gray-700'>
                                    {user.name || 'N/A'}
                                </td>
                                <td className='border-b px-4 py-2 text-gray-700'>
                                    {user.email || 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin