'use client'

import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/shadcn/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
} from '@/components/shadcn/ui/sheet'
import SearchBar from './SearchBar'

import { products } from '@/utils/constants/productValues'

type CategoriesMenuProps = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const CategoriesMenu: React.FC<CategoriesMenuProps> = ({
    isOpen,
    setIsOpen,
}) => {
    const sortedCategories = Object.keys(products.categories).sort((a, b) =>
        products.categories[a].tag.localeCompare(products.categories[b].tag),
    )

    // Fonction pour fermer la Sheet
    const closeSheet = () => setIsOpen(false)

    return (
        <>
            <Button
                onClick={() => {
                    setIsOpen(true)
                }}
                className='hidden-above-1399 visible-above-425 hidden-below-425 text-text-3 text-blueGreen-dark-active hover:underline'
                aria-label='Ouvrir le menu des catégories'
            >
                {'Catégories'}
            </Button>

            <Sheet
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <SheetContent
                    side='left'
                    className='w-full overflow-visible sm:max-w-lg'
                >
                    <SheetHeader className='relative'>
                        <h2 className='text-xl font-semibold'>{'TROCUP'}</h2>
                        {/* Barre de recherche */}
                        <div className='visible-below-425 relative hidden p-4'>
                            <SearchBar
                                onSearchSubmit={closeSheet} // Fermer la Sheet après une recherche
                            />
                        </div>
                    </SheetHeader>
                    {/* Catégories */}
                    <div
                        className='overflow-y-auto'
                        style={{ maxHeight: '629px' }}
                    >
                        <div className='flex flex-col p-4'>
                            {sortedCategories.map((categoryKey) => (
                                <Link
                                    key={categoryKey}
                                    href={`/articles?category=${encodeURIComponent(categoryKey)}`}
                                    className='p-3 text-blueGreen-dark-active hover:underline'
                                    onClick={closeSheet} // Fermer la Sheet après un clic sur un lien
                                >
                                    {products.categories[categoryKey].tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose />
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default CategoriesMenu
