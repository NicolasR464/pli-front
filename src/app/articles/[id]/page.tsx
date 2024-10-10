/** Display mock product data. */
'use client'
import { useParams } from 'next/navigation'
import { articles as mockArticle } from '@/mocks/articles'
import { Card } from '@/components/shadcn/ui/card'
// import {getArticlesById} from '@/utils/apiCalls/article/index'
import { Carousel } from '@/components/shadcn/ui/carousel'
import { Button } from '@/components/shadcn/ui/button'

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
    const article = mockArticle.find((article) => article._id.$o_id == slicedId)

    if (!article) {
        console.log('CLG 22222222222222222222222222', slicedId)
        return <p>Sorry no article found</p>
    }
    return (
        // <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        //     <h1>{'Articlesssss'}</h1>
        //     <p> lol {article.adTitle}</p>
        // </main>
        //     <Card>
        //         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeHiRQE9rO-JT7P78IquwIicyWodmun07mMQ&s" alt="Italian Trulli"/>
        //         <div className="p-4">
        //     <p>{article.adTitle}</p>
        //     <p>{article.description}</p>
        //   </div>
        // </Card>
        <Card>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2'>
                    <Carousel>
                        <img
                            src='https://m.media-amazon.com/images/I/71hIfcIPyxS._AC_UF1000,1000_QL80_.jpg'
                            width={200}
                            height={200}
                        />
                    </Carousel>
                </div>
                <div className='w-full p-4 md:w-1/2'>
                    <h1 className='text-3xl font-bold'>{article.adTitle}</h1>
                    <div className='flex items-center'>
                        <div className='h-10 w-10 rounded-full bg-gray-300'></div>
                    </div>
                    <ul>
                        <li>Dimension: {article.description}</li>
                        <li>Année: {article.manufactureDate.$date}</li>
                        <li>Etat: {article.state}</li>
                        <li>Marque: {article.brand}</li>
                    </ul>
                    <div className='flex space-x-4'>
                        <Button className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'>
                            Je veux ce produit
                        </Button>
                        <Button className='rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400'>
                            Envoyer un message
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Article
