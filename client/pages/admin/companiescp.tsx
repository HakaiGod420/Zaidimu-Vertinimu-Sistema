import React, { useEffect, useState } from 'react'
import CompaniesControl from '../../components/CompaniesControl'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { CheckJWTIsAdmin } from '../../midlewear/checkIfTokenAdmin';

function companiescp() {
  const [access, setAccess] = useState<boolean>(true);
  const checkFun = async () => {
      const check = CheckJWTIsAdmin();
      if (await check === false) {
          setAccess(false)
      }
  }

  useEffect(() => {
      checkFun()
  }, [])
  
  return (
    <div>
        <Navbar/>

        {access ?<CompaniesControl/> : <div className='w-full bg-white py-16 px-4 text-center'><h1 className=' mb-5 font-bold text-[50px]'>YOU CAN'T ACCESS THIS PAGE</h1><p className='text-[50px] font-bold'>401</p></div>}
        <Footer/>
    </div>
  )
}

export default companiescp