import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'

import { GetStaticPaths, GetStaticProps } from 'next';
import GamesList from '../../components/GamesList';



const Company = () => {

  const [param1, setParam1]=useState<string | string[] | undefined>();
  const router = useRouter();
 
  useEffect(() => {
   if (router && router.query) {
    console.log(router.query);
    setParam1(router.query.companyId);
   }
  }, [router]);

  return (
    <div>
      <Navbar />
      {param1 && <GamesList companyId={param1} />}
      {!param1 && <p className='bg-white'>Loading</p>}
      <Footer />
    </div>
  )
}
export default Company