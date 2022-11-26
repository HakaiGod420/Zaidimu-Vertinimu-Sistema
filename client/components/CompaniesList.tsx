import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import CompanyCard from './CompanyCard';
import { Company } from '../types/company';
import { Axios } from 'axios';
const axios: Axios = require('axios');


export default function CompaniesList() {

    const url = "http://localhost:3001"
    const [data, setData] = useState<Company[]>([])
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(url + '/companies').then(function (response) {
            const companies: Company[] = response.data.companies
            setData(companies)
        }).catch(function (error) {

            if (error.response == undefined) {
                setError("Internal Error");
                console.log(error);
                return;
            }

        })
    }, [])

    return (
        <div className='w-full bg-white py-16 px-4'>
            <div className='max-w-[1240px] flext items-center justify-center mx-auto pl-9'>

                <div className='grid lg:grid-cols-3 gap-x-4 gap-y-3 pl-4 items-center justify-center   md:grid-cols-2 sm:grid-cols-1'>
                    {data.map(oneCompany => (
                        <CompanyCard company={oneCompany} key={oneCompany.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}
