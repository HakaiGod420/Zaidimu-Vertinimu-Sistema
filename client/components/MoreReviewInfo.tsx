import React from 'react'
import { Rating } from 'react-simple-star-rating';
import { Review } from '../types/review'
import moment from "moment"
import {
    MdDeleteOutline
} from 'react-icons/md';

import {
    AiOutlineEdit
} from 'react-icons/ai';
interface Props {
    review: Review,
    visible: boolean,
    onClose: () => void,
}


function MoreReviewInfo({ review, visible, onClose }: Props) {
    const handeOnClose = (e: any) => {
        if (e.target.id === "container") onClose();
    }
    const NewDate = moment(review.postDate).format('YYYY-MM-DD')

    return (
        <div onClick={handeOnClose} id="container" className=" inherint z-20 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="relative w-full h-full max-w-3xl md:h-auto flex items-center justify-center">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 min-w-[580px]  ">
                    <button onClick={onClose} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <Rating className='inherint' SVGclassName="inline-block" iconsCount={5} size={25} allowFraction={false} readonly={true} initialValue={review.rating} />
                        <p className='text-white'>{review.rating}/5</p>
                        <div className='border-t-2 border-gray-400'></div>
                        <div className='border-b-2 border-gray-400 grid grid-cols-2 gap-1 text-gray-500 dark:text-gray-400'>
                            <div>Posted by {review.user.username}</div>
                            {
                                //@ts-ignore
                                <div>Posted at {NewDate}</div>
                            }
                        </div>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{review.comment}</h3>
                    </div>
                    <div className='border-t-2 border-gray-400 grid grid-cols-2 gap-1 text-gray-500 dark:text-gray-400'>
                        <div className='text-blue-600 text-[25px] flex flex-wrap items-center content-center justify-center'><AiOutlineEdit /> Edit</div>
                        <div className='text-blue-600 text-[25px] flex flex-wrap items-center content-center justify-center'><MdDeleteOutline/> Delete</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreReviewInfo