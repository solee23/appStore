import React from 'react';
import { Sidebar, Banner, Bestseller } from '../../components';


const Home = () => {
  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col flex-auto gap-5 w-[20%]">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-auto gap-5 w-[80%] pl-5">
          <Banner />
          <Bestseller />
        </div>
      </div>
      <div className='w-full h-[500px]'></div>
    </>
  )
}

export default Home