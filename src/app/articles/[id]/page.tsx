'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { articles as mockArticle } from '@/mocks/articles'
import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent, CardFooter } from '@/components/shadcn/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/shadcn/ui/carousel'

const Article = (): React.JSX.Element => {
    const { id } = useParams()
    const articleId = Array.isArray(id) ? id[0] : id
    if (!articleId) {
        return <p>Sorry, no article found</p>
    }

    const decodedId = decodeURIComponent(articleId)
    const slicedId = decodedId.split('=')[1] || decodedId
    const article = mockArticle.find((article) => article._id.$o_id == slicedId)

    if (!article) {
        return <p>Sorry no article found</p>
    }

    const userArticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        title: 'Lorem ipsum',
        image: 'https://via.placeholder.com/150',
    }))

    const similarArticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        title: 'Similar article',
        image: 'https://via.placeholder.com/150',
    }))

    const [activeTab, setActiveTab] = useState<'user' | 'similar'>('user')

    const articles = activeTab === 'user' ? userArticles : similarArticles

    switch (article.state) {
        case 'New':
            article.state = 'Nouveau'
            break
        case 'Like New':
            article.state = 'Comme Neuf'
            break
        case 'very good condition':
            article.state = 'Très bon état'
            break
        case 'good condition':
            article.state = 'Bon état'
            break
        case 'fair condition':
            article.state = 'Etat correct'
            break
        case 'to repair':
            article.state = 'A réparer'
            break

        default:
            break
    }

    return (
        <div className='flex flex-col items-start justify-between p-8 md:flex-row'>
            {/* Carousel section */}
            <div className='w-full md:w-1/2'>
                <Carousel className='w-full max-w-md'>
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <div className='p-1'>
                                    <Card>
                                        <CardContent className='flex aspect-square items-center justify-center p-6'>
                                            <img
                                                src='https://via.placeholder.com/300'
                                                alt={`Product image ${index + 1}`}
                                                className='h-full w-full object-cover'
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                {/* Description section */}
                <div className='mt-4'>
                    <h2 className='text-2xl font-bold'>Description</h2>
                    <p className='mt-2'>
                        Lorem ipsum dolor sit amet consectetur. Lorem ipsum
                        dolor sit amet consectetur.
                    </p>
                    <ul className='mt-2 list-inside list-disc'>
                        <li>Lorem ipsum</li>
                        <li>Lorem ipsum</li>
                        <li>Lorem ipsum</li>
                    </ul>
                    <p className='mt-2'>
                        Lorem ipsum dolor sit amet consectetur.
                    </p>
                </div>

                {/* Sales condition section */}

                <div className='mt-4'>
                    <h2 className='text-2xl font-bold'>
                        Conditions de ventes{' '}
                    </h2>
                    <p className='mt-2'>
                        Lorem ipsum dolor sit amet consectetur. Lorem ipsum
                        dolor sit amet consectetur. Lorem ipsum dolor sit amet
                        consectetur. Lorem ipsum dolor sit amet consectetur.
                        Lorem ipsum dolor sit amet consectetur. Lorem ipsum
                        dolor sit amet consectetur.
                    </p>
                </div>
            </div>

            {/* Product details and seller info */}
            <div className='mt-8 w-full md:mt-0 md:w-1/2 md:pl-8'>
                <h1 className='mb-4 text-4xl font-bold'>{article.adTitle} </h1>

                {/* Seller information */}
                <div className='mb-4 flex items-center'>
                    <img
                        src='https://via.placeholder.com/50'
                        alt='Avatar'
                        className='h-12 w-12 rounded-full'
                    />
                    <div className='ml-4'>
                        <p className='font-bold'>Pseudo</p>
                        <p>Ville, Région</p>
                    </div>
                </div>

                {/* Product details */}
                <div className='text-gray-700'>
                    <p className='text-m font-bold'>
                        {' '}
                        Statut : {article.status}
                    </p>
                    <p>
                        <strong>Dimensions :</strong>
                        <li> Longueur : {article.dimensions.length} cm </li>
                        <li> Largeur : {article.dimensions.w_idth} cm </li>
                        <li> Hauteur : {article.dimensions.height} cm</li>
                        <li> Poids : {article.dimensions.weight} cm</li>
                    </p>
                    <p>
                        <strong>Année:</strong> {article.manufactureDate.$date}
                    </p>
                    <p>
                        {/* à traduire !!! */}
                        <strong>État :</strong> {article.state}
                    </p>
                    <p>
                        <strong>Marque :</strong> {article.brand}
                    </p>
                </div>

                {/* Action buttons */}
                <div className='mt-6 flex space-x-4'>
                    <Button className='bg-teal-500 text-white'>
                        Je le veux !
                    </Button>
                    <Button className='bg-teal-200 text-teal-700'>
                        Envoyer un message
                    </Button>
                </div>

                {/* Tab section (Besace user / Similaire) */}
                <div className='mt-8'>
                    {/* Tabs for user articles or similar articles */}
                    <div className='mb-6 flex justify-center'>
                        <Button
                            className={`${
                                activeTab === 'user'
                                    ? 'bg-yellow-600 text-white'
                                    : 'bg-gray-200 text-gray-600'
                            } rounded-l-lg px-4 py-2`}
                            onClick={() => setActiveTab('user')}
                        >
                            Besace user
                        </Button>
                        <Button
                            className={`${
                                activeTab === 'similar'
                                    ? 'bg-yellow-600 text-white'
                                    : 'bg-gray-200 text-gray-600'
                            } rounded-r-lg px-4 py-2`}
                            onClick={() => setActiveTab('similar')}
                        >
                            Similaire
                        </Button>
                    </div>

                    {/* Product cards */}
                    <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                        {articles.map((article) => (
                            <Card
                                key={article.id}
                                className='text-center'
                            >
                                <CardContent>
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className='mb-2 h-40 w-full object-cover'
                                    />
                                    <p className='text-sm font-medium'>
                                        {article.title}
                                    </p>
                                </CardContent>
                                <CardFooter className='flex justify-center'>
                                    <button className='text-gray-500'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='h-6 w-6'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                                            />
                                        </svg>
                                    </button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article
