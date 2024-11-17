import React from 'react'

import { Button } from '@/components/shadcn/ui/button'
import type { TransactionRequestProps } from '@/components/userActions/TransactionRequest'
import TransactionRequest from '@/components/userActions/TransactionRequest'

const ProductActions: React.FC<TransactionRequestProps> = ({
    userB,
    articleB,
}) => (
    <div className='mb-6 mt-6 flex justify-center space-x-4'>
        {/* Transaction 1-to-M request */}
        <TransactionRequest
            userB={userB}
            articleB={articleB}
        />

        <Button
            className='transform rounded-lg bg-gradient-to-r from-teal-200 to-teal-300 px-6 py-2 text-teal-700 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:from-teal-300 hover:to-teal-400 hover:text-white'
            aria-label='Envoyer un message au vendeur'
        >
            {'Envoyer un message 💬'}
        </Button>
    </div>
)

export default ProductActions
