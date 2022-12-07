import React, { useEffect, useState } from 'react'
import moment from "moment"
import { Axios } from 'axios';
const axios: Axios = require('axios');
import {
  AiOutlineEdit
} from 'react-icons/ai';


import {
  BsArrowRightCircle
} from 'react-icons/bs';

import {
  MdDeleteOutline
} from 'react-icons/md';

import Link from 'next/link';
import { Game } from '../types/game';
import { Company } from '../types/company';
import DeleteGameModel from './DeleteGameModel';
import CreateGameModel from './CreateGameModel';
import UpdateGameModel from './UpdateGameModel';

interface Props {
  companyId: string | string[] | undefined
}
function GamesControl({ companyId }: Props) {
  const url = "http://localhost:3001"
  const [data, setData] = useState<Game[]>([])
  const [company, setCompany] = useState<Company>()
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<number>();
  const [deleteModelVisibility, setDeleteModelVisibility] = useState<boolean>(false)
  const [createModeVisibility, setCreateModeVisibility] = useState<boolean>(false)
  const [updateModeVisibility, setUpdateModeVisibility] = useState<boolean>(false)

  const emptyGame:Game ={
    name: '',
    releaseDate: new Date("0000-01-01"),
    thumbnail: '',
    id: -1,
    summary: '',
    startingPrice: 0,
    howManyRated: 0,
    company: {
      id:-1
    }
  }

  const [selectedGame, setSelectedGame] = useState<Game>(emptyGame);
  const refreshGames = async () => {
    await axios.get(url + '/companies/' + companyId + '/games').then(function (response) {
      const games: Game[] = response.data.games
      console.log(games)
      setData(games)
      return
    }).catch(function (error) {

      if (error.response == undefined) {
        setError("Internal Error");
        console.log(error);
        return;
      }

    })
  }

  const getCompany = async () => {
    await axios.get(url + '/companies/'+companyId).then(function (response) {
        const company: Company = response.data.data
        console.log(company)
        setCompany(company)
        return
    }).catch(function (error) {

        if (error.response == undefined) {
            setError("Internal Error");
            console.log(error);
            return;
        }

    })
}



const handleDeleteModel = (id:number) => { 
  setSelectedId(id);
  setDeleteModelVisibility(true); 
}
const handleOnCloseDelete = () => {
  setDeleteModelVisibility(false)
  setSelectedId(undefined)
}

const handleOpenCreation = () => {
  setCreateModeVisibility(true)
}

const handleCloseCreation = () => {
  setCreateModeVisibility(false)
}

const handleUpdateModel = (game:Game) => { 
  setSelectedGame(game);
  setUpdateModeVisibility(true); 
}
const handleOnUpdateClose = () => {
  setUpdateModeVisibility(false)
}


  useEffect(() => {
    getCompany();
    refreshGames();
  }, [])
  return (
    <div>
      <div className='w-full  bg-white py-16 px-4 justify-center'>
        <div className='max-w-[1240px] mx-auto'>

          <div className=' grid grid-cols-2 justify-items-end items-center align-middle'>
            <div className='text-center justify-start mb-3 text-green-500 font-bold  text-[27px]'>
              <h1 className=' uppercase'>GAMES LIST OF {company?.name} COMPANY</h1>
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
                    Game Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Release Date
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Summary
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Starting Price
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
                </tr>
              </thead>
              <tbody>
                {data.map(oneGame => (
                  <tr key={oneGame.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {oneGame.name}
                    </th>
                    <td className="py-4 px-6">
                      {moment(oneGame.releaseDate).format('YYYY-MM-DD')}
                    </td>
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {oneGame.summary.substring(0, 30)}...
                    </th>
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {oneGame.startingPrice}
                    </th>
                    <td className="py-4 px-6">
                      <img src={oneGame.thumbnail} alt='' className=' h-16 w-16 object-scale-down'></img>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><AiOutlineEdit onClick={()=>handleUpdateModel(oneGame)} className='w-5 h-5 cursor-pointer' /></a>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><MdDeleteOutline onClick={()=>handleDeleteModel(oneGame.id)} className='w-5 h-5 cursor-pointer' /></a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {deleteModelVisibility && (<DeleteGameModel refreshGameAfterDelete={()=>refreshGames()} companyId={company?.id} gameId={selectedId} visible={deleteModelVisibility} onClose={handleOnCloseDelete} />)}
      {createModeVisibility && (<CreateGameModel companyId={company?.id} companyName={company?.name} refreshGamesAfterCreate={()=>refreshGames()}  visible={createModeVisibility} onClose={handleCloseCreation} />)}
      {updateModeVisibility && (<UpdateGameModel companyId={company?.id} companyName={company?.name} gameData={selectedGame} refreshGamesAfterCreate={()=>refreshGames()}  visible={updateModeVisibility} onClose={handleOnUpdateClose} />)}

    </div>
  )
}
export default GamesControl