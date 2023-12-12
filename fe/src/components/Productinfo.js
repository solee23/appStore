import React, {memo, useState} from 'react'
import {Infor} from '../utils/constant'

const activeStyle = ''
const notActiveStyle= ''

const Productinfo = () => {
const [activeTab, setActiveTab] = useState(1)
  return (
    <div>
        <div className='flex items-center gap-4 relative bottom-[-1px]'>
            {Infor?.map(el => (
                <span 
                    key={el.id}
                    className={`py-2 px-4 cursor-pointer ${activeTab === el.id ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab(el.id)}
                >{el.title}</span>
            ))}
        </div>
        <div className='w-full border p-4'>
            {Infor.some(el => el.id === activeTab) && Infor.find(el => el.id === activeTab)?.content}
        </div>
    </div>
  )
}

export default memo(Productinfo)