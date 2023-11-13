import React from 'react';
import { Sidebar, Banner } from '../../components';

const Home = () => {
  return (
    <div className="w-main flex">
      <div className="flex flex-col flex-auto gap-5 w-[30%] border">
        <Sidebar/>
        <span> Deal daily</span>
      </div>
      <div className="flex flex-col flex-auto gap-5 w-[70%] pl-5 border">
        <Banner/>
        <span> Best seller</span>
      </div>
    </div>
  )
}

export default Home