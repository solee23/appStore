
import React, { useEffect, useState } from 'react'
import { getProduct } from '../apis/product'
import { Product } from './'
import Slider from "react-slick";

const tab = [
  { id: 1, name: 'Sản phẩm nhiểu lượt mua' },
  { id: 2, name: 'Những sản phẩm mới' },
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
  const [active, setActive] = useState(1)
  const [products, setProducts] = useState(null)
  const getProducts = async () => {
    const response = await Promise.all([getProduct({ sort: '-sold' }), getProduct({ sort: '-createdAt' })])
    if (response[0]?.success){
      setBestSeller(response[0].data)
      setProducts(response[0].data)
    }
    if (response[1]?.success) setNewProduct(response[1].data)
  }
  useEffect(() => {
    getProducts()
  }, [])
  useEffect(() => {
    if (active === 1) setProducts(bestSeller)
    if (active === 2) setProducts(newProduct)
  }, [active])
  return (
    <div>
      <div className='flex text-[20px] gap-20 pb-4 border-b-2 border-main'>
        {tab?.map(el => (
          <span key={el.id} className={`font-semibold capitalize pr-3 border-r cursor-pointer text-gray-400 ${active === el.id ? 'text-gray-900' : ''}`}
            onClick={() => setActive(el.id)}
          >{el.name}
          </span>
        ))}
      </div>
      <div className='mt-4 mx-[-10px]'>
        <Slider {...settings}>
          {products?.map(el => (
            <Product
              key={el._id}
              productData={el}
              pid={el.id}
              isTab={active === 1 ? false : true}
              />
          ))}
        </Slider>
      </div>
      <div className='w-full flex gap-4 mt-10'> 
            <img 
            src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657' 
            alt=''
            className='flex-1 object-contain'
            />
            <img 
            src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657' 
            alt=''
            className='flex-1 object-contain'
            />
      </div>
    </div>
  )
}

export default Bestseller