import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import {
    getArticlesByUser,
    updateArticle,
    deleteArticle,
} from '@/utils/apiCalls/article'
import { Article } from '@/types/article'

const UserBesace: React.FC = () => {
    const { user: clerkUser } = useUser()
    const { getToken } = useAuth()
    const [articles, setArticles] = useState<Article[]>([])
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(true)

    // Récupérer les articles de l'utilisateur
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

    // Gère les changements dans les champs du formulaire
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        if (selectedArticle) {
            setSelectedArticle((prev) => ({ ...prev!, [name]: value }))
        }
    }

    // Gère la soumission des modifications d'article
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

    // Supprimer un article
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
                // Formulaire d'édition d'article
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                // Liste des articles
                <div className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {articles.map((article) => (
                        <div
                            key={article.id}
                            className='rounded-lg border p-4 shadow-md'
                        >
                            <img
                                src={article.imageUrls[0]}
                                alt={article.adTitle}
                                className='mb-4 w-full rounded-md'
                            />
                            <h2 className='text-lg font-bold'>
                                {article.adTitle}
                            </h2>
                            <p className='text-sm text-gray-600'>
                                {article.description}
                            </p>
                            <p className='text-lg font-semibold'>
                                {article.price} €
                            </p>
                            <div className='mt-4 flex justify-between'>
                                <button
                                    onClick={() => {
                                        setSelectedArticle(article)
                                        setIsEditing(true)
                                    }}
                                    className='rounded-md bg-blueGreen-dark-active px-4 py-2 text-white hover:bg-blueGreen-dark'
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(article.id)}
                                    className='rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600'
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserBesace
