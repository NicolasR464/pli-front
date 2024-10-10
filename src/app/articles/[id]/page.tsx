/** Display mock product data. */
'use client'
import { useParams } from 'next/navigation'
import {articles as mockArticle} from '@/mocks/articles'
import { Slice } from 'lucide-react'
// import {getArticlesById} from '@/utils/apiCalls/article/index'

const Article = (): React.JSX.Element => {
    const { id } = useParams()
    console.log('CLG ID 111111111111111111111', id)
    // console.log('axios resp', getArticlesById(id))

    const articleId = Array.isArray(id) ? id[0] : id
    if (!articleId) {
        console.log('No article ID found')
        return <p>Sorry, no article found</p>
    }

    const decodedId = decodeURIComponent(articleId)
    const slicedId = decodedId.split('=')[1] || decodedId
    const article = mockArticle.find((article)=> article._id.$o_id ==slicedId)

    if (!article) {
        console.log('CLG 22222222222222222222222222', slicedId)
        return <p>Sorry no article found</p>
    }
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1>{'Articlesssss'}</h1>
            <p> lol {article.adTitle}</p>
        </main>
    )
}

export default Article
