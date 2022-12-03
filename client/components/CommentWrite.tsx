import React, { Dispatch, SetStateAction, useState } from 'react'
import { PostReview, Review } from '../types/review'
import { Axios } from 'axios';
import { Rating } from 'react-simple-star-rating'
const axios: Axios = require('axios');
const jwt = require("jsonwebtoken");
import moment from "moment"

interface Props {
    gameId: string | string[] | undefined,
    companyId: string | string[] | undefined,
    visible: boolean,
    onClose: () => void,
    setReviews: Dispatch<SetStateAction<Review[] | undefined>>
    setNewRating: Dispatch<SetStateAction<number>>
}

function CommentWrite({ visible, onClose, setReviews, gameId, companyId,setNewRating }: Props) {
    const [ratingNumb, setRating] = useState(0)
    const url = "http://localhost:3001"
    const [review, setReview] = useState('')
    const handleRating = (rate: number) => {
        setRating(rate)
    }    
    const handeOnClose = (e: any) => {
        if (e.target.id === "container") onClose();
    }
    if (!visible) return null;

    const postReview = async () => {

        const postReview: PostReview = {
            comment:review,
            rating:ratingNumb,
            postDate:moment(Date.now()).format('YYYY-MM-DD')
        }
        const token = JSON.parse(localStorage.getItem("token") || "false")

        axios.defaults.headers.post['Authorization'] = `Bearer ${token.token}`;

        axios.post(url + '/companies/'+companyId+'/games/'+gameId+'/reviews', postReview).then(function (response) {
            console.log(response.data)
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



    const calculateRate = async (data: Review[]) => {
        let sum = 0;
        data?.forEach(element => {
            sum += element.rating;
        });
        if (data != undefined) {
            const newRate = sum / data?.length
            setNewRating(newRate);
        }

        if (data?.length == 0) {
            setNewRating(0)
        }
    }


    const refreshGameReviews = async () => {
        await axios.get(url + '/companies' + '/' + companyId + '/' + 'games/' + gameId + '/reviews').then(function (response) {
            const reviews: Review[] = response.data.reviews
            
            setReviews(reviews)
            if (response.data.reviews) {
                calculateRate(response.data.reviews)
            }
        }).catch(function (error) {
            console.log(error)
        })
    }




    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onClose();
        refreshGameReviews();
        postReview();
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