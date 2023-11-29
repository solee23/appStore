import React from 'react';
import { Sidebar, Banner, Bestseller, Dealdaily, Featureproduct, Customslider } from '../../components';
import { useSelector } from 'react-redux';
import icons from '../../utils/icon'

const { IoMdArrowDropright } = icons

const Home = () => {
    const { newProduct } = useSelector(state => state.products)
    const { category } = useSelector(state => state.app)

    console.log(category);

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
            <div className='my-8'>
                <Featureproduct />
            </div>
            <div className='my-8 w-full'>
                <h3 className='text-[20px] font-semibold py-[15px] uppercase border-b-2 border-main'>Sản phẩm mới</h3>
                <div className=' mt-4 mx-[-10px] '>
                    <Customslider
                        products={newProduct}
                    />
                </div>
                <div className=' my-8 w-full'>
                    <h3 className='text-[20px] font-semibold py-[15px] uppercase border-b-2 border-main'>Bộ sưu tập</h3>
                    <div className='flex flex-wrap gap-4 mt-4'>
                        {category/*.filter(el => el.brand.length > 0)?*/?.map(el => (
                            <div
                                key={el._id}
                                className='w-[396px]'
                            >
                                <div className='border flex p-4 gap-4  min-h-[190px]'>
                                    <img src={el.image}
                                        alt=''
                                        className='flex-1 object-cover w-[144px] h-[129px]' />
                                    <div className='flex-1 text-gray-700'>
                                        <h4 className='font-semibold uppercase'>{el.title}</h4>
                                        <ul className='text-sm'>
                                            {el.brand?.map(item => (
                                                // <li key={item}>{item}</li>
                                                <span className='flex gap-1 items-center text-gray-500'>
                                                    <IoMdArrowDropright size={14} />
                                                    <li key={item}>{item}</li>
                                                </span>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className=' my-8 w-full'>
                    <h3 className='text-[20px] font-semibold py-[15px] uppercase border-b-2 border-main'>Tin tức</h3>
                </div>
            </div>
            <div className='w-full h-[500px]'></div>
        </>
    )
}

export default Home