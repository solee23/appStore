import React from 'react'

const InputFiels = ({value, setValue, nameKey, type, label, invalidFields, setInvalidField}) => {
  return (
    <div className='w-full relative'>
        <label className='text-[18px] absolute top-[-8px]' htmlFor={nameKey}>{label}</label>
        <input 
        type={type || 'text'} 
        className='px-4 py-2 rounded-sm border w-full my-4 placeholder:text-sm outline-none'  
        placeholder={nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
        value={value}
        onChange={e => setValue(prev => ({...prev, [nameKey]: e.target.value}))}
        />
    </div>
  )
}

export default InputFiels