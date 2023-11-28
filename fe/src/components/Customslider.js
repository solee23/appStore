import React, {memo} from 'react'
import Slider from "react-slick";
import { Product } from './'


var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const Customslider = ({ products, active }) => {
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