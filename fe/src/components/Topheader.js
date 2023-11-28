import React from 'react'
import { Link } from 'react-router-dom'
import path from '../utils/path'

const Topheader = () => {
  return (
    <div className='h-[38px] w-full bg-main flex items-center justify-center'>
        <div className='w-main flex items-center justify-between text-m text-semibold text-white'>
            <span>Gọi cho chúng tôi (+84)-763-904-481</span>
            <Link to={`/${path.LOGIN}`}>Đăng nhập hoặc tạo tài khoản</Link>
        </div>
    </div>
  )
}

export default Topheader