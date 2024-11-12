import { Article } from '@/types/article'
import { formatDate } from '@/utils/functions/dates'

interface ProductInfoProps {
    article: Article
}

const ProductDetails: React.FC<ProductInfoProps> = ({ article }) => (
    <div className='text-gray-700'>
        {article.manufactureDate && (
            <p>
                <strong>{'Année: '}</strong>
                {formatDate(article.manufactureDate)}
            </p>
        )}
        <p>
            <strong>{'État : '}</strong>
            {article.state}
        </p>
        {article.brand && (
            <p>
                <strong>{'Marque : '}</strong>
                {article.brand}
            </p>
        )}
        {!article.brand && <p>{'Pas de marque précisée'}</p>}
    </div>
)
export default ProductDetails
