import React from 'react'
import CompanyImage from '../public/gameLogos.jpg'
import Image from 'next/image';
import Link from 'next/link';

export default function CompaniesShortInfo() {
    return (
        <div className='w-full bg-white py-16 px-4'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                <Image className="object-cover w-[350px] mx-auto my-4" src={CompanyImage} alt='' />
                <div className='flex flex-col justify-center'>
                    <p className='text-[#00df9a] font-bold uppercase '>YOUR FAVORITE GAME COMPANY ITS HERE</p>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Select your game company and view that they made</h1>
                    <p className=''>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id porro rerum culpa, reiciendis eum similique consequatur repudiandae inventore, illo ipsa vel. Possimus a iure delectus unde officiis numquam eum pariatur?</p>
                    <Link href='/companies'>
                        <button className='bg-black w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white md:mx-0'>Go To Companies</button>
                    </Link>.
                </div>
            </div>
        </div>
    )
}
