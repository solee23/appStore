import React, { useEffect, useState } from 'react'
import icons from '../utils/icon'
import { getProduct } from '../apis/product'
import { renderStarFromNumber } from '../utils/helper'
import { fortmatMoney, secondsToHms } from '../utils/helper'
import { Countdown} from './'
import moment from 'moment'


const { FaStar, IoMdMenu } = icons
let idInterval
const Dealdaily = () => {
    const [product, setProduct] = useState(null)
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [expireTime, setExprireTime] = useState(false)

    const getProducts = async () => {
        const response = await getProduct({ limit: 1, page: 1/*Math.round(Math.random()*10)*/, totalRatings: 5 })
        if (response.success){
            setProduct(response.data[0])
            const today = `${moment().format('MM/DD/YYYY')} 5:00:00`
            const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000
            const number = secondsToHms(seconds)
            setHour(number.h)
            setMinute(number.m)
            setSecond(number.s)
        }else{
            setHour(2)
            setMinute(0)
            setSecond(0)
        }
    }

    useEffect(() => {
        idInterval && clearInterval(idInterval)
        getProducts()
    },[expireTime])
    useEffect(() => {
       idInterval = setInterval(() => {
        if(second > 0) setSecond(prev => prev -1)
        else{
            if(minute > 0){
                setMinute(prev => prev -1)
                setSecond(59)
            }else{
                if(hour > 0){
                    setHour(prev => prev -1)
                    setMinute(59)
                }else{
                    setExprireTime(!expireTime)
                }
            }
        }
       },1000)
       return () => {
        clearInterval(idInterval)
       }
    }, [second, minute, hour, expireTime])

    return (
        <div className='w-full border flex-auto'>
            <div className='flex items-center justify-between p-4 w-full'>
                <span className='flex-2 flex justify-center'><FaStar color='red' size={20} /></span>
                <span className='flex-6 font-semibold text-[20px] flex justify-center text-gray-700'>DEAL DAILY</span>
                <span className='flex-2'></span>
            </div>
            <div className='w-full flex flex-col items-center pt-8 px-4 gap-2'>
                <img src={product?.images[0] || 'https://www.pacificfoodmachinery.com.au/media/catalog/product/placeholder/default/no-product-image-400x400.png'}
                    alt=''
                    className='w-full object-contain'
                />
                <span className="line-clamp-1 text-center">{product?.title}</span>
                <span className='flex h-4'>{renderStarFromNumber(product?.totalRatings, 20)}</span>
                <span>{`${fortmatMoney(product?.price)} VNĐ`}</span>
            </div>
            <div className='px-4 mt-8'>
                <div className='flex justify-center items-center gap-2 mb-4'>
                    <Countdown unit={'Giờ'} number={hour}/>
                    <Countdown unit={'Phút'} number={minute}/>
                    <Countdown unit={'Giây'} number={second}/>
                </div>
                <button
                    type='button'
                    className='py-2 mb-4 flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium'
                >
                    <IoMdMenu/>
                    <span>Options</span>
                </button>
            </div>
        </div>
    )
}

export default Dealdaily