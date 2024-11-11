'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'

import { Button } from '@/components/shadcn/ui/button'
import { Separator } from '@/components/shadcn/ui/separator'
import ArticleDetails from '@/components/articleDisplay/ArticleDetails'
import CarouselImages from '@/components/articleDisplay/CarouselImages'
import ProductActions from '@/components/articleDisplay/ProductAction'
import ProductCard from '@/components/articleDisplay/ProductCard'
import ProductDetails from '@/components/articleDisplay/ProductDetails'
import SellerInfo from '@/components/articleDisplay/SellerInfo'
import { ConditionsTroc } from '@/components/ConditionsTroc'
import EmailSender from '@/components/EmailSender'
import Map from '@/components/Map'

import { getArticleById } from '@/utils/apiCalls/article'
import { getUserById } from '@/utils/apiCalls/user'

import { useQuery } from '@tanstack/react-query'

const ArticlePage = (): React.JSX.Element => {
    // Get id from URL in string to avoid type errors :
    const { id } = useParams()
    const articleId = String(id)

    const { user: userSignedIn } = useUser()

    // React query to get article data
    const {
        data: article,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['article', articleId],
        queryFn: () => getArticleById(articleId),
        enabled: !!articleId,
    })
    // Type and store id in a variable to avoid errors
    const ownerId = article?.owner

    // React query to get user data
    const { data: user } = useQuery({
        queryKey: ['user', ownerId],
        queryFn: () => getUserById(ownerId),
        enabled: !!ownerId,
    })

    // tab dynamiques
    const [activeTab, setActiveTab] = useState<'user' | 'similar'>('user')
    const userArticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        title: 'Lorem ipsum',
    }))

    const similarArticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        title: 'Similar article',
    }))
    const articles = activeTab === 'user' ? userArticles : similarArticles

    if (isLoading) return <p aria-live='polite'>{'Chargement en cours…'}</p>
    if (isError)
        return (
            <p aria-live='assertive'>{'Oulah ! Une erreur est survenue..'}</p>
        )

    const cityPosition = article?.address?.geopoints?.coordinates
    const lat = cityPosition ? cityPosition[0] : undefined
    const long = cityPosition ? cityPosition[1] : undefined

    return (
        <div>
            {article ? (
                <div className='flex flex-col p-8 md:flex-row md:justify-between'>
                    {' '}
                    {/* Carousel section */}
                    <div className='flex w-full flex-col md:w-1/2 md:pr-4'>
                        <CarouselImages imageUrls={article.imageUrls} />

                        {/* Description section */}
                        <h2 className='mt-4 text-2xl font-bold'>
                            {'Description'}
                        </h2>
                        <p className='mb-4 mt-2'>{article.description}</p>

                        {!!article.dimensions && (
                            <ArticleDetails dimensions={article.dimensions} />
                        )}
                    </div>
                    {/* Product details and seller info */}
                    <div className='mt-8 w-full md:mt-0 md:w-1/2 md:pl-8'>
                        <h1 className='mb-4 text-4xl font-bold'>
                            {article.adTitle}{' '}
                        </h1>
                        {!!user && (
                            <SellerInfo
                                avatarUrl={user.avatarUrl ?? undefined}
                                lastConnected={
                                    user.activityStatus.lastConnected
                                }
                                pseudo={user.pseudo}
                                name={user.name}
                                address={user.address}
                            />
                        )}

                        {/* Product details */}
                        <ProductDetails article={article} />
                        {/* Section de la carte */}
                        <div>
                            <div className='mt-8 flex pb-4 pl-8'>
                                <strong className='text-2xl font-bold'>
                                    {'📍 L’article se situe à …'}{' '}
                                    {article.address?.city}{' '}
                                    {`(${article.address?.postcode})`}
                                </strong>
                            </div>
                            {!!lat && !!long && (
                                <Map
                                    latitude={lat}
                                    longitude={long}
                                />
                            )}
                        </div>

                        {/* Action buttons */}
                        <ProductActions />
                    </div>
                </div>
            ) : (
                <p>{'Nous n’avons pas trouvé l’article !'}</p>
            )}
            <div>
                {/* Sales condition section */}
                <div className='mt-2'>
                    <div className='App mx-auto max-w-4xl rounded-lg border border-gray-300 bg-gray-100 p-6 text-center'>
                        <h2 className='text-2xl font-bold'>
                            {'Les règles du jeu :'}
                        </h2>
                        <ConditionsTroc />
                    </div>
                </div>
                {/* Action buttons */}
                <ProductActions />

                <Separator />
                {/* Tab section (Besace user / Similaire) */}
                <div className='mt-8 w-full'>
                    <div className='mb-6 flex justify-center'>
                        <Button
                            className={`${
                                activeTab === 'user'
                                    ? 'bg-yellow-600 text-white'
                                    : 'bg-gray-200 text-gray-600'
                            } rounded-l-lg px-4 py-2`}
                            onClick={() => {
                                setActiveTab('user')
                            }}
                        >
                            {'Besace user'}
                        </Button>
                        <Button
                            className={`${
                                activeTab === 'similar'
                                    ? 'bg-yellow-600 text-white'
                                    : 'bg-gray-200 text-gray-600'
                            } rounded-r-lg px-4 py-2`}
                            onClick={() => {
                                setActiveTab('similar')
                            }}
                        >
                            {'Similaire'}
                        </Button>
                    </div>

                    {/* Product cards */}
                    <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                        {articles.map((art, index) => (
                            <ProductCard
                                key={art.id || index}
                                product={art}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticlePage
