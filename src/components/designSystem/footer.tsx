import Link from 'next/link'

const Footer: React.FC = () => {
    const routes = ['Accueil', 'Produits', 'À propos', 'Contact']

    return (
        <footer className='bg-blueGreen-light py-8'>
            <div className='container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4'>
                {/* Section 1 : Informations */}
                <div>
                    <h3 className='mb-4 font-heading text-lg text-blueGreen-dark'>
                        {'Information'}
                    </h3>
                    <ul className='space-y-2'>
                        <li>
                            <Link
                                href='/about'
                                className='font-body text-grey-dark hover:underline'
                            >
                                {'À propos'}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/contact'
                                className='font-body text-grey-dark hover:underline'
                            >
                                {'Contact'}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/terms'
                                className='font-body text-grey-dark hover:underline'
                            >
                                {'Conditions générales'}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Section 2 : Produits */}
                <div>
                    <h3 className='mb-4 font-heading text-lg text-blueGreen-dark'>
                        {'Produits'}
                    </h3>
                    <ul className='space-y-2'>
                        {routes.map((route, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <li key={index}>
                                <Link
                                    href={`/products?category=${route}`}
                                    className='font-body text-grey-dark hover:underline'
                                >
                                    {route}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Section 3 : Support */}
                <div>
                    <h3 className='mb-4 font-heading text-lg text-blueGreen-dark'>
                        {'Support'}
                    </h3>
                    <ul className='space-y-2'>
                        <li>
                            <Link
                                href='/faq'
                                className='font-body text-grey-dark hover:underline'
                            >
                                {'FAQ'}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/shipping'
                                className='font-body text-grey-dark hover:underline'
                            >
                                {'Livraison'}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/returns'
                                className='font-body text-grey-dark hover:underline'
                            >
                                {'Retours'}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Section 4 : Réseaux sociaux */}
                <div>
                    <h3 className='mb-4 font-heading text-lg text-blueGreen-dark'>
                        {'Suivez-nous'}
                    </h3>
                    <ul className='space-y-2'>
                        <li>
                            <Link
                                href='https://facebook.com'
                                className='font-body text-grey-dark hover:underline'
                            >
                                {'Facebook'}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='https://twitter.com'
                                className='font-body text-grey-dark hover:underline'
                            >
                                {'Twitter'}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='https://instagram.com'
                                className='font-body text-grey-dark hover:underline'
                            >
                                {'Instagram'}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className='container mx-auto mt-8 text-center text-sm text-grey-dark'>
                {'© 2024 Trocup.'}
            </div>
        </footer>
    )
}

export default Footer
