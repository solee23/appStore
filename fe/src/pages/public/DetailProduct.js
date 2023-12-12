import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetail, getProduct } from '../../apis'
import { Breadcrumb, Button, Selectquatity, Extrainfor, Productinfo, Customslider } from '../../components'
import Slider from "react-slick";
import ReactImageMagnify from 'react-image-magnify';
import { fotmatPrice, fortmatMoney, renderStarFromNumber } from '../../utils/helper'
import { Extraitem } from '../../utils/constant'


var setting = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
};

const DetailProduct = () => {

    const { pid, title, category } = useParams()
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [related, setRelated] = useState(null)

    const getDetailProduct = async (req, res) => {
        const response = await getDetail(pid)
        if (response.sucess) setProduct(response.data)
    }

    const getProducts = async(req,res) => {
        const response = await getProduct()
        if(response.success) setRelated(response.data)
    }

    const handleQuantity = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) return
        setQuantity(number)
    }, [quantity])

    const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) return
        if (flag === 'minus') setQuantity(prev => +prev - 1)
        if (flag === 'plus') setQuantity(prev => +prev + 1)
    }, [quantity])

    useEffect(() => {
        if (pid){
            getDetailProduct()
            getProducts()
        }
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
                <div className='flex-4 w-2/5 pr-[24px] flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-[30px] font-semibold'>{`${fortmatMoney(fotmatPrice(product?.price))} VNĐ`}</h3>
                        <div className='flex flex-col'>
                            <span className='text-sm text-main'>{`Kho: ${product?.quantity}`}</span>
                            <span className='text-sm text-main'>{`Đã bán: ${product?.sold}`}</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-1'>
                        {renderStarFromNumber(product?.totalRatings)?.map(el => (
                            <span className='items-center'
                                key={el}>{el}
                            </span>
                        ))}
                        <span className='ml-2 text-sm text-main'>{`${product?.ratings.length} (Người đánh giá)`}</span>

                    </div>
                    <div className='mt-4 text-sm text-gray-500'>{product?.desc}</div>
                    <div className='flex flex-col gap-8'>
                        <div className='flex items-center gap-4'>
                            <span className='font-semibold text-sm'>Số lượng:</span>
                            <Selectquatity
                                quantity={quantity}
                                handleQuantity={handleQuantity}
                                handleChangeQuantity={handleChangeQuantity}
                            />
                        </div>
                        <Button fw> Thêm vào giỏ hàng</Button>
                    </div>
                </div>
                <div className='flex-2 w-1/5'>
                    {Extraitem?.map(el => (
                        <Extrainfor
                            key={el.id}
                            title={el.title}
                            icon={el.icon}
                            sub={el.sub}
                        />
                    ))}
                </div>
            </div>
            <div className='mt-8'>
                <Productinfo />
            </div>
            <div className='mb-[80px]'>
                <h3 className='text-[20px] font-semibold py-[15px] uppercase border-b-2 border-main'>KHÁCH HÀNG KHÁC CŨNG MUA:</h3>
                <div className=' mt-4 mx-[-10px] '>
                    <Customslider
                        products={related}
                        settings={settings}
                    />
                </div>
            </div>
        </div>
    )
}

export default DetailProduct