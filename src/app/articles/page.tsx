import { Suspense } from 'react'

import { ArticlesList } from '@/components/ArticlesList'
import SkeletonAvatarTxt from '@/components/skeletons/SkeletonAvatarTxt'

import { getQueryClient } from '@/utils/providers/getQueryClient'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

/** Display all articles data. */
const Articles = (): React.JSX.Element => {
    const queryClient = getQueryClient()

    // Placeholder pendant le chargement des articles (10 éléments simulés)
    const skeletons = []
    for (let inc = 0; inc < 10; inc++) {
        skeletons.push(<SkeletonAvatarTxt key={inc} />)
    }

    return (
        <main>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={skeletons}>
                    <ArticlesList />
                </Suspense>
            </HydrationBoundary>
        </main>
    )
}

export default Articles
