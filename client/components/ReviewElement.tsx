import React, { useState } from 'react'
import moment from "moment"
import { Review } from '../types/review'
import { Rating } from 'react-simple-star-rating'
import MoreReviewInfo from './MoreReviewInfo'

interface Props {
  review: Review
  companyId : string | string[] | undefined
  refreshReviewList : () => Promise<void>
}

function ReviewElement({ review: Review, companyId,refreshReviewList }: Props) {
  const NewDate = moment(Review.postDate).format('YYYY-MM-DD')
  const [moreInfoVisability, setMoreInfoVisability] = useState<boolean>(false)
  const handleMoreInfoModel = () => {
    setMoreInfoVisability(true);
  }
  const handleMoreInfoClose = () => {
    setMoreInfoVisability(false)
  }

  return (
    <div className='flex items-center space place-content-around'>
      <button onClick={handleMoreInfoModel}
        className="transition ease-in-out delay-150 p-8 border border-gray-200 rounded bg-white lg:min-w-[365px] lg:min-h-[150px] md:min-h-[150px] md:min-w-[340px] min-h-[350px] min-w-[450px]  hover:border-b-4 hover:border-[#08aa76] active:bg-gray-100 hover:bg-[#e2ebe8] hover:-translate-y-1 hover:scale-105 duration-300">
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
      {moreInfoVisability && (<MoreReviewInfo companyId={companyId} refreshReviewList={refreshReviewList} review={Review} visible={moreInfoVisability} onClose={handleMoreInfoClose} />)}
    </div>

  )
}

export default ReviewElement