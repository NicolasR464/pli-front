'use client'

import React from 'react'

const ErrorBoundary = ({
    error,
}: {
    readonly error: Error
}): React.JSX.Element => {
    return (
        <div className='flex w-full flex-col items-center justify-center'>
            <h1 className='font-bold text-red-600'>{'Something went wrong'}</h1>

            <p className='font-bold text-red-600'>{error.message}</p>
        </div>
    )
}

export default ErrorBoundary
