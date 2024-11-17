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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        setSearchTerm(input)

        if (input) {
            console.log(input);
            
            const suggestions: Suggestion[] = Object.entries(
                products.categories,
            ).flatMap(([key, category]) => {
                console.log('catégorie', category.tag);
                
                // Chercher dans les tags des catégories et sous-catégories
                const categoryMatch: Suggestion | null = category.tag
                    .toLowerCase()
                    .includes(input.toLowerCase())
                    ? { name: category.tag, type: 'category' }
                    : null

                const subCategoryMatches: Suggestion[] = Object.entries(
                    category.subcategories,
                )
                    .filter(([_, subTag]) =>
                        subTag.toLowerCase().includes(input.toLowerCase()),
                    )
                    .map(([_, subTag]) => ({
                        name: subTag,
                        type: 'subcategory',
                    }))

                return categoryMatch
                    ? [categoryMatch, ...subCategoryMatches]
                    : subCategoryMatches
            })
            console.log('Filtered suggestions:', suggestions)
            setFilteredSuggestions(suggestions)
        } else {
            setFilteredSuggestions([])
        }
    }

    // Gestion de la sélection d'une suggestion
    const handleSuggestionClick = (suggestion: string) => {
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
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className='cursor-pointer px-4 py-2 hover:bg-gray-100'
                            onClick={() =>
                                handleSuggestionClick(suggestion.name)
                            }
                        >
                            {suggestion.type === 'category' ? (
                                <strong>{suggestion.name}</strong>
                            ) : (
                                suggestion.name
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBar
