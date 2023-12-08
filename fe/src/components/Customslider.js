import React, {memo} from 'react'
import Slider from "react-slick";
import { Product } from './'



const Customslider = ({ products, active, settings }) => {
    return (
        <>
            {products && <Slider {...settings}>
                {products?.map(el => (
                    <Product
                        key={el._id}
                        productData={el}
                        pid={el.id}
                        isTab={active === 1 ? false : true}
                    />
                ))}
            </Slider>}
        </>
    )
}

export default memo(Customslider)