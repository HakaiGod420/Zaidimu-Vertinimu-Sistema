import React from 'react'
import { Company } from '../types/company'
import moment from "moment"

interface Props{
    company : Company
}



export default function CompanyCard({company:CompanyProp}:Props) {
    const NewDate = moment(CompanyProp.creationDate).format('YYYY-MM-DD')
    return (
        <div>

            <button
                className="p-8 border border-gray-200 rounded bg-white w-64 hover:bg-gray-50 hover:border-b-4 hover:border-[#00df9a] active:bg-gray-100" >
                <div className="flex justify-center items-center text-gray-500">
                    <img src={CompanyProp.image} alt='' className=' h-16 w-16'></img>
                </div>
                <div className="text-center mt-4">
                    <h1 className="font-bold text-gray-700 text">{CompanyProp.name}</h1>
                    <p className="text-500 text-sm mt-4">
                        Company was created at {NewDate.toString()}
                    </p>
                </div>
            </button>
            
        </div>
    )
}
