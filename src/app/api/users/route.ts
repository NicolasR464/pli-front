import { NextResponse } from 'next/server'

import { users } from '@/mocks/users'

/**
 * Mock API endpoint to get users data
 */
export const GET = (): NextResponse => {
    return NextResponse.json({ data: users }, { status: 200 })
}
