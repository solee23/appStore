import axios from "../axios";

export const getCategory = () => axios({
    url:'/category/get',
    method: 'get'
})

