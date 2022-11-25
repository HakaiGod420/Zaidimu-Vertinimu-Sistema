import Link from 'next/link'
import React from 'react'
import Typed from 'react-typed'

export default function Hero() {
  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>EVERYDAY WE UPDATE WITH NEW GAMES</p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>RATE AND REVIEW YOUR FAVORITE GAME</h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-4xl sm:text-3xl text-xl font-bold py-4'>Rate, read comments of  </p>
          <Typed className='md:text-4xl sm:text-3xl text-xl font-bold pl-2 text-gray-500 md:pl-4' strings={['Fallout 4', 'Devil May Cry', 'Grand Theft Auto 5']} typeSpeed={120} backSpeed={140} loop />
        </div>
        <Link href={'./login'}>
          <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Sign In</button>
        </Link>
      </div>
    </div>
  )
}
