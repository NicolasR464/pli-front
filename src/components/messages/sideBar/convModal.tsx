// NewConversationModal.tsx
import React, { useEffect, useState } from 'react'
import { getUserInfo } from '@/utils/apiCalls/user'
import { getArticles } from '@/utils/apiCalls/article' // Fonction pour récupérer les articles de l'utilisateur
import { sendMessage } from '@/utils/apiCalls/instantMessage'
import { useAuth, useUser } from '@clerk/nextjs'

type NewConversationModalProps = {
    isOpen: boolean
    onClose: () => void
    onRoomSelect: (roomId: string) => void
}

const NewConversationModal: React.FC<NewConversationModalProps> = ({
    isOpen,
    onClose,
    onRoomSelect,
}) => {
    const [articles, setArticles] = useState([])
    const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
    const [ownerInfo, setOwnerInfo] = useState<{
        avatar: string
        username: string
        id: string
    } | null>(null)
    const { getToken } = useAuth()
    const { user } = useUser()

    useEffect(() => {
        const fetchArticles = async () => {
            const token = (await getToken()) || ''
            const fetchedArticles = await getArticles(token)

            // Filtrer les articles par userId
            const userArticles = fetchedArticles.filter(
                (article) => article.owner === ownerInfo?.id,
            )
            setArticles(userArticles)
        }

        fetchArticles()

        if (isOpen) fetchArticles()
    }, [isOpen, getToken, user])

    const handleArticleSelect = async (articleId: string) => {
        setSelectedArticle(articleId)
        const token = await getToken()
        const article = articles.find((art) => art._id === articleId)

        // Récupérer l'info de l'owner de l'article
        const ownerData = await getUserInfo(article.ownerId, token)
        setOwnerInfo({
            avatar: ownerData.avatarUrl || '',
            username: ownerData.pseudo,
            id: ownerData._id,
        })
    }

    const handleStartChat = async () => {
        if (!selectedArticle || !ownerInfo) return

        const token = await getToken()
        const initialMessage = 'Bonjour ! Commençons notre conversation.'

        // Créer une nouvelle room avec l'ID de l'article
        await sendMessage(
            selectedArticle,
            user?.id || '',
            ownerInfo.id,
            initialMessage,
            new Date(),
            token || '',
        )

        onRoomSelect(selectedArticle) // Sélectionner la nouvelle room
        onClose() // Fermer la modale
    }

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50'>
            <div className='w-1/2 rounded-lg bg-white p-6'>
                <h3 className='mb-4 text-lg font-semibold'>
                    Nouvelle Conversation
                </h3>
                <select
                    value={selectedArticle || ''}
                    onChange={(e) => handleArticleSelect(e.target.value)}
                    className='w-full rounded border border-gray-300 p-2'
                >
                    <option
                        value=''
                        disabled
                    >
                        Choisissez un article
                    </option>
                    {articles.map((article) => (
                        <option
                            key={article._id}
                            value={article._id}
                        >
                            {article.title}
                        </option>
                    ))}
                </select>

                {ownerInfo && (
                    <div className='mt-4'>
                        <p>Vous allez discuter avec :</p>
                        <div className='mt-2 flex items-center space-x-4'>
                            <img
                                src={ownerInfo.avatar}
                                alt='Owner Avatar'
                                className='h-10 w-10 rounded-full'
                            />
                            <span>{ownerInfo.username}</span>
                        </div>
                    </div>
                )}

                <div className='mt-6 flex justify-end space-x-4'>
                    <button
                        onClick={onClose}
                        className='rounded bg-gray-300 p-2'
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleStartChat}
                        disabled={!selectedArticle || !ownerInfo}
                        className='rounded bg-blue-500 p-2 text-white disabled:opacity-50'
                    >
                        Commencer à chatter
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewConversationModal
