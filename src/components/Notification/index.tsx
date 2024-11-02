'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { getParamsAndNotify } from '@/utils/functions/toasterHelper'

/**
 * Component to display a toaster notification based on the URL search params
 * Example search param:
 * `?onboarding=SUCCESS`
 */
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
