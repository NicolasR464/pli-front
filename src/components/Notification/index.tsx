'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { getParamsAndNotify } from '@/utils/functions'

export const Notification = (): undefined => {
    const searchParams = useSearchParams()

    useEffect(() => {
        const paramsArray = []
        for (const [key, value] of searchParams.entries()) {
            paramsArray.push({ key, value })
        }

        getParamsAndNotify(paramsArray)
    }, [searchParams])

    return undefined
}
