'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
// import { articles as mockArticle } from '@/mocks/articles'
import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent, CardFooter } from '@/components/shadcn/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/shadcn/ui/carousel'
import { getArticlesById } from '@/utils/apiCalls/article'
import { getUserById } from '@/utils/apiCalls/user'
import type { Article } from '@/types/article'
import type { User } from '@/types/user'

const Article = (): React.JSX.Element => {
    // récupérer l'id dans l'url et le variabiliser:
    const { id } = useParams()
    const articleId = Array.isArray(id) ? id[0] : id

    // Préparer les hooks pour gérer l'intégration des données de l'article, les loader et les erreurs
    const [article, setArticle] = useState<Article | null>(null)
    const [user, setUser] = useState<User | null>(null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // hook pour les 2 onglets Produits user / besace
    const [activeTab, setActiveTab] = useState<'user' | 'similar'>('user')

    const jwtToken = process.env.NEXT_PUBLIC_JWT_TOKEN

    // fetch article
    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                if (articleId) {
                    const decodedId = decodeURIComponent(articleId)
                    const fetchedArticle = await getArticlesById(decodedId)
                    setArticle(fetchedArticle)

                    if (fetchedArticle?.owner) {
                        const fetchedUser = await getUserById(
                            fetchedArticle.owner,
                            jwtToken!,
                        )
                        if (!fetchedUser) {
                            console.log('user not found', fetchedUser)
                            setUser(null)
                        } else {
                            setUser(fetchedUser)
                            console.log('heyyyy', fetchedUser)
                        }
                    }
                }
            } catch (err) {
                console.error('eror fetching data : ', err)
                setError('Failed to fetch article')
            } finally {
                setLoading(false)
            }
        }

        fetchArticleData()
    }, [articleId, jwtToken])
    if (loading) {
        return <p>Loading...</p>
    }
    if (error || !articleId) {
        return <p>{error || 'Sorry, no article found'}</p>
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

    const articles = activeTab === 'user' ? userArticles : similarArticles

    const formatManufactureDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
        return new Date(dateString).toLocaleDateString('fr-FR', options)
    }
    const formatLastConnected = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
        return new Date(dateString).toLocaleDateString('fr-FR', options)
    }

    // switch (article.state) {
    //     case 'New':
    //         article.state = 'Nouveau'
    //         break
    //     case 'Like New':
    //         article.state = 'Comme Neuf'
    //         break
    //     case 'very good condition':
    //         article.state = 'Très bon état'
    //         break
    //     case 'good condition':
    //         article.state = 'Bon état'
    //         break
    //     case 'fair condition':
    //         article.state = 'Etat correct'
    //         break
    //     case 'to repair':
    //         article.state = 'A réparer'
    //         break
    //     case 'USED':
    //         article.state = 'Utilisé'
    //         break

    //     default:
    //         article.state = 'Non spécifié'
    //         break
    // }
    return (
        <div>
            <div className='flex flex-col items-start justify-between p-8 md:flex-row'>
                {/* Carousel section */}
                <div className='w-full md:w-1/2'>
                    <Carousel className='w-full max-w-md'>
                        <CarouselContent>
                            {article?.imageUrls?.map(
                                (imageUrl, index) =>
                                    // Vérifier que l'image n'est pas vide
                                    imageUrl && (
                                        <CarouselItem key={index}>
                                            <div className='p-1'>
                                                <Card>
                                                    <CardContent className='flex aspect-square items-center justify-center p-6'>
                                                        <img
                                                            src={imageUrl}
                                                            alt={`Image de l'article ${index + 1}`}
                                                            className='h-full w-full object-cover'
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ),
                            )}
                        </CarouselContent>
                        <CarouselPrevious className='ml-4' />
                        <CarouselNext className='mr-4' />
                    </Carousel>

                    {/* Description section */}
                    <div className='mt-4'>
                        <h2 className='text-2xl font-bold'>Description</h2>
                        <p className='mb-4 mt-2'>{article?.description}</p>
                        <p>
                            <strong>Dimensions :</strong>
                        </p>
                        <ul className='mt-2 list-inside list-disc'>
                            <li> Longueur : {article.dimensions?.length} cm</li>
                            <li> Largeur : {article.dimensions?.width} cm</li>
                            <li> Hauteur : {article.dimensions?.height} cm</li>
                            <li> Poids : {article.dimensions?.weight} kg</li>
                        </ul>
                    </div>

                    {/* Sales condition section */}

                    <div className='mt-4'>
                        <h2 className='text-2xl font-bold'>
                            Conditions de ventes{' '}
                        </h2>
                        <p className='mt-2'>
                            Livraison en {article?.deliveryType} : Lorem ipsum
                            dolor sit amet consectetur. Lorem ipsum dolor sit
                            amet consectetur. Lorem ipsum dolor sit amet
                            consectetur. Lorem ipsum dolor sit amet consectetur.
                            Lorem ipsum dolor sit amet consectetur. Lorem ipsum
                            dolor sit amet consectetur.
                        </p>
                    </div>
                </div>

                {/* Product details and seller info */}
                <div className='mt-8 w-full md:mt-0 md:w-1/2 md:pl-8'>
                    <h1 className='mb-4 text-4xl font-bold'>
                        {article?.adTitle}{' '}
                    </h1>

                    {/* Seller information */}
                    <div className='mb-4 flex items-center'>
                        <img
                            src={user?.avatarUrl}
                            alt='Avatar'
                            className='h-12 w-12 rounded-full'
                        />
                        <div className='ml-4'>
                            <p className='font-bold'>Pseudo : {user?.pseudo}</p>
                            <p>
                                <strong> Ville</strong> {user?.address[0].city},{' '}
                                <strong> Code Postal :</strong>{' '}
                                {user?.address[0].postcode}{' '}
                            </p>
                            <p>
                                <strong>Dernière connexion le : </strong>{' '}
                                {formatLastConnected(
                                    user?.activityStatus.lastConnected ||
                                        'Non précisé',
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Product details */}
                    <div className='text-gray-700'>
                        <p>
                            <strong>Année: </strong>
                            {formatManufactureDate(
                                article?.manufactureDate || 'Non précisé',
                            )}
                        </p>
                        <p>
                            {/* à traduire !!! */}
                            <strong>État : </strong> {article?.state}
                        </p>
                        <p>
                            <strong>Marque : </strong>
                            {article?.brand}
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
                </div>
                {/* Tab section (Besace user / Similaire) */}
                
            </div>
            <div className='mt-8 w-full'>
                    {/* Tabs (Besace user / Similaire) */}
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
    )
}

export default Article
