import React, { memo, useState } from 'react'
import icons from '../utils/icon'

const {FaChevronDown} = icons

const Searchitem = ({name, click, changActive, type = 'checkbox'}) => {

    const [selected, setSetselected] = useState(0)
  return (
    <div 
        className='p-3 text-gray-500 relative gap-6 border border-gray-800 flex justify-between items-center'
        onClick={() => changActive(name)}
    >
        <span className='text-xs capitalize'>{name}</span>
        <FaChevronDown  />
        {click === name &&  <div className='top-full w-fit p-4 border bg-white absolute m-w-[150px]'>
           {type === 'checkbox' &&  <div className=''>
           <div className='p-4 items-center flex justify-between gap-8'>
                        <span className='whitespace-nowrap'>{`${selected} đã chọn`}</span>
                        <span className='underline cursor-pointer text-main'>Quay lại</span>
                </div>
           </div>
           }
        </div>}
    </div>
  )
}

export default memo(Searchitem)