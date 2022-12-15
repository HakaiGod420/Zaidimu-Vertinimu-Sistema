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
            <div className='grid lg:grid-cols-3 gap-x-1 gap-y-1 items-center justify-center   md:grid-cols-2 sm:grid-cols-1'>
            {ReviewList?.map(oneReview => (
                <ReviewElement refreshReviewList={refreshReviewList} companyId={companyId} review={oneReview} key={oneReview.id} />
            ))}

            {ReviewList?.length == 0 ? <p className='text-[25px] text-center col-span-2 text-[#1c9e75] md:col-span-3'>Was not found</p>:null}
            
            </div>
        </div>
    )
}

export default ReviewList