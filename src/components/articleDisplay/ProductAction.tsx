import React from 'react'
import { Button } from '@/components/shadcn/ui/button'

const ProductActions: React.FC = () => (
    <div className='mb-6 mt-6 flex justify-center space-x-4'>
        <Button
            className='rounded-lg bg-gradient-to-r from-teal-400 to-teal-600 px-6 py-2 text-white shadow-md transition duration-300 ease-in-out hover:from-teal-500 hover:to-teal-700'
            aria-label='Je veux acheter cet article'
        >
            {'Je le veux ! ❤️'}
        </Button>
        <Button
            className='transform rounded-lg bg-gradient-to-r from-teal-200 to-teal-300 px-6 py-2 text-teal-700 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:from-teal-300 hover:to-teal-400 hover:text-white'
            aria-label='Envoyer un message au vendeur'
        >
            {'Envoyer un message 💬'}
        </Button>
    </div>
)

export default ProductActions
