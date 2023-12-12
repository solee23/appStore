import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumb, Product, Searchitem } from '../../components'
import { getProduct } from '../../apis'
import Masonry from 'react-masonry-css'


const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

const ProductPage = () => {

    const [products, setProducts] = useState(null)
    const [activeClick, setActiveClick] = useState(null)

    const productByCategory = async (queries) => {
        const response = await getProduct(queries)
        if (response.success) setProducts(response.data)
    }

    const changActive = useCallback((name) => {
        if(activeClick === name) setActiveClick(null)
        else  setActiveClick(name)
    },[activeClick])


    useEffect(() => {
        productByCategory();
    }, [])
    const { category } = useParams()
    return (
        <div>
            <div className='h-[81px] flex items-center justify-center bg-gray-200'>
                <div className='w-main uppercase'>
                    {category}
                    <Breadcrumb category={category} />
                </div>
            </div>
            <div className='w-main border p-4 flex justify-between mt-8 m-auto'>
                <div className='w-4/5 flex-auto flex flex-col gap-3'>
                    <span className='font-semibold text-sm'>Tìm kiếm theo:</span>
                    <div className='flex items-center gap-4'>
                    <Searchitem
                        name='price'
                        click={activeClick}
                        changActive={changActive}
                        type='input'
                    />
                    <Searchitem
                        name='color'
                        click={activeClick}
                        changActive={changActive}
                    />
                    </div>
                </div>
                <div className='w-1/5'>
                    sort by
                </div>
            </div>
            <div className='mt-8 m-auto'>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column">
                    {products?.map(el => (
                        <Product
                            key={el._id}
                            productData={el}
                            pid={el.id}
                            nomarl={true}
                        />
                    ))}
                </Masonry>
            </div>
            <div className='h-[500px]'></div>
        </div>
    )
}

export default ProductPage