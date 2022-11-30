import React from 'react'
import { Review } from '../types/review'

interface Props{
    review : Review
}

function ReviewElement({review: Review}:Props) {
  return (
    <div>Review</div>
  )
}

export default ReviewElement