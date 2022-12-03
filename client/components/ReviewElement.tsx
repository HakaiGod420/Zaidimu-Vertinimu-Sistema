import React from 'react'
import moment from "moment"
import { Review } from '../types/review'
import { Rating } from 'react-simple-star-rating'

interface Props {
  review: Review
}

function ReviewElement({ review: Review }: Props) {
  const NewDate = moment(Review.postDate).format('YYYY-MM-DD')
  return (
    <div>
      <button
        className="p-8 border border-gray-200 rounded bg-white min-w-full min-h-full hover:bg-gray-50 hover:border-b-4 hover:border-[#08aa76] active:bg-gray-100 hover:bg-gradient-to-r from-[#F2E7D5]">
        <div className="flex justify-center items-center text-gray-500">
          <div className='inherint z-0'>
            <Rating className='inherint' SVGclassName="inline-block" iconsCount={5} size={17} allowFraction={false} readonly={true} initialValue={Review.rating} />
            <p>{Review.rating}/5</p>
          </div>
        </div>
        <div className="text-center mt-4 min-h-[200px]">
          <p className=" text-500 text-sm mt-4 font-semibold">
            {Review.comment.substring(0, 250)}...
            <p className=' text-gray-600 pt-2'>Read More</p>
          </p>
        </div>
        <div className='border-t-2 border-[#393E46]'>
          <div className='grid grid-cols-2 gap-1'>
            <div>Posted by: <a className='font-bold'>{Review.user.username}</a></div>
            <div className='italic'>Posted: {NewDate}</div>
          </div>
        </div>

      </button>

    </div>

  )
}

export default ReviewElement