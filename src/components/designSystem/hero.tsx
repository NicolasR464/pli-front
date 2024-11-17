import React from 'react'
import Image from 'next/image'

const Hero: React.FC = () => {
    return (
        <section className='relative bg-blueGreen-light'>
            {/* Image de fond */}
            <Image
                src='https://res.cloudinary.com/ddtptgbnn/image/upload/v1729613788/Home_2_fs4jqd.png'
                alt='Hero Background'
                className='h-full w-full object-cover'
                width={3_000}
                height={300}
            />
        </section>
    )
}

export default Hero
