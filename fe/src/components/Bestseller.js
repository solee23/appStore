
import React, {useEffect, useState} from 'react'
import { getProduct } from '../apis/product'
import { Product} from './'
import Slider from "react-slick";

const tab = [
    { id: 1, name: 'Sản phẩm nhiểu lượt mua'},
    { id: 2, name: 'Những sản phẩm mới'},
]
var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

const Bestseller = () => {
    const [bestSeller, setBestSeller] = useState(null);
    const [newProduct, setNewProduct] = useState(null);
    const [acctive, setActive] = useState(1)
    const getProducts = async() => {
      const response = await Promise.all([getProduct({sort: '-sold'}),getProduct({sort: '-createAt'})])
      if(response[0]?.success) setBestSeller(response[0].data)
      if(response[1]?.success) setNewProduct(response[1].data)
    }
    useEffect(() => {
    getProducts();
    },[])
  return (
    <div>
        <div className='flex text-[20px] gap-20 pb-4 border-b-2 border-main'>
           {tab?.map(el => (
             <span key={el.id} className={`font-semibold capitalize pr-3 border-r cursor-pointer text-gray-400 ${acctive === el.id ? 'text-gray-900' : ''}`} onClick={() => setActive(el.id)}>{el.name}</span>
           ))}
        </div>
        <div className='mt-4'>
        <Slider {...settings}>
            {bestSeller?.map(el => (
                <Product 
                key={el._id} 
                productData={el}/>
            ))}
    </Slider>
        </div>
    </div>
  )
}

export default Bestseller