'use client'
import { Button } from '@/components/shadcn/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
} from '@/components/shadcn/ui/sheet'
import React, { useState } from 'react'
import SearchBar from './searchBar'
import { products } from '@/utils/constants/productValues'
import Link from 'next/link'

interface CategoriesMenuProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const CategoriesMenu: React.FC<CategoriesMenuProps> = ({
    isOpen,
    setIsOpen,
}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const sortedCategories = Object.keys(products.categories).sort((a, b) =>
        products.categories[a].tag.localeCompare(products.categories[b].tag),
    )
    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className='hidden-above-1399 visible-above-425 hidden-below-425 text-text-3 text-blueGreen-dark-active hover:underline'
                aria-label='Ouvrir le menu des catégories'
            >
                Catégories
            </Button>

            <Sheet
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <SheetContent
                    side='left'
                    className='w-full sm:max-w-lg'
                >
                    <SheetHeader>
                        <h2 className='text-xl font-semibold'>TROCUP</h2>
                        {/* Barre de recherche */}
                        <div className='visible-below-425 hidden p-4 '>
                            <SearchBar
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
