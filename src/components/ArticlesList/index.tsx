/* eslint-disable no-inline-comments */
/* eslint-disable line-comment-position */
'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { getAllArticles } from '@/utils/apiCalls/article'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../shadcn/ui/card'
import SkeletonAvatarTxt from '../skeletons/SkeletonAvatarTxt'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

const formatDateToFrench = (dateString: string): string => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }
    return date.toLocaleDateString('fr-FR', options)
}

export const ArticlesList = (): React.JSX.Element => {
    const {
        data: articles,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isError,
        refetch,
    } = useSuspenseInfiniteQuery({
        queryKey: ['allArticles'],
        queryFn: ({ pageParam = 0 }) => getAllArticles(pageParam, 30),
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
        <div className='grid grid-cols-3 p-3'>
            {!isError &&
                articles.pages.length > 0 &&
                articles.pages.map((page) =>
                    page.articles.map((article) => (
                        <Card
                            key={article.id}
                            className='hover:scale-102 m-2 transform cursor-pointer flex-col transition duration-200 ease-in-out hover:bg-gray-50 hover:shadow-md'
                            onClick={() => {
                                router.push(`/articles/${article.id}`)
                            }}
                        >
                            <CardHeader>
                                <img
                                    src={article.imageUrls[0]}
                                    alt='#'
                                />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className='pb-1'>
                                    {article.adTitle}
                                </CardTitle>
                                <div className='flex'>
                                    <div>{article.price}</div>
                                    <div>{' €'}</div>
                                </div>
                            </CardContent>
                            <CardFooter className='flex-col items-start'>
                                <div>{article.address?.city}</div>
                                <div>
                                    {formatDateToFrench(article.createdAt)}
                                </div>
                            </CardFooter>
                        </Card>
                    )),
                )}

            <div>{!!isFetching && <SkeletonAvatarTxt />}</div>
        </div>
    )
}
