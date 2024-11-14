import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/shadcn/ui/accordion'

/**
 * ConditionsTroc affiche les conditions générales pour un échange transparent et équitable entre utilisateurs.
 * Il s'agit d'un accord qui permet aux utilisateurs de comprendre les règles du troc sur la plateforme.
 * @returns {React.JSX.Element} Le composant affichant les conditions générales.
 */
export const ConditionsTroc = (): React.JSX.Element => (
    <Accordion
        type='single'
        collapsible
        className='w-full'
    >
        <AccordionItem value='item-1'>
            <AccordionTrigger>
                {'Pour que tout soit clair avant de commencer à échanger,'}
                {'consultez nos conditions générales et engagez-vous dans'}
                {'un troc transparent et équitable. Cliquez pour en savoir'}
                {' plus ! 🚀'}
            </AccordionTrigger>
            <AccordionContent>
                <h3 className='font-bold'>{'1. Soigne tes annonces 📸'}</h3>
                <p>
                    {'Publie des photos claires et des descriptions précises'}
                    {'pour rendre tes articles attractifs et fiables.'}
                </p>

                <h3 className='font-bold'>{'2. Respecte les échanges 🤝'}</h3>
                <p>
                    {'Propose des articles en bon état et pertinents pour le'}
                    {'troc. L’objectif est un échange équitable et'}
                    {'satisfaisant pour les deux parties.'}
                </p>

                <h3 className='font-bold'>
                    {'3. Sois réactif et respectueux ⏰'}
                </h3>
                <p>
                    {'Réponds rapidement aux messages et sois courtois avec'}
                    {'les autres utilisateurs. Le respect mutuel est essentiel'}
                    {'pour maintenir une bonne ambiance sur la plateforme.'}
                </p>

                <h3 className='font-bold'>
                    {'4. Utilise le système d’évaluation 🌟'}
                </h3>
                <p>
                    {'Après chaque échange, évalue ton interlocuteur pour'}
                    {'renforcer la confiance entre les membres de la'}
                    {'communauté.'}
                </p>

                <h3 className='font-bold'>{'5. Gère tes annonces 📋'}</h3>
                <p>
                    {'Limite-toi à cinq articles à publier simultanément'}
                    {'et respecte la valeur maximale de ta "besace" (200€'}
                    {'pour les utilisateurs Premium, 150€ pour les autres).'}
                </p>

                <h3 className='font-bold'>{'6. Abonnement Premium 💎'}</h3>
                <p>
                    {'Si tu choisis l’abonnement Premium, tu bénéficies'}
                    {'d’avantages supplémentaires tels que des boosts'}
                    {'gratuits et l’accès anticipé aux nouveaux articles.'}
                    {'Pense à bien gérer tes boosts !'}
                </p>

                <h3 className='font-bold'>{'7. Protection des données 🔒'}</h3>
                <p>
                    {'Tes informations personnelles sont protégées'}
                    {'conformément à notre politique de confidentialité.'}
                </p>

                <h3 className='font-bold'>
                    {'Conditions Générales - Points Clés 🔑'}
                </h3>
                <ul>
                    <li>
                        {'Évaluations après chaque échange, avec possibilité'}
                        {'de contestation pour objets non conformes sous 5'}
                        {'jours.'}
                    </li>
                    <li>
                        {'La Plateforme protège tes données personnelles'}
                        {'conformément à sa politique de confidentialité.'}
                    </li>
                </ul>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
)
