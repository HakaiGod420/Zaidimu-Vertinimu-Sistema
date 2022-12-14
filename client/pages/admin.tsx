import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { CheckJWTIsAdmin } from '../midlewear/checkIfTokenAdmin'

function admin() {

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
            <Navbar />
            {access ?
                <div className='w-full bg-white py-16 px-4 text-center'>
                    <h1 className=' mb-5 font-bold text-[25px]'>Admin Control Panel</h1>
                    <div className='flex justify-center'>
                        <div className=' grid md:grid-cols-1 md:gap-2 gap-y-6 grid-cols-1'>
                            <div>
                                <Link href={'/admin/companiescp'} >
                                    <button className='bg-[#00df9a] w-[250px] rounded-md font-medium py-2 my-[-20px] text-black'>"Companies" Control</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div> : <div className='w-full bg-white py-16 px-4 text-center'><h1 className=' mb-5 font-bold text-[50px]'>YOU CAN'T ACCESS THIS PAGE</h1><p className='text-[50px] font-bold'>401</p></div>
            }
            <Footer />
        </div>
    )
}

export default admin

function refreshCompanies() {
    throw new Error('Function not implemented.')
}
