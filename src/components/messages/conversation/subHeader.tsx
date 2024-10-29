import React, { useEffect, useState } from 'react'
import { getArticles } from '@/utils/apiCalls/article'
import { useAuth } from '@clerk/nextjs'

type SubHeaderProps = {
    roomId: string
    userId: string
}

const SubHeader: React.FC<SubHeaderProps> = ({ roomId, userId }) => {
    const [articles, setArticles] = useState<{ id: string; title: string }[]>(
        [],
    )
    const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
    const { getToken } = useAuth()

    useEffect(() => {
        const fetchArticles = async () => {
            const token = (await getToken()) || ''
            const fetchedArticles = await getArticles(token)

            // Filtrer les articles par userId
            const userArticles = fetchedArticles.filter(
                (article) => article.owner === userId,
            )
            setArticles(userArticles)
        }

        fetchArticles()
    }, [getToken, userId])

    return (
        <div className='border-t border-gray-300 p-4'>
            <label
                className='text-sm text-gray-600'
                htmlFor='articleSelect'
            >
                Associer un article :
            </label>
            <select
                id='articleSelect'
                value={selectedArticle || ''}
                onChange={(e) => handleArticleSelect(e.target.value)}
                className='mt-2 w-full rounded border p-2 text-sm text-gray-700'
            >
                <option value=''>-- Choisir un article --</option>
                {articles.map((article) => (
                    <option
                        key={article.id}
                        value={article.id}
                    >
                        {article.title}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SubHeader
