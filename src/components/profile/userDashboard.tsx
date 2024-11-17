'use client'
import React, { useState } from 'react'
import { User, CreditCard, List, ShoppingBag, HelpCircle } from 'react-feather'

import UserInfo from './userInfo'
import PaymentMethods from './userPaiementMethode'
import Transactions from './userTransactions'
import UserBesace from './userBesace'
import UserProfileCard from '../designSystem/userCard'

// Composants spécifiques à chaque section

const UserDashboard: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('info')
    const [activeSubSection, setActiveSubSection] = useState<string | ''>()

    // Liste des sections avec icônes
    const sections = [
        { id: 'info', label: 'Mes infos', icon: <User /> },
        {
            id: 'payment',
            label: 'Mes moyens de paiement',
            icon: <CreditCard />,
        },
        { id: 'transactions', label: 'Mes Transactions', icon: <List /> },
        { id: 'bag', label: 'Ma besace', icon: <ShoppingBag /> }
    ]

    // Fonction pour rendre le contenu principal
    const renderMainContent = () => {
        switch (activeSection) {
            case 'info':
                return (
                    <UserInfo
                        activeSubSection={activeSubSection}
                        setActiveSubSection={setActiveSubSection}
                    />
                )
            case 'payment':
                return <PaymentMethods />
            case 'transactions':
                return <Transactions />
            case 'bag':
                return <UserBesace />
            default:
                return <p>{'Sélectionnez une section dans le menu.'}</p>
        }
    }

    return (
        <div className='flex flex-col'>
            {/* User Card */}
            <div className='bg-green-light p-4'>
                <UserProfileCard />
            </div>

            {/* Contenu principal */}
            <div className='flex h-full'>
                {/* Sidebar gauche */}
                <aside className='w-1/2 border-r bg-white px-4'>
                    <ul className='flex flex-col gap-4 p-4'>
                        {sections.map((section) => (
                            <li
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 text-left text-h6 ${
                                    activeSection === section.id
                                        ? 'bg-blueGreen-light-hover font-bold text-blueGreen-dark-active'
                                        : 'text-blueGreen-dark-active hover:bg-gray-100'
                                }`}
                            >
                                <span className='text-xl'>{section.icon}</span>
                                <span>{section.label}</span>
                            </li>
                        ))}
                        <li>
                            <a
                                href='/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex cursor-pointer items-center gap-3 rounded-lg p-3 text-left text-h6 text-blueGreen-dark-active'
                            >
                                <HelpCircle />
                                Help Center
                            </a>
                        </li>
                    </ul>
                </aside>

                {/* Section droite */}
                <main className='flex-1 p-6'>{renderMainContent()}</main>
            </div>
        </div>
    )
}

export default UserDashboard
