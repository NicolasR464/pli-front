'use client'
import React from 'react'

import ArticleCard from './articleCard'

import type { Article } from '@/types/article'

type ArticleListProps = {
    readonly articles: Article[]
    readonly selectedArticleId: string | undefined
    readonly onSelectArticle: (articleId: string) => void
}

const ArticleList = ({
    articles,
    selectedArticleId,
    onSelectArticle,
}: ArticleListProps): React.JSX.Element => {
    return (
        <div className='mb-6 w-full max-w-lg bg-gray-100 p-4'>
            <div className='items-center-justify flex flex-wrap space-x-4'>
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <ArticleCard
                            key={article.id || `article-${index}`}
                            article={article}
                            isSelected={selectedArticleId === article.id}
                            onSelect={() => {
                                if (article.id) onSelectArticle(article.id)
                            }}
                        />
                    ))
                ) : (
                    <p>{'Aucun article disponible'}</p>
                )}
            </div>
        </div>
    )
}

export default ArticleList
