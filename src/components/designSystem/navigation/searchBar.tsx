'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const SearchBar: React.FC = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState<string>('')

    const handleSearchSubmit = (
        event: React.FormEvent<HTMLFormElement>,
    ): void => {
        event.preventDefault()
        if (searchTerm) {
            router.push(`/articles?query=${encodeURIComponent(searchTerm)}`)
        }
    }

    return (
        <div className='mx-auto max-w-md flex-grow'>
            <form
                onSubmit={handleSearchSubmit}
                className='flex justify-center'
            >
                <input
                    type='text'
                    placeholder='Rechercher un article…'
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                    }}
                    className='w-full max-w-xs rounded-lg border border-gray-300 px-2 py-1 md:max-w-md md:px-4 md:py-2'
                    aria-label='Barre de recherche d’articles'
                />
            </form>
        </div>
    )
}

export default SearchBar
