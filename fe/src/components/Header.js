import React from 'react';
import icons from '../utils/icon';

const Header = () => {
  const { BsFillTelephoneInboundFill, MdEmail,BsFillBagCheckFill, RiAccountCircleFill } = icons

  return (
    <div className="border flex justify-between w-main h-[120px] py-[25px]">
      Logo
      <div className="flex gap-6">
        <div className="font-main border border-l">
          <span className="flex gap-2 items-center">
            <BsFillTelephoneInboundFill color="blue"/>
            <span className="font-semibold">(+84)-763-904-481</span>
          </span>
          <span >Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex gap-6">
          <div className="font-main">
            <span className="flex gap-2 items-center">
              <MdEmail color="blue"/>
              <span className="font-semibold">lspau95@gmail.com</span>
            </span>
            <span >Online Support 24/7</span>
          </div>
        </div>
        <div>
          <span className="flex items-center gap-2">
            <BsFillBagCheckFill color="blue"/>
            <span> items</span>
          </span>
        </div>
        <div>
            <spam className="flex items-center gap-2">
              <RiAccountCircleFill color="blue"/>
            </spam>
        </div>
      </div>
    </div>
  )
}

export default Header