import React, {memo} from 'react'

const Extrainfor = ({icon, title, sub}) => {
  return (
    <div className='flex items-center p-4 gap-4 mb-[10px] border'>
        <span className='p-2 bg-gray-300 rounded-full items-center'>{icon}</span>
        <div className='flex flex-col text-sm text-gray-500'>
            <span className='font-bold'>{title}</span>
            <span className='text-xs'>{sub}</span>
        </div>
    </div>
  )
}

export default memo(Extrainfor)