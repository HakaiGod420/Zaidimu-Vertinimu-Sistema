import React from 'react'
import { Review } from '../types/review'
import ReviewElement from './ReviewElement'


interface Props {
    reviewList: Review[] | undefined
}

function ReviewList({ reviewList: ReviewList }: Props) {
    console.log(ReviewList)
    return (
        <div>
            {ReviewList?.map(oneReview => (
                <ReviewElement review={oneReview} />
            ))}
        </div>
    )
}

export default ReviewList