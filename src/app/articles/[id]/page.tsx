/** Display mock product data. */
'use client'
// import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { articles } from '../../../mocks/articles'

const Article = (): React.JSX.Element => {
    // const SearchParams = useSearchParams()
    const router = useRouter()
    const [article, setArticle] = useState(null)

    useEffect(() => {
        const { id } = router.query
        console.log('id from url', id)

        if (id) {
            const foundArticle = articles.find((article) => article.id.$oid)
            setArticle(foundArticle)
        }
    }, [router.query])
    // const search = SearchParams.get('id')
    // console.log("le search hereeeeee",search)
    // const id = router.useSearchParams(articles.id.$oid);
    // const article = articles.find((article) => article.id.$oid == search)

    if (!article) {
        console.log('koukou', article)
        // console.log('tout', articles);
        return <p>Sorry no article found</p>
    }
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1>{'Articlesssss'}</h1>
        </main>
    )
}

export default Article
