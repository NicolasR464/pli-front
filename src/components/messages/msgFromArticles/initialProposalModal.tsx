/* eslint-disable no-underscore-dangle */
/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/require-array-sort-compare */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { getArticleById, getArticles } from '@/utils/apiCalls/article'
import { sendMessage } from '@/utils/apiCalls/instantMessage'
import { getUserById } from '@/utils/apiCalls/user'

import type { Article } from '@/types/article'

import { useAuth, useUser } from '@clerk/nextjs'

type InitialProposalModalProps = {
    receiverId: string
    articleId: string
    onClose: () => void
}

const InitialProposalModal: React.FC<InitialProposalModalProps> = ({
    receiverId,
    articleId,
    onClose,
}) => {
    const [allArticles, setAllArticles] = useState<Article[]>([])
    const [selectedMyArticle, setSelectedMyArticle] = useState<string | null>(
        null,
    )
    const [initialArticleTitle, setInitialArticleTitle] = useState<
        string | null
    >(null)
    const [receiverName, setReceiverName] = useState<string>('Utilisateur')
    const [error, setError] = useState<string | null>(null)

    const { getToken } = useAuth()
    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const token = await getToken()
            if (!token) return

            const articles = await getArticles()
            setAllArticles(articles)

            const articleData = await getArticleById(articleId)
            setInitialArticleTitle(articleData.adTitle)

            const receiverData = await getUserById(receiverId)
            setReceiverName(receiverData?.pseudo ?? '')
        }

        fetchData()
    }, [getToken, receiverId, articleId])

    const handleSubmitProposal = async (): Promise<void> => {
        const token = await getToken()
        if (!selectedMyArticle) {
            setError('Veuillez sélectionner un de vos articles')
            return
        }
        const proposalMessage = `Je souhaite échanger "${initialArticleTitle}" avec toi en échange de mon article "${selectedMyArticle}".`

        const userIds = [user?.id, receiverId].sort()
        const roomID = `${userIds[0]}_${userIds[1]}`

        try {
            await sendMessage(
                roomID,
                user?.id ?? '',
                receiverId,
                proposalMessage,
                new Date(),
                token ?? '',
            )

            if (typeof window !== 'undefined') {
                router.push(`/messagerie/${roomID}`)
            }
        } catch {
            setError('Erreur lors de l’envoi de la proposition')
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-80 rounded-lg bg-white p-6'>
                <h2 className='mb-4 text-lg font-semibold'>
                    {'Commencer à discuter avec '}
                    {receiverName}
                </h2>
                <p className='mb-2 text-gray-700'>
                    {'Je souhaite échanger '}
                    <strong>{initialArticleTitle}</strong>
                </p>
                <label>{'En échange de mon article :'}</label>
                <select
                    value={selectedMyArticle ?? ''}
                    onChange={(e) => {
                        setSelectedMyArticle(e.target.value)
                    }}
                    className='mb-4 mt-2 block w-full rounded border border-gray-300 p-2'
                >
                    <option
                        value=''
                        disabled
                    >
                        {'Sélectionner un de mes articles'}
                    </option>
                    {allArticles.map((article) => (
                        <option
                            key={article.id}
                            value={article.adTitle}
                        >
                            {article.adTitle}
                        </option>
                    ))}
                </select>

                {!!error && <p className='mb-2 text-red-500'>{error}</p>}

                <button
                    onClick={() => {
                        handleSubmitProposal()
                    }}
                    className='w-full rounded bg-blue-500 py-2 text-white'
                >
                    {'Envoyer la proposition'}
                </button>
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

export default InitialProposalModal
