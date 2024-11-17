/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { products } from '@/utils/constants/productValues'

type Suggestion = {
    name: string
    type: 'category' | 'subcategory'
}

const SearchBar: React.FC = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filteredSuggestions, setFilteredSuggestions] = useState<
        { name: string; type: 'category' | 'subcategory' }[]
    >([])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const input = e.target.value
        setSearchTerm(input)

        if (input) {
            const suggestions: Suggestion[] = Object.entries(
                products.categories,
            ).flatMap(([_key, category]) => {
                // Chercher dans les tags des catégories et sous-catégories
                const categoryMatch: Suggestion | '' = category.tag
                    .toLowerCase()
                    .includes(input.toLowerCase())
                    ? { name: category.tag, type: 'category' }
                    : ''

                const subCategoryMatches: Suggestion[] = Object.values(
                    category.subcategories,
                )
                    .filter((subTag) =>
                        subTag.toLowerCase().includes(input.toLowerCase()),
                    )
                    .map((subTag) => ({
                        name: subTag,
                        type: 'subcategory',
                    }))

                return categoryMatch
                    ? [categoryMatch, ...subCategoryMatches]
                    : subCategoryMatches
            })
            setFilteredSuggestions(suggestions)
        } else {
            setFilteredSuggestions([])
        }
    }

    // Gestion de la sélection d'une suggestion
    const handleSuggestionClick = (suggestion: string): void => {
        setSearchTerm(suggestion)
        setFilteredSuggestions([])
        router.push(`/articles?query=${encodeURIComponent(suggestion)}`)
    }

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
                    onChange={handleInputChange}
                    className='w-full max-w-xs rounded-lg border border-gray-300 px-2 py-1 md:max-w-md md:px-4 md:py-2'
                    aria-label='Barre de recherche d’articles'
                />
            </form>

            {/* Liste des suggestions */}
            {filteredSuggestions.length > 0 && (
                <ul className='absolute left-0 top-full z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg'>
                    {filteredSuggestions.map((suggestion) => (
                        <li
                            key={suggestion.name}
                            className='cursor-pointer px-4 py-2 hover:bg-gray-100'
                            onClick={() => {
                                handleSuggestionClick(suggestion.name)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSuggestionClick(suggestion.name)
                                }
                            }}
                        >
                            {suggestion.type === 'category' && (
                                <strong>{suggestion.name}</strong>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBar
