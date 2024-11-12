/* eslint-disable react/no-array-index-key */
/* eslint-disable import/newline-after-import */
'use client'

import React, { useState } from 'react'
import { Bell, Home, User } from 'react-feather'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/shadcn/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from '@/components/shadcn/ui/sheet'
import UserProfileCard from './userCard'

import { getArticles } from '@/utils/apiCalls/article'
import { pagePaths } from '@/utils/constants'
import { products } from '@/utils/constants/productValues'

import type { Article } from '@/types/article'

import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'

const Navbar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const router = useRouter()

    // Utilisation de useQuery pour récupérer les articles
    const { data: allArticlesResponse } = useQuery<{
        articles: Article[]
        hasNext: boolean
        limit: number
        skip: number
    }>({
        queryKey: ['articles'],
        queryFn: getArticles,
    })

    // Vérification que les données récupérées contiennent bien des articles
    const allArticles: Article[] =
        allArticlesResponse && Array.isArray(allArticlesResponse.articles)
            ? (allArticlesResponse.articles as Article[])
            : []

    // Filtrer les articles
    const filteredArticles: Article[] = Array.isArray(allArticles)
        ? allArticles.filter((article: Article) =>
              article.adTitle.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        : []

    // Gestion de la soumission de recherche
    const handleSearchSubmit = (
        event: React.FormEvent<HTMLFormElement>,
    ): void => {
        event.preventDefault()
        if (searchTerm) {
            router.push(`/articles?query=${searchTerm}`)
        }
    }

    return (
        <nav className='sticky z-50 border-b border-grey-light bg-white shadow-sm'>
            <div className='container mx-auto flex items-center justify-between py-4'>
                <button className='rounded-md bg-blueGreen px-4 py-2 text-white hover:bg-blueGreen-hover active:bg-blueGreen-active'>
                    <Link href={pagePaths.ARTICLE_CREATION}>
                        {'Ajouter un objet à ma besace'}
                    </Link>
                </button>

                <div className='relative'>
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type='text'
                            placeholder='Rechercher un article…'
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                            }}
                            className='w-96 rounded-lg border border-gray-300 border-opacity-50 px-4 py-2'
                            style={{
                                borderWidth: '0.5px',
                                borderRadius: '8px',
                            }}
                        />
                        <button
                            type='submit'
                            className='absolute right-2 top-2 text-gray-600'
                        >
                            {'🔍 '}
                        </button>
                    </form>

                    {!!searchTerm && (
                        <div className='absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg'>
                            {filteredArticles.length > 0 ? (
                                filteredArticles.map((article: Article) => (
                                    <div
                                        key={article.id}
                                        className='p-2 hover:bg-gray-200'
                                    >
                                        <Link href={`/articles/${article.id}`}>
                                            {article.adTitle}
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p className='p-2'>{'Aucun article trouvé'}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className='flex justify-center space-x-6 text-center align-middle text-blueGreen-dark'>
                    <Link href={pagePaths.HOME}>
                        <Home
                            className='color-blueGreen-dark-active cursor-pointer'
                            strokeWidth={1.5}
                        />
                    </Link>

                    <SignedOut>
                        <SignInButton
                            forceRedirectUrl={pagePaths.HOME}
                            signUpForceRedirectUrl={pagePaths.ONBOARDING}
                            mode='modal'
                        >
                            <Button className='bg-blueGreen text-white hover:bg-blueGreen-hover'>
                                {'🚀 Connexion'}
                            </Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Link href={pagePaths.HOME}>
                                    <User
                                        className='color-blueGreen-dark-active cursor-pointer'
                                        strokeWidth={1.5}
                                    />
                                </Link>
                            </SheetTrigger>
                            <SheetContent side='right'>
                                <SheetHeader>
                                    <h3 className='flex min-h-full flex-col text-lg font-bold'>
                                        {'Mon Profil'}
                                    </h3>
                                </SheetHeader>
                                <div className='flex-grow'>
                                    <div className='p-4'>
                                        <UserProfileCard />
                                    </div>
                                </div>
                                <SheetFooter className='absolute bottom-0 left-0 flex w-full justify-start p-4'>
                                    <SignOutButton redirectUrl={pagePaths.HOME}>
                                        <Button className='bg-darkBlue text-white hover:bg-blueGreen'>
                                            {'Déconnexion'}
                                        </Button>
                                    </SignOutButton>
                                    <SheetClose />
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>

                        <Bell
                            className='color-blueGreen-dark-active cursor-pointer'
                            strokeWidth={1.5}
                        />
                    </SignedIn>
                </div>
            </div>

            <div className='flex justify-between bg-blueGreen-light-active py-2 align-middle'>
                {Object.keys(products.categories).map((categoryKey) => (
                    <div
                        key={categoryKey}
                        className='p-3 text-blueGreen-dark-active'
                    >
                        <Link
                            href={`/articles?category=${encodeURIComponent(categoryKey)}`}
                            className='block text-center text-text-3 hover:underline'
                        >
                            {products.categories[categoryKey].tag}
                        </Link>
                    </div>
                ))}
            </div>
        </nav>
    )
}

export default Navbar
