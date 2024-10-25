/* eslint-disable react/no-array-index-key */
/* eslint-disable import/newline-after-import */
'use client'

import { useState } from 'react'
import { Bell, Home, User } from 'react-feather'
// Importation des icônes
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
// Appel API pour récupérer les articles
import { pagePaths } from '@/utils/constants'
import { products } from '@/utils/constants/productValues'

import type { Article } from '@/types/article'

/*
 * import { categories } from '@/types/article/categories'
 * Récupérer les catégories depuis le fichier de typage
 */
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'

const Navbar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')

    const router = useRouter()

    // Utilisation de useQuery avec un typage correct pour récupérer les articles
    const { data: allArticles = [], error } = useQuery<Article[]>({
        queryKey: ['articles'],
        queryFn: getArticles,
    })

    // Filtrer les articles
    const filteredArticles: Article[] = allArticles.filter((article: Article) =>
        article.adTitle.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Gestion de la soumission de recherche
    const handleSearchSubmit = (event: React.FormEvent): void => {
        event.preventDefault()
        if (searchTerm) {
            router.push(`/articles?query=${searchTerm}`)
        }
    }

    return (
        <nav className='sticky z-50 border-b border-grey-light bg-white shadow-sm'>
            <div className='container mx-auto flex items-center justify-between py-4'>
                {/* "Déposer une annonce" Button */}
                <button className='rounded-md bg-blueGreen px-4 py-2 text-white hover:bg-blueGreen-hover active:bg-blueGreen-active'>
                    {'Ajouter un objet à ma besace'}
                </button>

                {/* Search bar */}
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
                            {/* Icône de loupe */}
                        </button>
                    </form>

                    {/* Suggestions de résultats de recherche */}
                    {!!searchTerm && (
                        <div className='absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg'>
                            {!!error && (
                                <p className='p-2 text-signals-forbidden-normal-active'>
                                    {error instanceof Error
                                        ? `Erreur: ${error.message}`
                                        : 'Erreur inconnue'}
                                </p>
                            )}
                            {filteredArticles.length > 0 ? (
                                filteredArticles.map((article: Article) => (
                                    <div
                                        // eslint-disable-next-line no-underscore-dangle
                                        key={article._id}
                                        className='p-2 hover:bg-gray-200'
                                    >
                                        {/* eslint-disable-next-line no-underscore-dangle*/}
                                        <Link href={`/articles/${article._id}`}>
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

                {/* User authentication and icons */}
                <div className='flex space-x-6 text-blueGreen-dark'>
                    {/* Icone Home */}
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
                        {/* Sheet pour profil et déconnexion */}
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
                                    {/* Intégration du UserProfileCard */}
                                    <div className='p-4'>
                                        <UserProfileCard />
                                    </div>
                                    <div className='p-4'>
                                        <Link href='https://deciding-reindeer-10.accounts.dev/user'>
                                            <h4 className='font-display text-lg font-bold'>
                                                {'Mes informations'}
                                            </h4>
                                        </Link>
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

            {/* Secondary Menu avec catégories */}
            <div className='flex justify-between bg-blueGreen-light-active py-2 align-middle'>
                {Object.keys(products.categories).map((categoryKey) => {
                    const keyTyped =
                        categoryKey as keyof typeof products.categories
                    return (
                        <div
                            key={categoryKey}
                            className='p-3 text-blueGreen-dark-active'
                        >
                            <Link
                                href={`/articles?category=${encodeURIComponent(categoryKey)}`}
                                className='block text-center text-text-3 hover:underline'
                            >
                                {products.categories[keyTyped].tag}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </nav>
    )
}

export default Navbar
