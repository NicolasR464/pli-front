import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { pagePaths } from '@/utils/constants'

import { Button } from '../shadcn/ui/button'

const Hero: React.FC = () => {
    return (
        <section className='relative bg-blueGreen-light'>
            {/* Image de fond */}
            <Image
                src='https://res.cloudinary.com/ddtptgbnn/image/upload/v1729613788/Home_2_fs4jqd.png'
                alt='Hero Background'
                className='h-full w-full'
                width='3000'
                height='300'
            />
            <div className='container mx-auto px-6 lg:px-8'>
                <div className='flex flex-col items-center text-center'>
                    {/* Call to Action */}
                    <div className='mt-8'>
                        <Link href={pagePaths.ARTICLES}>
                            <Button className='rounded-md bg-blueGreen px-6 py-3 text-lg font-semibold text-white hover:bg-blueGreen-hover'>
                                {'Voir la Piscine'}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
