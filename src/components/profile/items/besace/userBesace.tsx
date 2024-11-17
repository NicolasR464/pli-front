import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import {
    getArticlesByUser,
    updateArticle,
    deleteArticle,
} from '@/utils/apiCalls/article'
import BesaceItem from './besaceItem'
import { Article } from '@/types/article'

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedArticle) return

        try {
            const token = await getToken()
            if (!token) {
                console.error('JWT introuvable.')
                return
            }

            const updatedArticle = await updateArticle(
                selectedArticle.id,
                selectedArticle,
                token,
            )
            setArticles((prev) =>
                prev.map((article) =>
                    article.id === updatedArticle.id ? updatedArticle : article,
                ),
            )
            setSelectedArticle(null)
            setIsEditing(false)
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l’article :', error)
        }
    }

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
            {isEditing && selectedArticle ? (
                <form
                    onSubmit={handleSubmit}
                    className='mt-4 flex flex-col gap-4'
                >
                    <div>
                        <label
                            htmlFor='adTitle'
                            className='block text-sm font-medium'
                        >
                            Titre
                        </label>
                        <input
                            type='text'
                            id='adTitle'
                            name='adTitle'
                            value={selectedArticle.adTitle}
                            onChange={(e) =>
                                setSelectedArticle((prev) => ({
                                    ...prev!,
                                    adTitle: e.target.value,
                                }))
                            }
                            className='mt-1 w-full rounded-md border p-2'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='description'
                            className='block text-sm font-medium'
                        >
                            Description
                        </label>
                        <textarea
                            id='description'
                            name='description'
                            value={selectedArticle.description}
                            onChange={(e) =>
                                setSelectedArticle((prev) => ({
                                    ...prev!,
                                    description: e.target.value,
                                }))
                            }
                            className='mt-1 w-full rounded-md border p-2'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='price'
                            className='block text-sm font-medium'
                        >
                            Prix
                        </label>
                        <input
                            type='number'
                            id='price'
                            name='price'
                            value={selectedArticle.price}
                            onChange={(e) =>
                                setSelectedArticle((prev) => ({
                                    ...prev!,
                                    price: parseFloat(e.target.value),
                                }))
                            }
                            className='mt-1 w-full rounded-md border p-2'
                        />
                    </div>
                    <div className='flex gap-4'>
                        <button
                            type='submit'
                            className='rounded-md bg-blueGreen-dark-active px-4 py-2 text-white hover:bg-blueGreen-dark'
                        >
                            Enregistrer
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                setIsEditing(false)
                                setSelectedArticle(null)
                            }}
                            className='rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400'
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            ) : (
                <div className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
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
                </div>
            )}
        </div>
    )
}

export default UserBesace
