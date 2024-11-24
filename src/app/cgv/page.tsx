'use client'

import React from 'react'
import Image from 'next/image'
/* eslint-disable new-cap */
const CGV: React.FC = (): React.JSX.Element => {
    return (
        <div>
            <section className='hero-section relative flex items-center justify-center'>
                <div className='relative w-full'>
                    {/* Image de fond */}
                    <Image
                        src='/heroAide.png'
                        alt='Illustration de la plateforme Trocup'
                        layout='responsive'
                        width={1_920}
                        height={1_000}
                        className='max-h-[290px] w-full object-cover shadow-lg'
                    />

                    {/* Texte au centre de l'image */}
                    <h1 className='absolute inset-0 flex translate-y-[-12px] items-center justify-center text-5xl font-bold text-white'>
                        {'Conditions Générales de Vente'}
                    </h1>
                </div>
            </section>

            <div className='container mx-auto px-4 py-8'>
                {/* Préambule */}
                <section className='mb-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'Préambule'}
                    </h2>
                    <p className='justify text-justify leading-relaxed text-gray-600'>
                        {'Les présentes Conditions Générales de Vente (CGV)'}
                        {
                            'régissent les transactions effectuées sur la plateforme\r'
                        }
                        {'de troc (ci-après dénommée « la Plateforme »). En\r'}
                        {
                            'accédant et en utilisant la Plateforme, l’Utilisateur\r'
                        }
                        {'(ci-après dénommé « l’Utilisateur ») accepte sans\r'}
                        {'réserve les présentes CGV.'}
                    </p>
                </section>

                {/* Section 1 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'1. Objet des CGV'}
                    </h2>
                    <p className='justify text-justify leading-relaxed text-gray-600'>
                        {
                            'Les CGV définissent les modalités de vente des services\r'
                        }
                        {'proposés par la Plateforme. Ces services incluent\r'}
                        {
                            'l’échange d’articles entre utilisateurs sous forme de\r'
                        }
                        {
                            'troc et des services supplémentaires disponibles en\r'
                        }
                        {'abonnement Premium.'}
                    </p>
                </section>

                {/* Section 2 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'2. Accès aux Services'}
                    </h2>
                    <h3 className='justify mb-2 text-xl font-semibold text-gray-600'>
                        {'2.1 Mode Gratuit'}
                    </h3>
                    <ul className='justify list-inside list-disc space-y-2 text-gray-600'>
                        <li>
                            {
                                'Affichage publicitaire : La navigation est soumise à'
                            }
                            {'la présence de publicités.'}
                        </li>
                        <li>
                            {'Boost d’article : L’Utilisateur peut booster un'}
                            {
                                'article moyennant 2€ pour une meilleure visibilité.'
                            }
                        </li>
                    </ul>

                    <h3 className='justify mb-2 mt-4 text-xl font-semibold text-gray-600'>
                        {'2.2 Mode Premium (4,99€/mois)'}
                    </h3>
                    <ul className='justify list-inside list-disc space-y-2 text-gray-600'>
                        <li>
                            {
                                'Boost d’articles gratuits : Trois boosts gratuits'
                            }
                            {'par mois sont inclus.'}
                        </li>
                        <li>{'Accès anticipé aux nouveaux articles.'}</li>
                        <li>
                            {'Échanges "one-to-many" après 3 échanges réussis.'}
                        </li>
                    </ul>
                </section>

                {/* Section 3 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'3. Obligations de l’Utilisateur'}
                    </h2>
                    <ul className='justify justify list-inside list-disc space-y-2 text-gray-600'>
                        <li>
                            {
                                'Soigner les annonces : Utiliser des photos claires'
                            }
                            {'et des descriptions précises.'}
                        </li>
                        <li>
                            {
                                'Publier des produits de qualité : Se limiter à des'
                            }
                            {
                                'articles en bon état et pertinents pour l’échange.'
                            }
                        </li>
                        <li>
                            {'Favoriser l’échange collectif : Participer'}
                            {'activement et positivement aux échanges.'}
                        </li>
                    </ul>
                </section>

                {/* Section 4 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {
                            '4. Limites et Conditions d’Utilisation de la Plateforme'
                        }
                    </h2>
                    <h3 className='mb-2 text-xl font-semibold text-gray-600'>
                        {'4.1 Limite de Publication'}
                    </h3>
                    <p className='justify justify leading-relaxed text-gray-600'>
                        {'L’Utilisateur peut publier un maximum de cinq (5)'}
                        {'articles simultanément sur la Plateforme.'}
                    </p>

                    <h3 className='mb-2 mt-4 text-xl font-semibold text-gray-600'>
                        {'4.2 Valeur Maximale de la Besace'}
                    </h3>
                    <p className='justify justify leading-relaxed text-gray-600'>
                        {
                            'La valeur totale des articles proposés pour le troc par\r'
                        }
                        {
                            'un Utilisateur ne doit pas excéder 200€ (150€ pour les\r'
                        }
                        {'Utilisateurs non-Premium).'}
                    </p>

                    <h3 className='mb-2 mt-4 text-xl font-semibold text-gray-600'>
                        {'4.3 Renouvellement des Annonces'}
                    </h3>
                    <p className='justify justify leading-relaxed text-gray-600'>
                        {'Les annonces ayant plus de six (6) mois sont\r'}
                        {
                            'automatiquement marquées pour renouvellement afin de\r'
                        }
                        {'maintenir un flux de produits récents.'}
                    </p>
                </section>

                {/* Section 5 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'5. Gestion des Échanges'}
                    </h2>
                    <h3 className='mb-2 text-xl font-semibold text-gray-600'>
                        {'5.1 Évaluation des Utilisateurs'}
                    </h3>
                    <p className='justify justify leading-relaxed text-gray-600'>
                        {
                            'Après chaque échange, une évaluation est demandée aux\r'
                        }
                        {
                            'Utilisateurs afin de maintenir la fiabilité des profils\r'
                        }
                        {'sur la Plateforme.'}
                    </p>

                    <h3 className='mb-2 mt-4 text-xl font-semibold text-gray-600'>
                        {'5.2 Contestation d’un Objet Non Conforme'}
                    </h3>
                    <p className='justify justify leading-relaxed text-gray-600'>
                        {'En cas de réception d’un objet non conforme,\r'}
                        {
                            'l’Utilisateur dispose de cinq (5) jours ouvrés pour\r'
                        }
                        {
                            'contester l’échange. La Plateforme pourra procéder à un\r'
                        }
                        {'prélèvement SEPA si nécessaire.'}
                    </p>
                </section>

                {/* Section 6 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {
                            '6. Résiliation et Interruption de l’Abonnement Premium'
                        }
                    </h2>
                    <p className='justify justify leading-relaxed text-gray-600'>
                        {
                            'Si un Utilisateur interrompt son abonnement Premium\r'
                        }
                        {'alors qu’il est redevable d’un montant dû à la\r'}
                        {
                            'Plateforme, il s’engage à payer la somme restante. Toute\r'
                        }
                        {'violation des présentes CGV pourra entraîner la\r'}
                        {
                            'suspension temporaire ou définitive de l’abonnement\r'
                        }
                        {
                            'Premium de l’Utilisateur, sans remboursement possible.'
                        }
                    </p>
                </section>

                {/* Section 7 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'7. Modifications des CGV'}
                    </h2>
                    <p className='justify justify leading-relaxed text-gray-600'>
                        {'La Plateforme se réserve le droit de modifier les\r'}
                        {
                            'présentes CGV à tout moment. Les modifications seront\r'
                        }
                        {
                            'communiquées aux Utilisateurs et entreront en vigueur\r'
                        }
                        {'dans un délai de sept (7) jours. En continuant à\r'}
                        {
                            'utiliser la Plateforme après ce délai, l’Utilisateur\r'
                        }
                        {'accepte les modifications.'}
                    </p>
                </section>

                {/* Section 8 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'8. Responsabilité de la Plateforme'}
                    </h2>
                    <p className='justify justify leading-relaxed text-gray-600'>
                        {'La Plateforme n’est en aucun cas responsable des\r'}
                        {'dommages indirects pouvant survenir du fait de\r'}
                        {
                            'l’utilisation du site ou de ses services. L’Utilisateur\r'
                        }
                        {'reconnaît que la Plateforme agit uniquement comme\r'}
                        {
                            'intermédiaire dans les échanges et que toute transaction\r'
                        }
                        {'s’effectue sous sa propre responsabilité.'}
                    </p>
                </section>

                {/* Section 9 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'9. Données Personnelles'}
                    </h2>
                    <p className='justify justify leading-relaxed text-gray-600'>
                        {
                            'Les informations personnelles recueillies lors de la\r'
                        }
                        {
                            'création d’un compte sont traitées conformément à notre\r'
                        }
                        {
                            'Politique de Confidentialité. L’Utilisateur dispose d’un\r'
                        }
                        {
                            'droit d’accès, de modification, et de suppression de ses\r'
                        }
                        {'données personnelles en contactant le support.'}
                    </p>
                </section>

                {/* Section 10 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'10. Loi Applicable et Juridiction Compétente'}
                    </h2>
                    <p className='justify justify leading-relaxed text-gray-600'>
                        {
                            'Les présentes CGV sont soumises à la loi française. En\r'
                        }
                        {
                            'cas de litige, les parties conviennent de rechercher une\r'
                        }
                        {'solution amiable avant d’entamer toute procédure\r'}
                        {
                            'judiciaire. A défaut d’accord, les tribunaux compétents\r'
                        }
                        {
                            'de [Ville] seront seuls habilités à trancher le litige.'
                        }
                    </p>
                </section>

                {/* Conclusion */}
                <section className='mt-8 text-center'>
                    <p className='justify text-gray-600'>
                        {
                            'Merci de respecter les présentes conditions pour une\r'
                        }
                        {'expérience de troc optimale.'}
                    </p>
                </section>
            </div>
        </div>
    )
}
/* eslint-disable new-cap */
export default CGV
