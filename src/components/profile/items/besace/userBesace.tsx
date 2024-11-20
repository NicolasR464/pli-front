import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/shadcn/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/shadcn/ui/card'
import BesaceItem from './BesaceItem'

import { deleteArticle, getArticlesByUser } from '@/utils/apiCalls/article'

import type { Article } from '@/types/article'

import { useAuth, useUser } from '@clerk/nextjs'

const UserBesace: React.FC = () => {
    const { user: clerkUser } = useUser()
    const { getToken } = useAuth()
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>('')

    // Récupérer les articles de l'utilisateur
    useEffect(() => {
        const fetchArticles = async (): Promise<void> => {
            if (!clerkUser) return
            try {
                const userArticles = await getArticlesByUser(clerkUser.id)
                setArticles(userArticles)
            } catch {
                setError('Erreur lors de la récupération des articles.')
            } finally {
                setLoading(false)
            }
        }

        fetchArticles()
    }, [clerkUser])

    // Supprimer un article
    const handleDelete = async (articleId: string): Promise<void> => {
        try {
            const token = await getToken()
            if (!token) throw new Error('JWT introuvable.')

            await deleteArticle(articleId, token)
            setArticles((prev) =>
                prev.filter((article) => article.id !== articleId),
            )
        } catch {
            setError('Erreur lors de la suppression de l’article.')
        }
    }

    if (loading) {
        return <p>{'Chargement des articles…'}</p>
    }

    return (
        <div>
            {/* Message d'erreur */}
            {error.trim() && (
                <div className='mb-4 rounded-lg bg-red-100 p-4 text-red-700'>
                    {error}
                </div>
            )}

            <h1 className='text-xl font-semibold'>{'Ma Besace'}</h1>
            <div className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {/* Liste des articles */}
                {articles.map((article: Article) => (
                    <BesaceItem
                        key={article.id}
                        article={article}
                        onDelete={() => {
                            handleDelete(article.id ?? '')
                        }}
                    />
                ))}

                {/* Carte vide pour l'ajout */}
                <Card className='border-2 border-dashed border-gray-300'>
                    <CardHeader>
                        <CardTitle className='flex justify-center'>
                            {'Ajouter un article'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex items-center justify-center'>
                        <Link href='/article/new'>
                            <Button
                                variant='outline'
                                size='icon'
                            >
                                {'+'}
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default UserBesace
