import React from 'react';
import { Sidebar, Banner, Bestseller, Dealdaily } from '../../components';


const Home = () => {
  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col flex-auto gap-5 w-[25%]">
          <Sidebar />
          <Dealdaily />
        </div>
        <div className="flex flex-col flex-auto gap-5 w-[75%] pl-5">
          <Banner />
          <Bestseller />
        </div>
      </div>
      <div className='w-full h-[500px]'></div>
    </>
  )
}

export default Home