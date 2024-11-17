'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/shadcn/ui/accordion'
import { Button } from '@/components/shadcn/ui/button'

import { pagePaths } from '@/utils/constants'

import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs'

/**
 *
 */
const AccordionDemo: React.FC = () => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        // Afficher un "loading" ou un fallback si nécessaire
        return <div>{'Loading…'}</div>
    }

    return (
        <div>
            <section className='hero-section relative flex items-center justify-center'>
                <div className='relative w-full'>
                    {/* Conteneur du logo et du texte */}
                    <div className='absolute left-0 top-0 z-20 flex flex-col items-center gap-y-1 p-4'>
                        <Link href='/'>
                            <img
                                src='/logo.png'
                                alt='Logo'
                                className='w-32'
                            />
                        </Link>
                        <div className='text-lg font-semibold text-white'>
                            {'Centre d’aide'}
                        </div>
                    </div>

                    {/* Conteneur pour "Retour sur TrocUp" et le bouton Connexion/Déconnexion */}
                    <div className='absolute right-4 top-4 z-20 flex items-center gap-4'>
                        {/* Texte "Retour sur TrocUp" à gauche */}
                        <Link
                            href={pagePaths.HOME}
                            className='text-lg font-semibold text-white'
                        >
                            {'Retour sur TrocUp'}
                        </Link>

                        {/* Bouton Connexion/Déconnexion à droite */}
                        <div className='flex gap-2'>
                            <SignedOut>
                                <SignInButton
                                    forceRedirectUrl={pagePaths.HOME}
                                    signUpForceRedirectUrl={
                                        pagePaths.ONBOARDING
                                    }
                                    mode='modal'
                                >
                                    <Button className='border border-blueGreen bg-transparent text-blueGreen hover:bg-blueGreen-hover hover:text-white'>
                                        {'🚀 Connexion'}
                                    </Button>
                                </SignInButton>
                            </SignedOut>

                            <SignedIn>
                                <SignOutButton>
                                    <Button className='border border-blueGreen bg-transparent text-blueGreen hover:bg-blueGreen-hover hover:text-white'>
                                        {'🔑 Déconnexion'}
                                    </Button>
                                </SignOutButton>
                            </SignedIn>
                        </div>
                    </div>

                    {/* Image de fond */}
                    <img
                        src='/heroAide.png'
                        alt='Illustrative de la plateforme Trocup'
                        className='h-80 w-full shadow-lg'
                    />

                    {/* Texte au centre de l'image */}
                    <h1 className='absolute inset-0 z-10 flex translate-y-[-12px] items-center justify-center text-5xl font-bold text-white'>
                        {'Comment pouvons-nous vous aider?'}
                    </h1>
                </div>
            </section>

            <div className='mb-12 mt-8 flex min-h-[60vh] items-center justify-center'>
                {' '}
                {/* Réduction de la hauteur minimum */}
                <div className='mt-[-2px] w-full max-w-2xl'>
                    {' '}
                    {/* Ajout d'un margin-top négatif pour ajuster */}
                    <Accordion
                        type='single'
                        collapsible
                        className='w-full'
                    >
                        <AccordionItem value='item-1'>
                            <AccordionTrigger>
                                {'Débuter sur la plateforme'}
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className='list-disc pl-5'>
                                    {' '}
                                    {/* Applique une liste à puces */}
                                    <li className='text-[#30BBB4]'>
                                        <a
                                            href='/qu-est-ce-que-trocup'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Qu’est-ce que Trocup ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Comment créer son compte ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Qu’est-ce l’abonnement premium'}
                                            {'Trocup ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Pourquoi dois-je fournir une pièce'
                                            }
                                            {'d’identité ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Le glossaire de Trocup'}
                                        </a>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-2'>
                            <AccordionTrigger>
                                {'Bien utiliser Trocup'}
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className='list-disc pl-5'>
                                    {' '}
                                    {/* Applique une liste à puces */}
                                    <li className='text-[#30BBB4]'>
                                        <a
                                            href='/qu-est-ce-que-trocup'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Comment fonctionne le dépôt d’une'
                                            }
                                            {'annonce ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Quels articles je peux publier ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Comment modifier mon annonce ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Comment booster mon annonce ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Comment supprimer mon annonce ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Comment ajouter une annonce à ses'
                                            }
                                            {'favoris ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Comment troquer un objet sur la'}
                                            {'plateforme ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Peux-t-on réserver un objet ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Comment fonctionne la messagerie ?'
                                            }
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Comment se passe la livraison ?'}
                                        </a>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-3'>
                            <AccordionTrigger>
                                {'Profil utilisateur'}
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className='list-disc pl-5'>
                                    {' '}
                                    {/* Applique une liste à puces */}
                                    <li className='text-[#30BBB4]'>
                                        <a
                                            href='/qu-est-ce-que-trocup'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Comment se connecter et se'}
                                            {'déconnecter ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'J’ai oublié mon mot de passe ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Comment modifier mon compte sur'}
                                            {'Trocup ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Comment supprimer mon compte sur'}
                                            {'Trocup ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Comment accéder à mes transactions'
                                            }
                                            {'passées ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Comment accéder à mes demandes en'
                                            }
                                            {'cours ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Comment accéder aux avis reçus ?'}
                                        </a>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-4'>
                            <AccordionTrigger>
                                {'Fonctionnalité de Troc et IA'}
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className='list-disc pl-5'>
                                    {' '}
                                    {/* Applique une liste à puces */}
                                    <li className='text-[#30BBB4]'>
                                        <a
                                            href='/qu-est-ce-que-trocup'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Pourquoi l’utilisation d’une IA ?'
                                            }
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Comment l’IA évalue-t-elle les'}
                                            {'articles ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Est-ce que l’IA est fiable ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Peut-on contester une évaluation'}
                                            {'faite par l’IA ?'}
                                        </a>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-5'>
                            <AccordionTrigger>{'Livraison'}</AccordionTrigger>
                            <AccordionContent>
                                <ul className='list-disc pl-5'>
                                    {' '}
                                    {/* Applique une liste à puces */}
                                    <li className='text-[#30BBB4]'>
                                        <a
                                            href='/qu-est-ce-que-trocup'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Quels sont les moyens de livraison'
                                            }
                                            {'disponible ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Sous combien de jours, je reçois le'
                                            }
                                            {'bien échangé ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'L’objet reçu n’est pas le bon, que'
                                            }
                                            {'faire ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Je n’ai pas reçu mon objet ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'L’objet est arrivé cassé, que faire'
                                            }
                                            {'?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'L’objet troqué a été égaré par la'
                                            }
                                            {
                                                'société de livraison, que faire ?'
                                            }
                                        </a>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-6'>
                            <AccordionTrigger>
                                {'Sécurité et Fiabilité des Échanges'}
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className='list-disc pl-5'>
                                    {' '}
                                    {/* Applique une liste à puces */}
                                    <li className='text-[#30BBB4]'>
                                        <a
                                            href='/qu-est-ce-que-trocup'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Quelles sont les mesures de sécurité'
                                            }
                                            {'mis en place pour vérifier la'}
                                            {'fiabilité des utilisateurs ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Quelles garanties fournis Trocup'}
                                            {'pour garantir la fiabilité des'}
                                            {'transactions ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Comment puis-je faire confiance à'
                                            }
                                            {'l’évaluation par l’IA ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Comment ouvrir un litige ?'}
                                        </a>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-7'>
                            <AccordionTrigger>
                                {'Je rencontre un problème sur Trocup'}
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className='list-disc pl-5'>
                                    {' '}
                                    {/* Applique une liste à puces */}
                                    <li className='text-[#30BBB4]'>
                                        <a
                                            href='/qu-est-ce-que-trocup'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Je n’arrive pas à me connecter'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Mon annonce n’est toujours pas'}
                                            {'publié'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Mon annonce n’est plus disponible'
                                            }
                                            {'sur le site'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'J’ai supprimé mon annonce par erreur'
                                            }
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Le troqueur n’est pas venu au'}
                                            {'rendez-vous'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Le troqueur de valide pas ma demande'
                                            }
                                            {'troque'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Une annonce ne respecte pas les'}
                                            {'consignes de Trocup'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'J’ai reçu des messages innapropriés,'
                                            }
                                            {'que faire ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Peut-on bloquer un troqueur ?'}
                                        </a>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-8'>
                            <AccordionTrigger>
                                {'Les règles du bon troqueur'}
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className='list-disc pl-5'>
                                    {' '}
                                    {/* Applique une liste à puces */}
                                    <li className='text-[#30BBB4]'>
                                        <a
                                            href='/qu-est-ce-que-trocup'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Les règles sur les objets/annonces'
                                            }
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'La charte du bon troqueur'}
                                        </a>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-9'>
                            <AccordionTrigger>
                                {'Confidentialité et Données Personnelles'}
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className='list-disc pl-5'>
                                    {' '}
                                    {/* Applique une liste à puces */}
                                    <li className='text-[#30BBB4]'>
                                        <a
                                            href='/qu-est-ce-que-trocup'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Mes données personnelles sont-elles'
                                            }
                                            {'protégées ?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Que fait la plateforme en cas de'}
                                            {'fraude ?'}
                                        </a>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-10'>
                            <AccordionTrigger>
                                {'Assistance et Support'}
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className='list-disc pl-5'>
                                    {' '}
                                    {/* Applique une liste à puces */}
                                    <li className='text-[#30BBB4]'>
                                        <a
                                            href='/qu-est-ce-que-trocup'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {
                                                'Comment contacter le support client'
                                            }
                                            {'?'}
                                        </a>
                                    </li>
                                    <li className='mt-2 text-[#30BBB4]'>
                                        <a
                                            href='/creer-un-projet'
                                            className='font-bold hover:bg-[#f0f8ff] hover:underline'
                                        >
                                            {'Puis-je annuler mon abonnement'}
                                            {'premium à tout moment ?'}
                                        </a>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default AccordionDemo
