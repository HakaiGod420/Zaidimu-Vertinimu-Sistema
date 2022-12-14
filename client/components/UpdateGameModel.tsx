import React, { Dispatch, SetStateAction, useState } from 'react'
import { Axios } from 'axios';
import { Company, CreateCompany } from '../types/company';
import { CreateGame, Game } from '../types/game';
const axios: Axios = require('axios');
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { URL_API } from '../exports';

interface Props {
    companyName:string|undefined
    companyId:number | undefined,
    gameData : Game,
    visible: boolean,
    onClose: () => void,
    refreshGamesAfterCreate : () => Promise<void>
}
function UpdateGameModel({companyName,companyId,visible, onClose,refreshGamesAfterCreate,gameData }: Props) {
    const url = URL_API

    const [newName, SetName] = useState(gameData.name)
    const [newSummary, setSummary] = useState(gameData.summary)
    const [newReleaseDate, SetReleaseDate] = useState(moment(gameData.releaseDate).format('YYYY-MM-DD'))
    const [newStartingPrice, setStartingPrice] = useState<number>(gameData.startingPrice)
    const [imageLink, SetImageLink] = useState(gameData.thumbnail)


    const updateGame = async () => {
        const loading = toast.loading('Updating game...')
        const newGame: CreateGame = {
            name:newName,
            summary:newSummary,
            releaseDate:newReleaseDate,
            startingPrice:newStartingPrice,
            thumbnail:imageLink
        }

        const token = JSON.parse(localStorage.getItem("token") || "false")

        axios.defaults.headers.put['Authorization'] = `Bearer ${token.token}`;

        await axios.put(url + '/companies/'+companyId+'/games/'+gameData.id,newGame).then(function (response) {
            toast.success('Game was updated!', {
                id: loading,
            })
        }).catch(function (error) {

            if (error.response == undefined) {
                toast.error('Error occurred', {
                    id: loading,
                })
                return;
            }
            // handle error
            if (error.response.status == 404) {
                toast.error('Error occurred', {
                    id: loading,
                })
                return
            }
            if (error.response.status == 400) {
                toast.error('Error occurred', {
                    id: loading,
                })
                return
            }
            if (error.response.status == 401) {
                toast.error('Error occurred',{
                    id:loading
                })
            }
            if (error.response.status == 403) {
                toast.error('Error occurred',{
                    id:loading
                })
            }
            if (error.response.status == 500) {
                toast.error('Error occurred',{
                    id:loading
                })
            }
        })
    }

    const handeOnClose = (e: any) => {
        if (e.target.id === "container") onClose();
    }

    const handelSubmit = async (e: any) => {
        onClose()
        await updateGame()
        refreshGamesAfterCreate()
    }
    if (!visible) return null;

    return (
        <div onClick={handeOnClose} id="container" className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <section className=" min-w-[50%] p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Create New Game For {companyName} Company</h2>
                <form onSubmit={handelSubmit}>
                    <div className="grid col-span-2 gap-6 mt-4">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="reviewText">Game Name</label>
                            <input value={newName} onChange={(e) => SetName(e.target.value)} id="name" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                    </div>
                    <div className="grid col-span-2 gap-6 mt-4">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="summary">Game Summary</label>
                            <textarea value={newSummary} onChange={(e) => setSummary(e.target.value)} id="summary" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                    </div>
                    <div className="grid col-span-2 gap-6 mt-4">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="reviewText">Release Date</label>
                            <input value={newReleaseDate}  type='date' onChange={(e) => SetReleaseDate(e.target.value)} id="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                    </div>
                    <div className="grid col-span-2 gap-6 mt-4">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="reviewText">Starting Price</label>
                            <input value={newStartingPrice} step="0.01" type='number' onChange={(e) => setStartingPrice(parseFloat(e.target.value))} id="statingPrice" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                    </div>
                    <div className="grid col-span-2 gap-6 mt-4">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="reviewText">Image Link</label>
                            <input value={imageLink} onChange={(e) => SetImageLink(e.target.value)} id="imgLink" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
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
export default UpdateGameModel