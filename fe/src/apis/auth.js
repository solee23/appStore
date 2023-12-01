import axios from "../axios";

export const apiLogin = (data) => axios({
    url:'/user/login',
    method: 'post',
    data
})

export const apiRegister = (data) => axios({
    url:'/user/register',
    method: 'post',
    data,
    withCredentials: true
})

export const apiForgot = (data) => axios({
    url:'/user/forgotPassword',
    method: 'post',
    data,
})