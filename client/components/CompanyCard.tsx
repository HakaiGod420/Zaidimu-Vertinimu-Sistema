import React from 'react'
import { Company } from '../types/company'
import moment from "moment"
import Link from 'next/link'

interface Props{
    company : Company
}



export default function CompanyCard({company:CompanyProp}:Props) {
    const NewDate = moment(CompanyProp.creationDate).format('YYYY-MM-DD')
    return (
        <div className='flex items-center space place-content-around'>
            <Link href={"companies/"+CompanyProp.id.toString()}>
            <button
                className="p-8 border border-gray-200 rounded bg-white w-[320px] lg:w-[320px] md:w-[320px] hover:bg-gray-50 hover:border-b-4 hover:border-[#00df9a] active:bg-gray-100" >
                <div className="flex justify-center items-center text-gray-500">
                    <img src={CompanyProp.image} alt='' className=' h-16 w-17'></img>
                </div>
                <div className="text-center mt-4">
                    <h1 className="font-bold text-gray-700 text">{CompanyProp.name}</h1>
                    <p className="text-500 text-sm mt-4">
                        Company was created at {NewDate.toString()}
                    </p>
                </div>
            </button>
            </Link> 
        </div>
    )
}
