import React, { useEffect, useState } from 'react'
import { getArticles } from '@/utils/apiCalls/article' // Appel API pour récupérer tous les articles
import { useAuth, useUser } from '@clerk/nextjs'
import { Article } from '@/types/article'

type ProposeExchangeModalProps = {
    receiverId: string
    onClose: () => void
    onPropose: (myArticle: string, theirArticle: string) => void
}

const ProposeExchangeModal: React.FC<ProposeExchangeModalProps> = ({
    receiverId,
    onClose,
    onPropose,
}) => {
    const [allArticles, setAllArticles] = useState<Article[]>([])
    const [selectedMyArticle, setSelectedMyArticle] = useState<string | null>(
        null,
    )
    const [selectedTheirArticle, setSelectedTheirArticle] = useState<
        string | null
    >(null)
    const [error, setError] = useState<string | null>(null)

    const { getToken } = useAuth()

    useEffect(() => {
        const fetchArticles = async () => {
            const token = await getToken()
            if (!token) return

            // Récupérer tous les articles sans filtre
            const allArticlesData = await getArticles()
            setAllArticles(allArticlesData)
        }

        fetchArticles()
    }, [getToken])

    const handlePropose = () => {
        if (selectedMyArticle && selectedTheirArticle) {
            onPropose(selectedMyArticle, selectedTheirArticle)
            setError(null) // Réinitialise l'erreur si tout est bon
            onClose()
        } else {
            setError('Veuillez sélectionner un article dans chaque liste')
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-80 rounded-lg bg-white p-6'>
                <h2 className='mb-4 text-lg font-semibold'>
                    Proposer un échange
                </h2>
                <label>Je propose</label>
                <select
                    value={selectedMyArticle || ''}
                    onChange={(e) => setSelectedMyArticle(e.target.value)}
                    className='mb-4 mt-2 block w-full rounded border border-gray-300 p-2'
                >
                    <option
                        value=''
                        disabled
                    >
                        Sélectionner un de mes articles
                    </option>
                    {allArticles.map((article) => (
                        <option
                            key={article._id}
                            value={article.adTitle}
                        >
                            {article.adTitle}
                        </option>
                    ))}
                </select>

                <label>En échange de ton</label>
                <select
                    value={selectedTheirArticle || ''}
                    onChange={(e) => setSelectedTheirArticle(e.target.value)}
                    className='mb-4 mt-2 block w-full rounded border border-gray-300 p-2'
                >
                    <option
                        value=''
                        disabled
                    >
                        Sélectionner un article
                    </option>
                    {allArticles.map((article) => (
                        <option
                            key={article._id}
                            value={article.adTitle}
                        >
                            {article.adTitle}
                        </option>
                    ))}
                </select>

                {error && <p className='mb-2 text-red-500'>{error}</p>}

                <button
                    onClick={handlePropose}
                    className='w-full rounded bg-blue-500 py-2 text-white'
                >
                    Faire ma proposition
                </button>
                <button
                    onClick={onClose}
                    className='mt-2 w-full text-center text-gray-500'
                >
                    Annuler
                </button>
            </div>
        </div>
    )
}

export default ProposeExchangeModal
