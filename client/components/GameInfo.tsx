import React, { useEffect, useState } from 'react'
import { Game } from '../types/game'
import { Axios } from 'axios';
import { Review } from '../types/review';
import Image from 'next/image';
import {
    AiFillStar
} from 'react-icons/ai';
import ReviewList from './ReviewList';
import { CheckJWTAndSession } from '../midlewear/checkSessionJwt';
import CommentWrite from './CommentWrite';
import MoreReviewInfo from './MoreReviewInfo';
const axios: Axios = require('axios');

interface Props {
    companyId: string | string[] | undefined
    gameId: string | string[] | undefined
}

function GameInfo({ companyId: CompanyId, gameId: GameId }: Props) {

    const url = "http://localhost:3001"
    const [data, setData] = useState<Game>()
    const [dataReview, setDataReview] = useState<Review[]>()
    const [customErr, setError] = useState('');
    const [rate, setRate] = useState<number>(0);

    const [tokenValid, setTokenValidation] = useState<boolean | undefined>(false);
    const [writeCommentVisibility, setWriteCommentVisibility] = useState<boolean>(false)
    const handleOnClose = () => setWriteCommentVisibility(false)



    useEffect(() => {
        const validateToken = async () => {
            const check = await CheckJWTAndSession();
            setTokenValidation(check)
        }
        validateToken();
    }, [])
    


    useEffect(() => {
        const setGetGameRequest = async () => {
            await axios.get(url + '/companies' + '/' + CompanyId + '/' + 'games/' + GameId).then(function (response) {
                const game: Game = response.data.data
                setData(game)
            }).catch(function (error) {

                if (error.response == undefined) {
                    setError("Internal Error");

                    return;
                }

                if (error.response.status == 404) {
                    setError("Not Found");

                    return;
                }
            })
        }
        setGetGameRequest()

    }, [])

    




    const calculateRate = async (data: Review[]) => {
        let sum = 0;
        data?.forEach(element => {
            sum += element.rating;
        });
        if (data != undefined) {
            const newRate = sum / data?.length
            setRate(newRate);
        }

        if (data?.length == 0) {
            setRate(0)
        }
    }


    const refreshGameReviews = async () => {
        await axios.get(url + '/companies' + '/' + CompanyId + '/' + 'games/' + GameId + '/reviews').then(function (response) {
            const reviews: Review[] = response.data.reviews

            setDataReview(reviews)
            if (response.data.reviews) {
                calculateRate(response.data.reviews)
            }
        }).catch(function (error) {

            if (error.response == undefined) {
                setError("Internal Error");

                return;
            }

            if (error.response.status == 404) {
                setError("Not Found");

                return;
            }
        })
    }

    useEffect(() => {
        refreshGameReviews()
    }, [])



    
    return (

        <div className='w-full bg-white py-16 px-4'>
            <div className='max-w-[1200px] mx-auto'>
                <div className=' border-2 rounded-lg shadow-sm  shadow-[#1c9e75] border-[#00df9a] grid md:grid-cols-2 md:h-auto sm:grid-row-3 sm:grid-cols-2 '>
                    <div className='flex flex-col justify-around'>
                        <img className="object-cover h-auto w-auto mx-auto p-4" src={data?.thumbnail} alt='' />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <p className='text-[#00df9a] font-bold uppercase '>{data?.name}</p>
                        <p className=''>{data?.summary}</p>
                        <div className=''>
                            {<h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 justify-center items-center'><span className='float-left'>Overall Rating: </span> {Math.round(rate * 10) / 10}/5</h1>}
                        </div>
                    </div>{tokenValid?
                    <div className='col-span-2 content-center flex flex-col justify-around h-24'>
                        <button onClick={() => setWriteCommentVisibility(!writeCommentVisibility)} className=' bg-[#00df9a] h-full rounded-md font-medium text-black '>Write Review</button>
                    </div>:null}
                </div>
                <ReviewList refreshReviewList={refreshGameReviews} companyId={CompanyId} reviewList={dataReview} />
            </div>
            {writeCommentVisibility && (
                <CommentWrite gameId={GameId} companyId={CompanyId} visible={writeCommentVisibility} onClose={handleOnClose} refreshReviewsOfGame={()=>refreshGameReviews()}/>
            )}
            
        </div>
    )
}

export default GameInfo