import React, {useEffect, useState} from 'react';
import { Sidebar, Banner } from '../../components';
import { getProduct } from '../../apis/product';

const Home = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async() => {
    const response = await getProduct()
    if(response.success) setProducts(response.data)

  }
  useEffect(() => {
  getProducts();
  },[])
  console.log(products);
  return (
    <div className="w-main flex">
      <div className="flex flex-col flex-auto gap-5 w-[20%]">
        <Sidebar/>
        <span> Deal daily</span>
      </div>
      <div className="flex flex-col flex-auto gap-5 w-[80%] pl-5">
        <Banner/>
        <span> Best seller</span>
      </div>
    </div>
  )
}

export default Home