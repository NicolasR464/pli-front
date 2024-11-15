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
import Image from 'next/image'

const Navbar: React.FC = () => {
    const [isCategorySheetOpen, setCategorySheetOpen] = useState(false)

    return (
        <nav className='sticky z-50 w-full border-b border-grey-light bg-white px-0 shadow-sm'>
            <div className='flex min-w-max items-center justify-between py-0'>
                <div className='flex items-center justify-center space-x-4'>
                    <Image
                        src={
                            'https://res.cloudinary.com/ddtptgbnn/image/upload/v1731668976/blockmark_black_4x_vkglhp.png'
                        }
                        alt={'Trocup'}
                        width={150}
                        height={100}
                        className='left-0'
                    />

                    {/* Bouton Ajouter */}
                    <div className='hidden lg:flex'>
                        <Link href={pagePaths.ARTICLE_CREATION || '/'}>
                            <Button className='mx-auto flex rounded-md border bg-blueGreen-dark px-4 py-2 text-white hover:bg-blueGreen '>
                                <span>Ajouter un objet à ma besace</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Barre de recherche */}
                <div className='hidden-below-425 relative max-w-md flex-grow'>
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
