import React from 'react'
import icons from '../utils/icon'

const { MdEmail } = icons

const Footer = () => {
    return (
        <div className='w-full'>
            <div className='h-[103px] w-full bg-main flex justify-center items-center'>
                <div className='w-main flex items-center justify-between'>
                    <div className='flex flex-col flex-1'>
                        <span className='text-20px uppercase text-gray-100'>Chưa biết để gì</span>
                        <small className='text-[13px] text-gray-300'>Chưa biết để gì</small>
                    </div>
                    <div className='flex-1 flex items-center'>
                        <input type='text'
                            className='p-4 pr-0 rounded-l-full flex-1 bg-[#F04646] outline-none text-gray-100 
                            placeholder:text-sm placeholder:text-gray-200 placeholder:italic placeholder:opacity-50    '
                            placeholder='Email:'
                        />
                        <div className='h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex items-center  text-gray-100 '>
                            <MdEmail size={30} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[407px] w-full bg-gray-900 flex justify-center items-center text-white text-[13px]'>
                <div className='w-main flex'>
                    <div className='flex-2 flex flex-col gap-2'>
                        <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>ABOUT US</h3>
                        <span>
                            <span>Địa chỉ: </span>
                            <span className='opacity-70'>KTX khu B Dĩ An Bình Dương</span>
                        </span>
                        <span>
                            <span>Số điện thoại: </span>
                            <span className='opacity-70'>0763904481</span>
                        </span>
                        <span>
                            <span>Email: </span>
                            <span className='opacity-70'>lspau95@gmail.com</span>
                        </span>
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                    <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>Thông tin</h3>
                        <span>A</span>
                        <span>B</span>
                        <span>C</span>
                        <span>D</span>
                        <span>E</span>
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                    <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>Tôi là ai?</h3>
                        <span>A</span>
                        <span>B</span>
                        <span>C</span>
                        <span>D</span>
                        <span>E</span>
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                    <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>Không biết</h3>
                        <span>A</span>
                        <span>B</span>
                        <span>C</span>
                        <span>D</span>
                        <span>E</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer