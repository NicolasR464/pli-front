import React from 'react'
import Link from 'next/link'

// Request param needed for transaction with their types :
type ConfirmationButtonProps = {
    queryParams: { [key: string]: string | undefined }
    isDisabled: boolean
}

const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({
    queryParams,
    isDisabled,
}) => {
    const handleKeyUp = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            ;(event.target as HTMLAnchorElement).click()
        }
    }
    return (
        <div className='flex justify-center'>
            <Link
                href={{
                    pathname: '/transaction/final',
                    query: queryParams,
                }}
                aria-label='Confirmer et envoyer la proposition de transaction'
                className={`transform justify-end rounded-xl bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 p-6 px-8 py-4 font-bold text-white shadow-lg shadow-xl transition-all hover:scale-105 hover:bg-yellow-600 ${
                    isDisabled ? 'cursor-not-allowed opacity-50' : ''
                }`}
                onKeyUp={handleKeyUp}
                tabIndex={0}
            >
                {'Envoyer la proposition 🚀'}
            </Link>
        </div>
    )
}

export default ConfirmationButton
