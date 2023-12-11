import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetail } from '../../apis'
import { Breadcrumb } from '../../components'
import Slider from "react-slick";
import ReactImageMagnify from 'react-image-magnify';


var setting = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};

const DetailProduct = () => {

  const { pid, title, category } = useParams()
  const [product, setProduct] = useState(null)
  const getDetailProduct = async (req, res) => {
    const response = await getDetail(pid)
    if (response.sucess) setProduct(response.data)
  }
  useEffect(() => {
    if (pid) getDetailProduct()
  }, [pid])
  return (
    <div>
      <div className='h-[81px] flex items-center justify-center bg-gray-200'>
        <div className='w-main'>
          {title}
          <Breadcrumb title={title} category={product?.category} />
        </div>
      </div>
      <div className='mt-4 flex '>
        <div className='flex flex-col gap-3 w-2/5'>
          <div className='w-[458px] h-[458px]'>
            <ReactImageMagnify {...{
              smallImage: {
                alt: 'product',
                isFluidWidth: true,
                src: /*product?.images ||*/ 'https://www.pacificfoodmachinery.com.au/media/catalog/product/placeholder/default/no-product-image-400x400.png'
              },
              largeImage: {
                src: /*product?.images ||*/ 'https://www.pacificfoodmachinery.com.au/media/catalog/product/placeholder/default/no-product-image-400x400.png',
                width: 1800,
                height: 1800
              }
            }} />
          </div>
          {/* <img
            className='w-[458px] h-[458px] border object-cover'
            src={product?.images || 'https://www.pacificfoodmachinery.com.au/media/catalog/product/placeholder/default/no-product-image-400x400.png'}
            alt='product' /> */}
          <div className='w-[458px]'>
            <Slider className='images-slider' {...setting}>
              {product?.images?.map(el => (
                <div className='flex-1' key={el}>
                  <img
                    src={el}
                    alt='subproduct'
                    className='w-[143px] h-[143px] border object-cover ' />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className='flex-4 w-2/5'>price</div>
        <div className='flex-2 w-1/5'>infor</div>
      </div>
      <div className='h-[500px]'></div>
    </div>
  )
}

export default DetailProduct