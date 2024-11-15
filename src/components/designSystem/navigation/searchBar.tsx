'use client'
import { Article } from '@/types/article'
import { ArticlesResponse, getArticles } from '@/utils/apiCalls/article'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useState } from 'react'


const SearchBar: React.FC = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState<string>('')

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (searchTerm) {
            router.push(`/articles?query=${searchTerm}`)
        }
    }
    const {
        data: allArticlesResponse,
        error,
        isLoading,
    } = useQuery<ArticlesResponse>({
        queryKey: ['articles'],
        queryFn: getArticles,
    })

    // Accéder directement à `allArticlesResponse.articles` si défini
    const allArticles: Article[] = allArticlesResponse?.articles || []

    console.log('allArticles:', allArticles)

    // Filtrage des articles en fonction du `searchTerm`
    const filteredArticles: Article[] = allArticles.filter(
        (article: Article) =>
            article.adTitle
                ? article.adTitle
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                : false,
    )


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
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full max-w-xs rounded-lg border border-gray-300 px-2 py-1 md:max-w-md md:px-4 md:py-2'
                    aria-label="Barre de recherche d'articles"
                />
            </form>
            {!!searchTerm && (
                <div className='absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg'>
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                            <div
                                key={article.id}
                                className='p-2 hover:bg-gray-200'
                            >
                                <Link href={`/articles/${article.id}`}>
                                    {article.adTitle}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className='p-2'>Aucun article trouvé</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBar
