import React from 'react'
import { Review } from '../types/review'
import ReviewElement from './ReviewElement'


interface Props {
    reviewList: Review[] | undefined
}

function ReviewList({ reviewList: ReviewList }: Props) {
    console.log(ReviewList)
    return (
        <div className='mt-4 border-2 rounded-lg shadow-sm  shadow-[#1c9e75] border-[#00df9a] p-2 '>
            <div className='grid lg:grid-cols-3 gap-x-1 gap-y-1 pl-4 items-center justify-center   md:grid-cols-2 sm:grid-cols-1'>
            {ReviewList?.map(oneReview => (
                <ReviewElement review={oneReview} />
            ))}
            </div>

        </div>
    )
}

export default ReviewList