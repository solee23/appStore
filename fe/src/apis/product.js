import axios from "../axios";

export const getProduct = (params) => axios({
    url:'/product/get',
    method: 'get',
    params
})