
import React, { useEffect, useState } from 'react'
import { getProduct } from '../apis/product'
import { Customslider } from './'
import {getNewProduct} from '../store/product/asyncAction'
import { useDispatch, useSelector } from 'react-redux';

const tab = [
  { id: 1, name: 'Sản phẩm nhiểu lượt mua' },
  { id: 2, name: 'Những sản phẩm mới' },
]

var setting = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};


const Bestseller = () => {
  const disPatch = useDispatch()
  const { newProduct } = useSelector(state => state.products)
  const [bestSeller, setBestSeller] = useState(null);
  const [active, setActive] = useState(1)
  const [products, setProducts] = useState(null)
  const getProducts = async () => {
    const response = await getProduct({ sort: '-sold' })
    if (response.success){
      setBestSeller(response.data)
      setProducts(response.data)
    }
  }

  useEffect(() => {
    getProducts()
    disPatch(getNewProduct())
  }, [])
  useEffect(() => {
    if (active === 1) setProducts(bestSeller)
    if (active === 2) setProducts(newProduct)
  }, [active])
  return (
    <div>
      <div className='flex text-[20px] gap-20 pb-4 border-b-2 border-main'>
        {tab?.map(el => (
          <span key={el.id} className={`font-semibold uppercase pr-3 border-r cursor-pointer text-gray-400 ${active === el.id ? 'text-gray-900' : ''}`}
            onClick={() => setActive(el.id)}
          >{el.name}
          </span>
        ))}
      </div>
      <div className='mt-4 mx-[-10px]'>
        <Customslider 
        products={products} 
        active={active}
        settings={setting}
        />
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