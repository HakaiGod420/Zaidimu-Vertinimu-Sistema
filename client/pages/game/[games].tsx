import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'

import { GetStaticPaths, GetStaticProps } from 'next';



const Game= ( )=> {
  const router = useRouter()
  const { games } = router.query

  return (
    <div>
        <Navbar/>
        <p className='bg-white'>
        Post: {games}
        </p>
        <Footer/>
    </div>
  )
}
export default Game