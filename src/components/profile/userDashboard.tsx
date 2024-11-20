'use client'
import React, { useState } from 'react'
import { User, CreditCard, List, ShoppingBag, HelpCircle } from 'react-feather'

import UserInfo from './items/informations/UserInfo'
import PaymentMethods from './items/informations/UserPaiementMethode'
import Transactions from './items/transaction/UserTransactions'
import UserBesace from './items/besace/UserBesace'
import UserProfileCard from '../designSystem/UserCard'

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
        { id: 'bag', label: 'Ma besace', icon: <ShoppingBag /> },
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
                <aside className='sticky top-0 h-screen w-16 border-r bg-white md:w-1/2 md:min-w-[320px]'>
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
                                <span className='hidden md:inline'>
                                    {section.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Section droite */}
                <main className='flex-1 p-6'>{renderMainContent()}</main>
            </div>
        </div>
    )
}

export default UserDashboard
