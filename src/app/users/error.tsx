'use client'

import React from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/shadcn/ui/button'

interface ErrorProps {
    error: Error & { digest?: string }
}

const ErrorBoundary: React.FC<ErrorProps> = ({ error }) => {
    const queryClient = useQueryClient()
    return (
        <div className='flex w-full flex-col items-center justify-center'>
            <h1 className='font-bold text-red-600'>Something went wrong</h1>

            <p className='font-bold text-red-600'>{error.message}</p>
        </div>
    )
}

export default ErrorBoundary
