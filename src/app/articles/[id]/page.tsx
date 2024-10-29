'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import { Avatar, AvatarImage } from '@/components/shadcn/ui/avatar'
import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent, CardFooter } from '@/components/shadcn/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/shadcn/ui/carousel'
import { Separator } from '@/components/shadcn/ui/separator'

import { getArticleById } from '@/utils/apiCalls/article'
import { getUserById } from '@/utils/apiCalls/user'
import { avatarPlaceholder } from '@/utils/constants/avatarPlaceholder'
import { formatDate } from '@/utils/functions'

// Ajustez le chemin d'importation
import { AvatarFallback } from '@radix-ui/react-avatar'
import { useQuery } from '@tanstack/react-query'

const ArticlePage = (): React.JSX.Element => {
    // Get token & id from URL in string to avoid type errors :
    const jwtToken = String(process.env.NEXT_PUBLIC_JWT_TOKEN)
    const { id } = useParams()
    const articleId = String(id)

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
        queryKey: ['user', ownerId, jwtToken],
        queryFn: () => getUserById(ownerId, jwtToken),
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

    return (
        <div>
            {article ? (
                <div className='flex flex-col p-8 md:flex-row md:justify-between'>
                    {' '}
                    {/* Carousel section */}
                    <div className='flex w-full flex-col md:w-1/2 md:pr-4'>
                        <Carousel
                            className='mx-auto w-full max-w-md'
                            aria-label='Carousel des images des articles'
                        >
                            <CarouselContent>
                                {article.imageUrls.map(
                                    (imageUrl) =>
                                        // Vérifier que l'image n'est pas vide
                                        imageUrl && (
                                            <CarouselItem
                                                key={String(imageUrl)}
                                            >
                                                <div className='p-1'>
                                                    <Card>
                                                        <CardContent className='flex aspect-square items-center justify-center p-6'>
                                                            <Image
                                                                src={imageUrl}
                                                                alt='Image de l’article'
                                                                className='h-full w-full object-cover'
                                                                width={250}
                                                                height={250}
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ),
                                )}
                            </CarouselContent>
                            <CarouselPrevious
                                className='ml-4'
                                aria-label='Image précédente'
                            />
                            <CarouselNext
                                className='mr-4'
                                aria-label='Image suivante'
                            />
                        </Carousel>

                        {/* Description section */}
                        <div className='mt-4'>
                            {!!article.dimensions && (
                                <>
                                    <h2 className='text-2xl font-bold'>
                                        {'Description'}
                                    </h2>
                                    <p className='mb-4 mt-2'>
                                        {article.description}
                                    </p>
                                    <p>
                                        <strong>{'Dimensions :'}</strong>
                                    </p>
                                    <ul className='mt-2 list-inside list-disc'>
                                        <li>
                                            {' '}
                                            {'Longueur :'}{' '}
                                            {article.dimensions.length} {'cm'}
                                        </li>
                                        <li>
                                            {' '}
                                            {'Largeur : '}
                                            {article.dimensions.width} {'cm'}
                                        </li>
                                        <li>
                                            {' '}
                                            {'Hauteur :'}{' '}
                                            {article.dimensions.height} {'cm'}
                                        </li>
                                        <li>
                                            {' '}
                                            {'Poids : '}
                                            {article.dimensions.weight} {'kg'}
                                        </li>
                                    </ul>
                                </>
                            )}
                        </div>

                        {/* Sales condition section */}
                        <div className='mt-4'>
                            <h2 className='text-2xl font-bold'>
                                {'Conditions de ventes'}{' '}
                            </h2>
                            <p className='mt-2'>
                                {'Livraison en '}
                                {article.deliveryType} {': Lorem'}
                                {
                                    'ipsum dolor sit amet consectetur. Lorem ipsum'
                                }
                                {
                                    'dolor sit amet consectetur. Lorem ipsum dolor'
                                }
                                {
                                    'sit amet consectetur. Lorem ipsum dolor sit amet'
                                }
                                {'consectetur. Lorem ipsum dolor sit amet'}
                                {'consectetur. Lorem ipsum dolor sit amet'}
                                {'consectetur.'}
                            </p>
                        </div>
                    </div>
                    {/* Product details and seller info */}
                    <div className='mt-8 w-full md:mt-0 md:w-1/2 md:pl-8'>
                        <h1 className='mb-4 text-4xl font-bold'>
                            {article.adTitle}{' '}
                        </h1>

                        {/* Seller information */}
                        <div className='mb-4 flex items-center'>
                            {!!user && (
                                <>
                                    <Avatar>
                                        {!!user.avatarUrl && (
                                            <AvatarImage
                                                src={user.avatarUrl}
                                                alt='Avatar du user'
                                                className='h-15 w-15 rounded-full'
                                            />
                                        )}
                                        <AvatarFallback>
                                            {user.name}
                                        </AvatarFallback>
                                        {!user.avatarUrl && (
                                            <Image
                                                src={avatarPlaceholder}
                                                alt='Avatar'
                                                width={100}
                                                height={100}
                                                priority
                                            />
                                        )}
                                    </Avatar>

                                    <div className='ml-4'>
                                        <p>
                                            <strong>{'Pseudo : '}</strong>{' '}
                                            {user.pseudo}
                                        </p>
                                        <p>
                                            {!!user.address &&
                                                user.address.length > 0 && (
                                                    <>
                                                        <strong>
                                                            {' Ville'}
                                                        </strong>{' '}
                                                        {user.address[0].city}
                                                        {','}{' '}
                                                        <strong>
                                                            {' '}
                                                            {'Code Postal :'}
                                                        </strong>{' '}
                                                        {
                                                            user.address[0]
                                                                .postcode
                                                        }{' '}
                                                    </>
                                                )}
                                        </p>
                                        <p>
                                            <strong>
                                                {'Dernière connexion le :'}{' '}
                                            </strong>{' '}
                                            {formatDate(
                                                user.activityStatus
                                                    .lastConnected,
                                            )}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Product details */}
                        <div className='text-gray-700'>
                            <p>
                                {' '}
                                {!!article.manufactureDate && (
                                    <>
                                        <strong>{'Année: '}</strong>
                                        {formatDate(article.manufactureDate)}
                                    </>
                                )}
                            </p>
                            <p>
                                {/*TO DO à traduire */}
                                <strong>{'État : '}</strong> {article.state}
                            </p>
                            <p>
                                {article.brand ? (
                                    <>
                                        <strong>{'Marque : '}</strong>
                                        {article.brand}
                                    </>
                                ) : (
                                    <p>{' Pas de marque précisée'}</p>
                                )}
                            </p>
                            {/* Action buttons */}
                            <div className='mt-6 flex justify-center space-x-4'>
                                {/* add conditionnal rendering of this according to balance:
                                 */}
                                <Button
                                    className='bg-teal-500 text-white'
                                    aria-label='Je veux acheter cet article'
                                >
                                    {'Je le veux !'}
                                </Button>
                                <Button
                                    className='bg-teal-200 text-teal-700'
                                    aria-label='Envoyer un message au vendeur'
                                >
                                    {'Envoyer un message'}
                                </Button>
                            </div>{' '}
                        </div>
                    </div>
                </div>
            ) : (
                <p>{'Nous n’avons pas trouvé l’article !'}</p>
            )}
            <div>
                {/* Action buttons */}
                <div className='mb-6 mt-6 flex justify-center space-x-4'>
                    {/* add conditionnal rendering of this according to balance:
                     */}
                    <Button
                        className='bg-teal-500 text-white'
                        aria-label='Je veux acheter cet article'
                    >
                        {'Je le veux !'}
                    </Button>
                    <Button
                        className='bg-teal-200 text-teal-700'
                        aria-label='Envoyer un message au vendeur'
                    >
                        {'Envoyer un message'}
                    </Button>
                </div>{' '}
                <Separator />
                {/* Tab section (Besace user / Similaire) */}
                <div className='mt-8 w-full'>
                    {/* Tabs (Besace user / Similaire) */}
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
                            <Card
                                key={art.id || index}
                                className='text-center'
                            >
                                <CardContent>
                                    <p className='text-sm font-medium'>
                                        {art.title}
                                    </p>
                                </CardContent>
                                <CardFooter className='flex justify-center'>
                                    <button className='text-gray-500'>
                                        <svg
                                            // xmlns='^http:\/\/www.w3.org/2000/svg'
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

export default ArticlePage
