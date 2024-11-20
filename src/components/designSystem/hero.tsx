import React from 'react'
import Image from 'next/image'

const Hero: React.FC = () => {
    return (
        <section className='relative h-[300px] w-full sm:h-[400px] md:h-[500px] lg:h-[600px]'>
            <div>
                <Image
                    src='https://res.cloudinary.com/ddtptgbnn/image/upload/v1732098673/Home_3_joppks.png'
                    alt='Hero Background'
                    className='object-cover'
                    layout='fill'
                    priority
                />
                {/* Texte fixé en bas */}
                <div className='absolute bottom-5 left-0 right-0 flex flex-col items-center justify-center px-4 text-center text-white sm:px-6 md:px-8'>
                    <p className='mt-6 font-heading font-light drop-shadow-md sm:text-h6 md:text-h5 lg:text-h4'>
                        Plonge dans la Piscine & Commence ton troc
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Hero
