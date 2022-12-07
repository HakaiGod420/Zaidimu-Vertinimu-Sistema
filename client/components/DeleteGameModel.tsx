import React, { Dispatch, SetStateAction, useState } from 'react'
import { Axios } from 'axios';
import { Company } from '../types/company';
const axios: Axios = require('axios');

interface Props {
    companyId : number | undefined
    gameId: number | undefined
    visible: boolean,
    onClose: () => void,
    refreshGameAfterDelete : () => Promise<void>
}
function DeleteGameModel({companyId,gameId, visible, onClose,refreshGameAfterDelete }: Props) {
    const url = "http://localhost:3001"

    const deleteGame = async () => {
        const token = JSON.parse(localStorage.getItem("token") || "false")

        axios.defaults.headers.delete['Authorization'] = `Bearer ${token.token}`;

        axios.delete(url + '/companies/'+companyId+'/games/'+gameId).then(function (response) {
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

    const handleDelete = async (e: any) => {
        onClose()
        await deleteGame()
        //setCompanies(companies)
        refreshGameAfterDelete()
    }
    if (!visible) return null;

    return (
        <div onClick={handeOnClose} id="container" className="fixed  inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center">
            <div className="relative w-full h-full max-w-md md:h-auto flex  items-center">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={onClose} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                        <button onClick={handleDelete} data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Yes, I'm sure
                        </button>
                        <button onClick={onClose} data-modal-toggle="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DeleteGameModel