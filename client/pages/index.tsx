import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {

  const [backendData,setBackendData] = useState({})

  useEffect(()=>
  {
    fetch("http://localhost:3306/orders").then(
      response=> response.json()
    ).then(data =>{
      setBackendData(data)
    })
  },[])

  console.log(backendData)
  return (
    <div>
      <div>
        <p className='p-5'>Test text</p>
      </div>
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <p className=' font-bold'>Hello world</p>
    </div>

    </div>

  )
}

export default Home
