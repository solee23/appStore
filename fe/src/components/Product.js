import React, {useState} from 'react'
import { fortmatMoney } from '../utils/helper'
import label1 from '../assets/label1.png'
import label2 from '../assets/label2.png'
import { renderStarFromNumber } from '../utils/helper'
import { Selectoption } from './'
import icons from '../utils/icon'
import { Link } from 'react-router-dom'
import path from '../utils/path'

const { FaEye, IoMdMenu, FaHeart } = icons


const Product = ({ productData, isTab }) => {
  const [isShowOptions, setIsShowOptions] = useState(false)
  return (
    <div className='w-full text-base  px-[10px]'>
      <Link 
      to={`/${path.DETAILPRODUCT}/${productData?._id}/${productData?.title}`}
      className='w-full border p-[15px] flex flex-col items-center'
      onMouseEnter={e => {
        e.stopPropagation()
        setIsShowOptions(true)
      }}
      onMouseLeave={e => {
        e.stopPropagation()
        setIsShowOptions(false)
      }}
      >
        <div className='w-full relative'>
          {isShowOptions && <div 
          className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top'
          >
            <Selectoption icon={<FaEye/>}/>
            <Selectoption icon={<IoMdMenu/>}/>
            <Selectoption icon={<FaHeart/>}/>
          </div>}
          <img src={productData?.images[0] || 'https://www.pacificfoodmachinery.com.au/media/catalog/product/placeholder/default/no-product-image-400x400.png'}
            alt=''
            className='w-[274px] h-[274px] object-cover'
          />
          <img src={isTab ? label1 : label2} alt='' className={` ${isTab ? 'w-[50px] h-[50px] top-[0px] right-[0px]' : 'w-[120px] h-[100px] top-[-29px] left-[-9px]'} absolute `} />
        </div>
        <div className='flex flex-col gap-1 mt-[15px] items-start w-full'>
          <span className='flex h-4'>{renderStarFromNumber(productData?.totalRatings)}</span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${fortmatMoney(productData?.price)} VNĐ`}</span>
        </div>
      </Link>
    </div>
  )
}

export default Product