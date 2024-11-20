import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import {
    getArticlesByUser,
    updateArticle,
    deleteArticle,
} from '@/utils/apiCalls/article'
import BesaceItem from './BesaceItem'
import { Article } from '@/types/article'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/shadcn/ui/card'
import { Button } from '@/components/shadcn/ui/button'
import Link from 'next/link'

const UserBesace: React.FC = () => {
    const { user: clerkUser } = useUser()
    const { getToken } = useAuth()
    const [articles, setArticles] = useState<Article[]>([])
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchArticles = async () => {
            if (!clerkUser) return
            try {
                const userArticles = await getArticlesByUser(clerkUser.id)
                setArticles(userArticles)
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des articles :',
                    error,
                )
            } finally {
                setLoading(false)
            }
        }

        fetchArticles()
    }, [clerkUser])

    const handleDelete = async (articleId: string) => {
        try {
            const token = await getToken()
            if (!token) {
                console.error('JWT introuvable.')
                return
            }

            await deleteArticle(articleId, token)
            setArticles((prev) =>
                prev.filter((article) => article.id !== articleId),
            )
        } catch (error) {
            console.error('Erreur lors de la suppression de l’article :', error)
        }
    }

    if (loading) {
        return <p>Chargement des articles...</p>
    }

    return (
        <div>
            <h1 className='text-xl font-semibold'>Ma Besace</h1>
            <div className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {/* Liste des articles */}
                {articles.map((article) => (
                    <BesaceItem
                        key={article.id}
                        article={article}
                        onEdit={() => {
                            setSelectedArticle(article)
                            setIsEditing(true)
                        }}
                        onDelete={() => handleDelete(article.id)}
                    />
                ))}

                {/* Carte vide pour l'ajout */}
                <Card className='border-2 border-dashed border-gray-300'>
                    <CardHeader>
                        <CardTitle className='flex justify-center'>
                            Ajouter un article
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex items-center justify-center'>
                        <Link href='/article/new'>
                            <Button
                                variant='outline'
                                size='icon'
                            >
                                +
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default UserBesace
