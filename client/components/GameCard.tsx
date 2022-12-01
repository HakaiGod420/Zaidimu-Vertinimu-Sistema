import Link from 'next/link'
import React from 'react'
import { Game } from '../types/game'

interface Props {
    game: Game
}

function GameCard({ game: SelectedGame }: Props) {
    return (
        <div>
            <Link href={"/games/" + SelectedGame.company.id.toString() + "/" + SelectedGame.id}>
                <button
                    className="p-8 border border-gray-200 rounded bg-white min-w-full min-h-full hover:bg-gray-50 hover:border-b-4 hover:border-[#00df9a] active:bg-gray-100" >
                    <div className="flex justify-center items-center text-gray-500">
                        <img src={SelectedGame.thumbnail} alt='' className=' h-25 w-25'></img>
                    </div>
                    <div className="text-center mt-4 min-h-[200px]">
                        <h1 className="font-bold text-gray-700 text">{SelectedGame.name}</h1>
                        <p className=" text-500 text-sm mt-4">
                            {SelectedGame.summary}
                        </p>
                    </div>
                </button>
            </Link>
        </div>
    )
}

export default GameCard