import React, { Dispatch, SetStateAction, useState } from 'react'
import { Axios } from 'axios';
import { Company, CreateCompany } from '../types/company';
const axios: Axios = require('axios');

interface Props {
    visible: boolean,
    onClose: () => void,
    refreshCompaniesS : () => Promise<void>
}
function CreateCompanieModel({visible, onClose,refreshCompaniesS:refreshMainCompanies }: Props) {
    const url = "http://localhost:3001"

    const [newName, SetName] = useState('')
    const [newCreationDate, SetCreationDate] = useState('')
    const [imageLink, SetImageLink] = useState('')
    const [companies, setCompaniesInClass] = useState<Company[]>([])


    const postCompany = async () => {
        const newCompany: CreateCompany = {
            name:newName,
            creationDate:newCreationDate,
            image:imageLink
        }

        const token = JSON.parse(localStorage.getItem("token") || "false")

        console.log(token.token)

        axios.defaults.headers.post['Authorization'] = `Bearer ${token.token}`;

        axios.post(url + '/companies/',newCompany).then(function (response) {
        }).catch(function (error) {

            if (error.response == undefined) {
                return;
            }
            // handle error
            if (error.response.status == 404) {
                return
            }
            if (error.response.status == 400) {
                return
            }
        })
    }

    const handeOnClose = (e: any) => {
        if (e.target.id === "container") onClose();
    }

    const handelSubmit = async (e: any) => {
        onClose()
        await postCompany()
        refreshMainCompanies()
    }
    if (!visible) return null;

    return (
        <div onClick={handeOnClose} id="container" className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <section className=" min-w-[50%] p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Create New Company</h2>
                <form onSubmit={handelSubmit}>
                    <div className="grid col-span-2 gap-6 mt-4">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="reviewText">Companies Name</label>
                            <input onChange={(e) => SetName(e.target.value)} id="name" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                    </div>
                    <div className="grid col-span-2 gap-6 mt-4">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="reviewText">Creation Date</label>
                            <input  type='date' onChange={(e) => SetCreationDate(e.target.value)} id="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                    </div>
                    <div className="grid col-span-2 gap-6 mt-4">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="reviewText">Image Link</label>
                            <input onChange={(e) => SetImageLink(e.target.value)} id="imgLink" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                    </div>
                    <div className="flex justify-start mt-6">
                        <button  className=" disabled:bg-slate-400 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Submit</button>
                    </div>
                </form>
            </section>
        </div>
    )
}
export default CreateCompanieModel