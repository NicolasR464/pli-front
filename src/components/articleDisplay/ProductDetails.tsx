import { deliveryTypes, productStates } from '@/utils/constants/productValues'
import { formatDate } from '@/utils/functions/dates'

import type { Article } from '@/types/article'

type ProductInfoProps = {
    article: Article
}

const ProductDetails: React.FC<ProductInfoProps> = ({ article }) => {
    // Utilisation des correspondances pour les valeurs de livraison et état
    const deliveryTranslation =
        deliveryTypes[article.deliveryType] || article.deliveryType
    const stateTranslation = productStates[article.state] || article.state

    return (
        <div className='text-gray-700'>
            {!!article.manufactureDate && (
                <p>
                    <strong>{'Année : '}</strong>
                    {formatDate(article.manufactureDate)}
                </p>
            )}
            <p>
                <strong>{'État : '}</strong>
                {stateTranslation}
            </p>
            {!!article.brand && (
                <p>
                    <strong>{'Marque : '}</strong>
                    {article.brand}
                </p>
            )}
            {!article.brand && <p>{'Pas de marque précisée'}</p>}
            <strong className='mt-2'>
                {'Livraison : '}
                {deliveryTranslation}
            </strong>
        </div>
    )
}

export default ProductDetails
