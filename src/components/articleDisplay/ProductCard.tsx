import { Card, CardContent, CardFooter } from '@/components/shadcn/ui/card'

type Product = {
    id: number
    title: string
}

type ProductCardProps = {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
    <Card
        key={product.id}
        className='text-center'
    >
        <CardContent>
            <p className='text-sm font-medium'>{product.title}</p>
        </CardContent>
        <CardFooter className='flex justify-center'>
            <button className='text-gray-500'>
                <svg
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                    />
                </svg>
            </button>
        </CardFooter>
    </Card>
)

export default ProductCard
