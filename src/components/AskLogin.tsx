'use client'

import React from 'react'

const AskLogin: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-teal-500 p-6 shadow-lg'>
            <h1 className='mb-4 text-4xl font-bold text-white'>
                {'🔒 Oups, vous n’êtes pas connecté !'}
            </h1>
            <p className='mb-6 text-xl text-white'>
                {'Connectez-vous pour commencer un échange passionnant ! 🌟'}
            </p>
            <div className='mt-6 animate-pulse'>
                <span className='text-xl text-white'>
                    {'Prêt pour l’aventure ? 🚀'}
                </span>
            </div>
        </div>
    )
}

export default AskLogin
