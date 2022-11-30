import React, { useEffect, useState } from 'react'
import { Axios } from 'axios';
import { Game } from '../types/game';
import GameCard from './GameCard';
const axios: Axios = require('axios');

interface Props{
    companyId:string | string[] | undefined
}

function GamesList({companyId:CompanyID}:Props) {
    const url = "http://localhost:3001"
    const [data, setData] = useState<Game[]>([])
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        axios.get(url + '/companies/'+CompanyID+'/games').then(function (response) {
            console.log(response.data)
            const games: Game[] = response.data.games
            setData(games)
        }).catch(function (error) {

            if (error.response == undefined) {
                setError("Internal Error");
                console.log(error);
                return;
            }

            if (error.response.status == 404) {
                setError("Not Found");
            }
            if (error.response.status == 400) {
                setError("Bad Request");
            }

        })
    }, [])

    return (
        <div className='w-full bg-white py-16 px-4'>
            <div className='max-w-[1240px] flext items-center justify-center mx-auto'>
                <div className='grid lg:grid-cols-3 gap-x-1 gap-y-1 pl-4 items-center justify-center   md:grid-cols-2 sm:grid-cols-1'>
                    {!error && data.map(oneGame => (
                        <GameCard game={oneGame} key={oneGame.id} />
                    ))}
                </div>
                {error && <p className='text-[#00df9a] font-bold text-center text-xl'>{error}</p>}
                {data.length == 0 && <p className='text-[#00df9a] font-bold text-center text-xl'>Nothing was found</p>}
            </div>
        </div>
    )
}

export default GamesList