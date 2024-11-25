/* eslint-disable @typescript-eslint/no-unnecessary-condition */
'use client'

import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { getAllArticles } from '@/utils/apiCalls/article'
import { rqKeys } from '@/utils/constants'
import { formatDate } from '@/utils/functions/dates'
import { isEligible } from '@/utils/functions/isEligible'

import type { ArticlesListProps } from '@/types/article'
import { StatusSchema } from '@/types/article'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../shadcn/ui/card'
import SkeletonAvatarTxt from '../skeletons/SkeletonAvatarTxt'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { MapPin } from 'lucide-react'

export const ArticlesList = ({
    userBalance,
    isPremium,
    userCredit,
    isConnected,
}: ArticlesListProps): React.JSX.Element => {
    const searchParams = useSearchParams()
    const category = searchParams.get('category')

    const {
        data: articles,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isError,
        refetch,
    } = useSuspenseInfiniteQuery({
        queryKey: [rqKeys.ARTICLES, category],
        queryFn: ({ pageParam = 0 }) =>
            getAllArticles(
                pageParam,
                30,
                category ?? undefined,
                StatusSchema.Enum.AVAILABLE,
            ),
        getNextPageParam: (lastPage) =>
            lastPage.hasNext ? lastPage.nextCursor : undefined,
        initialPageParam: 0,
    })

    const router = useRouter()
    const previousScrollPosition = useRef(0)

    useEffect(() => {
        const handleScroll = (): void => {
            const scrollTop = window.scrollY
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight

            if (
                documentHeight - (scrollTop + windowHeight) < 150 &&
                hasNextPage &&
                !isFetching &&
                !isFetchingNextPage
            ) {
                previousScrollPosition.current = window.scrollY
                fetchNextPage()
            }
        }

        window.addEventListener('scroll', handleScroll)

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage])

    useEffect(() => {
        if (!isFetchingNextPage) {
            window.scrollTo(0, previousScrollPosition.current)
        }
    }, [isFetchingNextPage])

    useEffect(() => {
        if (isError) {
            refetch()
        }
    }, [isError, refetch])

    return (
        <div className='grid grid-cols-2 gap-4 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
            {articles.pages[0].articles === null && (
                <p className='col-span-full text-center'>
                    {'Aucun article disponible pour cette catégorie.'}
                </p>
            )}

            {articles.pages.length > 0 &&
                articles.pages.map(
                    (page) =>
                        Array.isArray(page.articles) &&
                        page.articles.map((article) => {
                            const eligible =
                                isConnected &&
                                isEligible({
                                    isPremium: isPremium ?? false,
                                    userBalance: userBalance ?? 0,
                                    userCredit: userCredit ?? 0,
                                    articlePrice: article.price,
                                })

                            return (
                                <Card
                                    key={article.id}
                                    className={`hover:scale-102 m-2 flex h-full transform cursor-pointer flex-col justify-between transition duration-200 ease-in-out hover:bg-gray-50 hover:shadow-md ${
                                        isConnected
                                            ? eligible
                                                ? 'border border-green-500'
                                                : 'border border-red-500'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        router.push(`/articles/${article.id}`)
                                    }}
                                >
                                    <CardHeader>
                                        <img
                                            src={article.imageUrls[0]}
                                            alt='#'
                                            className='w-full object-cover'
                                        />
                                    </CardHeader>
                                    <CardContent className='flex-grow'>
                                        <CardTitle className='pb-1 text-sm font-bold sm:text-base md:text-lg'>
                                            {article.adTitle}
                                        </CardTitle>
                                    </CardContent>
                                    <CardFooter className='mt-auto flex-col items-start text-xs sm:text-sm md:text-base'>
                                        <div className='flex items-center'>
                                            <MapPin className='mr-1' />
                                            {article.address?.city}
                                        </div>
                                        <div className='h-[1px] w-full bg-gray-200' />
                                        <div>
                                            {`posté le : ${formatDate(
                                                article.createdAt,
                                            )}`}
                                        </div>
                                    </CardFooter>
                                </Card>
                            )
                        }),
                )}

            <div>{!!isFetching && <SkeletonAvatarTxt />}</div>
        </div>
    )
}
