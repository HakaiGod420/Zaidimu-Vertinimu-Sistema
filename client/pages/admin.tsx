import Link from 'next/link'
import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function admin() {
    return (
        <div>
            <Navbar />
            <div className='w-full bg-white py-16 px-4 text-center'>
                <h1 className=' mb-5 font-bold text-[25px]'>Admin Control Panel</h1>
                <div className='flex justify-center'>
                    <div className=' grid md:grid-cols-3 md:gap-2 gap-y-6 grid-cols-1'>
                        <div>
                            <Link href={'/admin/companiescp'} >
                                <button className='bg-[#00df9a] w-[250px] rounded-md font-medium py-2 my-[-20px] text-black'>"Companies" Control</button>
                            </Link>
                        </div>
                        <div><button className='bg-[#00df9a] w-[250px] rounded-md font-medium py-2 my-[-20px] text-black'>"Games" Control</button></div>
                        <div><button className='bg-[#00df9a] w-[250px] rounded-md font-medium py-2 my-[-20px] text-black'>"Reviews" Control</button></div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default admin