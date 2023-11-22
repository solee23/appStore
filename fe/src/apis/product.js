import axios from "../axios";

export const getProduct = () => axios({
    url:'/product/get',
    method: 'get',
    // params
})