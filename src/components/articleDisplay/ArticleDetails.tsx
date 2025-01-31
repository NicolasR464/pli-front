import React from 'react'

type ArticleDetailsProps = {
    dimensions: {
        length?: number
        width?: number
        height?: number
        weight?: number
    }
}

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ dimensions }) => (
    <div className='mt-4'>
        <p>
            <h2 className='text-2xl font-bold'>{'Dimensions :'}</h2>
        </p>
        <ul className='mt-2 list-inside list-disc'>
            <li>{`Longueur : ${dimensions.length} cm`}</li>
            <li>{`Largeur : ${dimensions.width} cm`}</li>
            <li>{`Hauteur : ${dimensions.height} cm`}</li>
            <li>{`Poids : ${dimensions.weight} kg`}</li>
        </ul>
    </div>
)

export default ArticleDetails
