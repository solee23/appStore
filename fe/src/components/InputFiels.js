import React from 'react'

const InputFiels = ({value, setValue, nameKey, type, label, placeholder, invalidFields, setInvalidField}) => {
  return (
    <div className='w-full relative flex flex-col mb-5'>
        <label className='text-[16px] absolute top-[-10px]' htmlFor={nameKey}>{label}</label>
        <input 
        type={type || 'text'} 
        className='px-4 py-2 rounded-sm border w-full mt-4 placeholder:text-sm outline-none'  
        nameKey={nameKey}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(prev => ({...prev, [nameKey]: e.target.value}))}
        />
        {/* <small className='text-main'>Nhập đầy đủ thông tin.</small> */}
    </div>
  )
}

export default InputFiels