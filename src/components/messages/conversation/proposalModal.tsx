import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useTransactionStore } from '@/stores/transaction'
import { getArticlesByUser } from '@/utils/apiCalls/article'
import { getUserById } from '@/utils/apiCalls/user'
import { pagePaths } from '@/utils/constants'

import type { Article } from '@/types/article'
import type { User } from '@/types/user'

import { useAuth, useUser } from '@clerk/nextjs'

type ProposeExchangeModalProps = {
    receiverInfo?: User
    onClose: () => void
}

const ProposeExchangeModal: React.FC<ProposeExchangeModalProps> = ({
    receiverInfo,
    onClose,
}) => {
    const [theirArticles, setTheirArticles] = useState<Article[]>([])
    const [myArticles, setMyArticles] = useState<Article[]>([])
    const [selectedMyArticleId, setSelectedMyArticleId] = useState<string>('')
    const [selectedTheirArticleId, setSelectedTheirArticleId] =
        useState<string>('')
    const [error, setError] = useState<string>('')
    const { getToken } = useAuth()
    const { user } = useUser()
    const router = useRouter()
    const setTransactionData = useTransactionStore((state) => ({
        setArticleA: state.setArticleA,
        setArticleB: state.setArticleB,
        setUserB: state.setUserB,
    }))
    useEffect(() => {
        const fetchArticles = async (): Promise<void> => {
            try {
                const token = await getToken()
                if (!token || !user?.id) {
                    setError(
                        'Impossible de récupérer les articles : utilisateur non connecté.',
                    )
                    return
                }
                const currentUser = await getUserById(user.id)

                const [theirArticlesData, myArticlesData] = await Promise.all([
                    getArticlesByUser(receiverInfo?.id ?? ''),
                    getArticlesByUser(currentUser?.id ?? ''),
                ])

                setTheirArticles(theirArticlesData)
                setMyArticles(myArticlesData)
            } catch {
                setError('Erreur lors de la récupération des articles.')
            }
        }

        fetchArticles()
    }, [getToken, user, receiverInfo?.id])

    const handleProposeExchange = (): void => {
        if (!selectedMyArticleId || !selectedTheirArticleId) {
            setError('Veuillez sélectionner un article dans chaque liste.')
            return
        }

        const selectedMyArticle = myArticles.find(
            (article) => article.id === selectedMyArticleId,
        )
        const selectedTheirArticle = theirArticles.find(
            (article) => article.id === selectedTheirArticleId,
        )

        if (!selectedMyArticle || !selectedTheirArticle) {
            setError('Erreur lors de la sélection des articles.')
            return
        }

        // Mettre à jour le store transaction
        setTransactionData.setArticleA({
            id: selectedMyArticle.id,
            adTitle: selectedMyArticle.adTitle,
            address: undefined,
            imageUrl: selectedMyArticle.imageUrls[0],
            deliveryType: 'PICKUP',
        })
        setTransactionData.setArticleB({
            id: selectedTheirArticle.id,
            adTitle: selectedTheirArticle.adTitle,
            address: undefined,
            imageUrl: selectedTheirArticle.imageUrls[0],
            deliveryType: 'PICKUP',
        })
        setTransactionData.setUserB({
            id: receiverInfo?.id ?? '',
            email: receiverInfo?.email ?? '',
        })

        // Redirection vers la page de transaction
        router.push(`${pagePaths.USERS}/${pagePaths.TRANSACTION}/recap`)
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-80 rounded-lg bg-white p-6'>
                <h2 className='mb-4 text-lg font-semibold'>
                    {'Proposer un échange'}
                </h2>

                {/* Select their article */}
                <label>{'En échange de leur article'}</label>
                <select
                    value={selectedTheirArticleId}
                    onChange={(e) => {
                        setSelectedTheirArticleId(e.target.value)
                    }}
                    className='mb-4 mt-2 block w-full rounded border border-gray-300 p-2'
                >
                    <option
                        value=''
                        disabled
                    >
                        {'Sélectionner un article'}
                    </option>
                    {theirArticles.map((article) => (
                        <option
                            key={article.id}
                            value={article.id}
                        >
                            {article.adTitle}
                        </option>
                    ))}
                </select>

                {/* Select your article */}
                <label>{'Je propose mon article'}</label>
                <select
                    value={selectedMyArticleId}
                    onChange={(e) => {
                        setSelectedMyArticleId(e.target.value)
                    }}
                    className='mb-4 mt-2 block w-full rounded border border-gray-300 p-2'
                >
                    <option
                        value=''
                        disabled
                    >
                        {'Sélectionner un de mes articles'}
                    </option>
                    {myArticles.map((article) => (
                        <option
                            key={article.id}
                            value={article.id}
                        >
                            {article.adTitle}
                        </option>
                    ))}
                </select>

                {/* Error message */}
                {!!error && <p className='mb-2 text-red-500'>{error}</p>}

                {/* Propose exchange button */}
                <button
                    onClick={handleProposeExchange}
                    className='w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600'
                >
                    {'Proposer l’échange'}
                </button>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className='mt-2 w-full text-center text-gray-500'
                >
                    {'Annuler'}
                </button>
            </div>
        </div>
    )
}

export default ProposeExchangeModal
