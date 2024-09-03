import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { users } from '@/mocks/users'

import { wait } from '@/utils/functions'

/**
 * Mock API endpoint to get/test users data.
 * @param {NextRequest} request - The incoming request object containing the page number.
 * @returns {Promise<NextResponse>} The response object containing the user data.
 */
export const GET = async (request: NextRequest): Promise<NextResponse> => {
    console.log('🚀 in GET route')

    const { searchParams } = request.nextUrl

    console.log('SKIP ? ', searchParams.get('skip'))

    // Get 'skip' and 'limit' from search parameters, defaulting to 0 and the length of the array
    const skip = Number.parseInt(searchParams.get('skip') ?? '0', 10)
    const limit = Number.parseInt(
        searchParams.get('limit') ?? users.length.toString(),
        10,
    )

    console.log({ skip })
    console.log({ limit })

    await wait(1_000)

    // Slice the users array based on skip and limit
    const chunkOfUsers = users.slice(skip, skip + limit)

    console.count('count')

    console.log(chunkOfUsers[0])

    return NextResponse.json(chunkOfUsers)
}
