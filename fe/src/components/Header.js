import React from 'react';
import icons from '../utils/icon';
import { Link } from 'react-router-dom';
import path from '../utils/path';

const Header = () => {
  const { BsFillTelephoneInboundFill, MdEmail,BsFillBagCheckFill, RiAccountCircleFill } = icons

  return (
    <div className="flex justify-between w-main h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src='/logo.png' alt='logo' className="w-[234px] object-contain"/>
      </Link>
      <div className="flex text-[13px] gap-4">
        <div className="flex flex-col px-6 items-center border-r">
          <span className="flex gap-4 items-center">
            <BsFillTelephoneInboundFill color="red"/>
            <span className="font-semibold">(+84)-763-904-481</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col items-center px-6 border-r">
            <span className="flex gap-4 items-center">
              <MdEmail color="red"/>
              <span className="font-semibold">lspau95@gmail.com</span>
            </span>
            <span >Online Support 24/7</span>
        </div>
        <div className="flex items-center justify-center gap-2 px-6 border-r">
            <BsFillBagCheckFill color="red" size={26}/>
            <span>0 items</span>
        </div>
        <div className="flex items-center justify-center gap-2 px-6" >
           <RiAccountCircleFill color="red" size={26}/>
        </div>
      </div>
    </div>
  )
}

export default Header