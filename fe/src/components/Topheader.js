import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import path from '../utils/path'
import { getUser } from '../store/user/asyncAction'
import { useDispatch, useSelector } from 'react-redux';
import icons from '../utils/icon';
import { logOut } from '../store/user/userSlice'

const {IoIosLogOut} = icons

const Topheader = () => {
  const disPatch = useDispatch()
  const {isLoggin, userDetail} = useSelector(state => state.user)
  console.log(userDetail);
  useEffect(() => {
    if(isLoggin)
    disPatch(getUser())
  },[disPatch,isLoggin])
  return (
    <div className='h-[38px] w-full bg-main flex items-center justify-center'>
        <div className='w-main flex items-center justify-between text-m text-semibold text-white'>
            <span>Gọi cho chúng tôi (+84)-763-904-481</span>
            {isLoggin 
            ? 
            <span className='flex gap-4 items-center cursor-pointer'>
              <Link className='hover:text-gray-800' to={`/${path.LOGIN}`}>{`Xin chào, ${userDetail?.firstName} ${userDetail?.lastName}` }</Link>
              <span 
              className='hover:text-gray-800'
              onClick={() => disPatch(logOut())}>
                <IoIosLogOut size={30} />
              </span>
            </span>
            : 
            <Link className='hover:text-gray-800' to={`/${path.LOGIN}`}>Đăng nhập hoặc tạo tài khoản</Link>}
        </div>
    </div>
  )
}

export default Topheader