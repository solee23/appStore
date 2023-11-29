import React from 'react'
import { renderStarFromNumber } from '../utils/helper'
import { fortmatMoney } from '../utils/helper'

const Productcart = ({title, price, image, totalRatings}) => {
  return (
    <div className='w-1/3 flex-auto px-[10px] mb-[20px] '>
        <div className='w-full flex border ml-[-20px]'>
        <img src={image} 
             className='w-[90px] object-contain p-4 '   
             alt='Product'
        />
        <div className='flex flex-col gap-1 mt-[15px] items-start w-full text-xs'>
          <span className="line-clamp-1 capitalize text-sm">{title?.toLowerCase()}</span>
          <span className='flex h-4'>{renderStarFromNumber(totalRatings,14)}</span>
          <span>{`${fortmatMoney(price)} VNĐ`}</span>
        </div>
        </div>
    </div>
  )
}

export default Productcart