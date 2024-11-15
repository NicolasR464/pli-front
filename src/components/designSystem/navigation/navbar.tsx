'use client'

import React, { useState } from 'react'

import { Button } from '@/components/shadcn/ui/button'
import Link from 'next/link'
import { pagePaths } from '@/utils/constants'
import SearchBar from './searchBar'
import CategoriesMenu from './categorieMenu'
import NavigationIcons from './navIcons'
import SubNavigation from './subNavigation'
import { products } from '@/utils/constants/productValues'
import MobileNavigationBar from './mobielMenu'
import { Menu } from 'react-feather'

const Navbar: React.FC = () => {
    const [isCategorySheetOpen, setCategorySheetOpen] = useState(false)

    return (
        <nav className='sticky z-50 border-b border-grey-light bg-white px-1 shadow-sm'>
            <div className='container mx-auto flex items-center justify-between px-4 py-4'>
                {/* Bouton Ajouter */}
                <div className='hidden flex-shrink-0 lg:flex'>
                    <Link href={pagePaths.ARTICLE_CREATION || '/'}>
                        <Button className='flex rounded-md bg-blueGreen-dark px-4 py-2 text-white hover:bg-blueGreen-hover active:bg-blueGreen-active'>
                            <span>Ajouter un objet à ma besace</span>
                        </Button>
                    </Link>
                </div>

                {/* Barre de recherche */}
                <div className='hidden-below-425 relative mx-auto max-w-md flex-grow'>
                    <SearchBar />
                </div>

                {/* Menu Catégories */}
                <CategoriesMenu
                    isOpen={isCategorySheetOpen}
                    setIsOpen={setCategorySheetOpen}
                />
                {/* Icône Menu Burger pour ouvrir la Sheet en dessous de 425px */}
                <div className='visible-below-425 hidden'>
                    <Button
                        onClick={() => setCategorySheetOpen(true)}
                        className='text-blueGreen-dark-active'
                        aria-label='Ouvrir le menu'
                    >
                        <Menu />
                    </Button>
                </div>
                {/* Icônes pour desktop */}
                <NavigationIcons />
            </div>

            {/* Sous-navigation pour les catégories */}
            <SubNavigation categories={products.categories} />

            {/* Menu mobile en bas */}
            <MobileNavigationBar />
        </nav>
    )
}

export default Navbar
