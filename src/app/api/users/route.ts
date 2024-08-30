import { NextResponse } from 'next/server'

import { users } from '@/mocks/users'

import { wait } from '@/utils/functions/general'

/**
 * Mock API endpoint to get users data
 */
export const GET = async ({ params }): Promise<NextResponse> => {
    console.log('in GET route')
    console.info({ params })

    await wait(5_000)

    return NextResponse.json({ data: users }, { status: 200 })
}
