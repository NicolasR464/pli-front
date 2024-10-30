import React, { useEffect, useState } from 'react'
import { getArticles, getArticleById } from '@/utils/apiCalls/article'
import { getUserInfo } from '@/utils/apiCalls/user'
import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Article } from '@/types/article'
import { sendMessage } from '@/utils/apiCalls/instantMessage'

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
        const fetchData = async () => {
            const token = await getToken()
            if (!token) return

            const articles = await getArticles()
            setAllArticles(articles)

            const articleData = await getArticleById(articleId)
            setInitialArticleTitle(articleData?.adTitle || 'Article')

            const receiverData = await getUserInfo(receiverId, token)
            setReceiverName(receiverData.pseudo || 'Utilisateur')
        }

        fetchData()
    }, [getToken, receiverId, articleId])

    const handleSubmitProposal = async () => {
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
                user?.id || '',
                receiverId,
                proposalMessage,
                new Date(),
                token || '',
            )

            if (typeof window !== 'undefined') {
                router.push(`/messagerie/${roomID}`)
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi du message initial :", error)
            setError("Erreur lors de l'envoi de la proposition")
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-80 rounded-lg bg-white p-6'>
                <h2 className='mb-4 text-lg font-semibold'>
                    Commencer à discuter avec {receiverName}
                </h2>
                <p className='mb-2 text-gray-700'>
                    Je souhaite échanger <strong>{initialArticleTitle}</strong>
                </p>
                <label>En échange de mon article :</label>
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

                {error && <p className='mb-2 text-red-500'>{error}</p>}

                <button
                    onClick={handleSubmitProposal}
                    className='w-full rounded bg-blue-500 py-2 text-white'
                >
                    Envoyer la proposition
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

export default InitialProposalModal
