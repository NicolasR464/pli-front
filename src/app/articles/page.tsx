import { getArticles } from '@/utils/apiCalls/article'

/**
 * Display all articles data.
 * @todo Change the API call to use React query
 */
const Articles = async (): Promise<React.JSX.Element> => {
    const articles = await getArticles()

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1 className='text-emerald-300'>{'Articles'}</h1>

            {articles.length > 0 && <span>{JSON.stringify(articles)}</span>}
        </main>
    )
}

export default Articles
