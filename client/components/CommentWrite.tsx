import React, { Dispatch, SetStateAction, useState } from 'react'
import { PostReview, Review } from '../types/review'
import { Rating } from 'react-simple-star-rating'
import { Axios } from 'axios';
const axios: Axios = require('axios');
const jwt = require("jsonwebtoken");
import moment from "moment"
import { toast } from 'react-hot-toast';
import { URL_API } from '../exports';

interface Props {
    gameId: string | string[] | undefined,
    companyId: string | string[] | undefined,
    visible: boolean,
    onClose: () => void,
    refreshReviewsOfGame : () => Promise<void>
}

function CommentWrite({ visible, onClose, gameId, companyId,refreshReviewsOfGame }: Props) {
    const [ratingNumb, setRating] = useState(0)
    const url = URL_API
    const [review, setReview] = useState('')
    const handleRating = (rate: number) => {
        setRating(rate)
    }    
    const handeOnClose = (e: any) => {
        if (e.target.id === "container") onClose();
    }
    if (!visible) return null;

    const postReview = async () => {

        const loading = toast.loading('Creating new review...')
        const postReview: PostReview = {
            comment:review,
            rating:ratingNumb,
            postDate:moment(Date.now()).format('YYYY-MM-DD')
        }
        const token = JSON.parse(localStorage.getItem("token") || "false")

        axios.defaults.headers.post['Authorization'] = `Bearer ${token.token}`;

        await axios.post(url + '/companies/'+companyId+'/games/'+gameId+'/reviews', postReview).then(function (response) {
            
        toast.success('Review was created!', {
            id: loading,
        })
        }).catch(function (error) {

            if (error.response == undefined) {
                toast.error('Error occurred',{
                    id:loading
                })
            }
            // handle error
            if (error.response.status == 404) {
                toast.error('Error occurred',{
                    id:loading
                })
            }
            if (error.response.status == 400) {
                toast.error('Error occurred',{
                    id:loading
                })
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

        await refreshReviewsOfGame()
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await postReview();
        
        onClose();
        setRating(0);
        setReview('');
        
        //setReviews();
        
    }


    return (
        <div onClick={handeOnClose} id="container" className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <section className=" min-w-[50%] p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Write your review About this game</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid col-span-2 gap-6 mt-4">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="reviewText">Review Text</label>
                            <textarea onChange={(e) => setReview(e.target.value)} id="review" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                    </div>

                    <div className="grid col-span-2 gap-6 mt-4">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="rate">Rating</label>
                            <p><Rating className='inherint' SVGclassName="inline-block" iconsCount={5} size={25} allowFraction={false} onClick={handleRating} /></p>
                        </div>
                    </div>

                    <div className="flex justify-start mt-6">
                        <button disabled={ratingNumb === 0 || review === ""} className=" disabled:bg-slate-400 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Submit</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default CommentWrite