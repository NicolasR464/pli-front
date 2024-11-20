import React from 'react'
import Link from 'next/link'

type SubNavigationProps = {
    categories: Record<string, { tag: string }>
}

const SubNavigation: React.FC<SubNavigationProps> = ({ categories }) => {
    const sortedCategories = Object.keys(categories).sort((a, b) =>
        categories[a].tag.localeCompare(categories[b].tag),
    )

    return (
        <div className='hidden-below-1399 hidden justify-between border-t border-blueGreen-dark bg-white p-2 xl:flex'>
            {sortedCategories.map((categoryKey) => (
                <Link
                    key={categoryKey}
                    href={`/articles?category=${encodeURIComponent(categoryKey)}`}
                    className='whitespace-nowrap text-blueGreen-dark-active hover:underline text-text-4'
                >
                    {categories[categoryKey].tag}
                </Link>
            ))}
        </div>
    )
}

export default SubNavigation
