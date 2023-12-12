import React, { memo } from 'react'

const Selectquatity = ({quantity, handleQuantity, handleChangeQuantity}) => {
  return (
    <div className='flex items-center'>
        <span 
          className=' p-2 border-r border-black cursor-pointer'
          onClick={() => {handleChangeQuantity('minus')}}
        >-</span>
        <input 
        className='py-2 outline-none w-[30px] text-center' 
        type='text'
        value={quantity}
        onChange={e => handleQuantity(e.target.value)}
        />
        <span 
          onClick={() => {handleChangeQuantity('plus')}}
          className=' p-2 border-l border-black cursor-pointer'
        >+</span>
    </div>
  )
}

export default memo(Selectquatity)