import React, { useEffect, useState } from 'react'

import { Company } from '../types/company';
import { Axios } from 'axios';
const axios: Axios = require('axios');
import moment from "moment"
import {
    AiOutlineEdit
} from 'react-icons/ai';


import {
    BsArrowRightCircle
} from 'react-icons/bs';

import {
    MdDeleteOutline
} from 'react-icons/md';
import DeleteCompanyModel from './DeleteCompanyModel';
import CreateCompanieModel from './CreateCompanieModel';
import UpdateCompaniesModel from './UpdateCompaniesModel';
import Link from 'next/link';
import { URL_API } from '../exports';

function CompaniesControl() {

    const emtyCompany:Company ={
        name: '',
        creationDate: new Date("0000-01-01"),
        image: '',
        id:-1
    }

    const url = URL_API
    const [data, setData] = useState<Company[]>([])
    const [error, setError] = useState('');
    const [selectedId, setSelectedId] = useState<number>();
    const [deleteModeVisibility, setDeleteModeVisibility] = useState<boolean>(false)
    const [createModeVisibility, setCreateModeVisibility] = useState<boolean>(false)
    const [updateModeVisibility, setUpdateModeVisibility] = useState<boolean>(false)
    const [selectedCompany, setSelectedCompany] = useState<Company>(emtyCompany);


    const refreshCompanies = async () => {
        await axios.get(url + '/companies').then(function (response) {
            const companies: Company[] = response.data.companies
            console.log(companies)
            setData(companies)
            return
        }).catch(function (error) {

            if (error.response == undefined) {
                setError("Internal Error");
                console.log(error);
                return;
            }

        })
    }

    useEffect(() => {
        refreshCompanies();
    }, [])


    const handleDeleteModel = (id:number) => { 
        setSelectedId(id);
        setDeleteModeVisibility(true); 
    }
    const handleOnClose = () => {
        setDeleteModeVisibility(false)
        setSelectedId(undefined)
    }

    const handleUpdateModel = (company:Company) => { 
        console.log('test')
        setSelectedCompany(company);
        setUpdateModeVisibility(true); 
    }
    const handleOnUpdateClose = () => {
        setUpdateModeVisibility(false)
    }

    const handleOpenCreation = () => {
        setCreateModeVisibility(true)
    }

    const handleCloseCreation = () => {
        setCreateModeVisibility(false)
    }

    return (
        <div>
            <div className='w-full bg-white py-16 px-4 flex justify-center'>
                <div className='max-w-[1240px] mx-auto'>

                    <div className=' grid grid-cols-2 justify-items-end align-middle items-centers'>
                        <div className='text-center mb-3 text-green-500 font-bold  text-[30px]'>
                            <h1 className=''>COMPANIES LIST</h1>
                        </div>
                        <div className=''>
                            <button onClick={()=>handleOpenCreation()} className='bg-green-500 w-[150px] rounded-md font-medium h-10 text-black mb-3'>Create</button>
                        </div>
                    </div>


                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">

                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Companies Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Creation Date
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Image
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        <span className="sr-only">Delete</span>
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        <span className="sr-only">Games</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(oneCompany => (
                                    <tr key={oneCompany.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th  scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {oneCompany.name}
                                        </th>
                                        <td className="py-4 px-6">
                                            {moment(oneCompany.creationDate).format('YYYY-MM-DD')}
                                        </td>
                                        <td className="py-4 px-6">
                                            <img src={oneCompany.image} alt='' className=' h-16 w-16 object-scale-down'></img>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><AiOutlineEdit onClick={()=>handleUpdateModel(oneCompany)} className='w-5 h-5 cursor-pointer' /></a>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <a  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><MdDeleteOutline onClick={()=>handleDeleteModel(oneCompany.id)} className='w-5 h-5 cursor-pointer' /></a>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <p  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><Link href={"/gamesedit/"+oneCompany.id}><BsArrowRightCircle  className='w-5 h-5 cursor-pointer' /></Link></p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {deleteModeVisibility && (<DeleteCompanyModel refreshCompaniesS={()=>refreshCompanies()} companyId={selectedId} visible={deleteModeVisibility} onClose={handleOnClose} />)}
            {createModeVisibility && (<CreateCompanieModel refreshCompaniesS={()=>refreshCompanies()}  visible={createModeVisibility} onClose={handleCloseCreation} />)}
            {updateModeVisibility && (<UpdateCompaniesModel company={selectedCompany} refreshCompaniesS={()=>refreshCompanies()}  visible={updateModeVisibility} onClose={handleOnUpdateClose} />)}
        </div>
    )
}

export default CompaniesControl