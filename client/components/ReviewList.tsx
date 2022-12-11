import React, { useState } from 'react'
import { Review } from '../types/review'
import ReviewElement from './ReviewElement'


interface Props {
    reviewList: Review[] | undefined,
    companyId : string | string[] | undefined
    refreshReviewList : () => Promise<void>
}

function ReviewList({ reviewList: ReviewList, companyId,refreshReviewList }: Props) {

    return (
        <div className='mt-4 border-2 rounded-lg shadow-sm  shadow-[#1c9e75] border-[#00df9a] p-2 '>
            <div className='grid lg:grid-cols-3 gap-x-1 gap-y-1 pl-4 items-center justify-center   md:grid-cols-2 sm:grid-cols-1'>
            {ReviewList?.map(oneReview => (
                <ReviewElement refreshReviewList={refreshReviewList} companyId={companyId} review={oneReview} key={oneReview.id} />
            ))}
            
            </div>
        </div>
    )
}

export default ReviewList