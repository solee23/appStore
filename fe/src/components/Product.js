import React from 'react'
import {fortmatMoney} from '../utils/helper'
import label from '../assets/label.png'

const Product = ({ productData, isTab }) => {
  return (
    <div className='w-full text-base  px-[10px]'>
      <div className='w-full border p-[15px] flex flex-col items-center'>
       <div className='w-full relative'>
       <img src={productData?.images[0] || 'https://www.pacificfoodmachinery.com.au/media/catalog/product/placeholder/default/no-product-image-400x400.png'}
          alt=''
          className='w-[243px] h-[243px] object-cover'
        />
        <img src={isTab ? label : ''} alt='' className={`top-[-8px] left-[-8px] absolute w-[70px] h-[70px] ${isTab ? '' : ''}`}/>
       </div>
        <div className='flex flex-col gap-1 mt-[15px] items-start w-full'>
          <span className="line-clamp-1">{productData.title}</span>
          <span>{productData.title}</span>
          <span>{`${fortmatMoney(productData.price)} VNĐ`}</span>
        </div>
      </div>
    </div>
  )
}

export default Product