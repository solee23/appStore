import axios from "../axios";

export const getProduct = (params) => axios({
    url:'/product/get',
    method: 'get',
    params
})

export const getDetail= (pid) => axios({
    url:'/product/' + pid,
    method: 'get',
})