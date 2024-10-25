/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable unicorn/no-null */
/* eslint-disable no-underscore-dangle */
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { ProductCard } from '@/components/designSystem/card'

import { getArticles } from '@/utils/apiCalls/article'

import type { Article } from '@/types/article'

import { useAuth } from '@clerk/nextjs'

const ArticlesPage = (): React.JSX.Element => {
    const searchParams = useSearchParams()
    const query = searchParams.get('query')
    const category = searchParams.get('category')
    const { getToken } = useAuth()
    const [articles, setArticles] = useState<Article[]>([])
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // Effet pour charger les articles au montage du composant
    useEffect(() => {
        // Récupérer tous les articles depuis l'API
        const fetchArticles = async (): Promise<Article[]> => {
            const allArticles: Article[] = await getArticles()
            try {
                setArticles(allArticles)
                setFilteredArticles(allArticles)
                setIsLoading(false)
                return allArticles
            } catch {
                setError('Erreur lors de la récupération des articles.')
                setIsLoading(false)
            }
            return allArticles
        }
        fetchArticles()
    }, [getToken])

    // Effet pour filtrer les articles en fonction du terme de recherche ou de la catégorie
    useEffect(() => {
        if (query) {
            // Filtrer les articles par terme de recherche
            const searchResults = articles.filter((article) =>
                article.adTitle.toLowerCase().includes(query.toLowerCase()),
            )
            setFilteredArticles(searchResults)
        } else if (category) {
            // Filtrer les articles par catégorie
            const categoryResults = articles.filter(
                (article) =>
                    article.category.toLowerCase() === category.toLowerCase(),
            )
            setFilteredArticles(categoryResults)
        } else {
            // Si aucune recherche ou catégorie n'est présente, afficher tous les articles
            setFilteredArticles(articles)
        }
    }, [query, category, articles])

    if (isLoading) {
        return <p>{'Chargement des articles…'}</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className='container mx-auto py-8'>
            <h1 className='mb-6 text-2xl font-bold'>
                {!!query && `Résultats pour "${query}"`}
            </h1>

            {filteredArticles.length > 0 ? (
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {filteredArticles.map((article: Article) => (
                        <ProductCard
                            key={article._id}
                            title={article.adTitle}
                            url={`/articles/${article._id}`}
                            imageUrl={article.imageUrls[0]}
                        />
                    ))}
                </div>
            ) : (
                <p>{'Aucun article ne correspond à la recherche.'}</p>
            )}
        </div>
    )
}

export default ArticlesPage
