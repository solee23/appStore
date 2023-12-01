import axios from "../axios";

export const apiLogin = (data) => axios({
    url:'/user/login',
    method: 'post',
    data
})

export const apiLogout = () => axios({
    url:'/user/logout',
    method: 'post',
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

export const apiReset = (data) => axios({
    url:'/user/resetPassWord',
    method: 'put',
    data,
})

export const apiUser = () => axios({
    url:'/user/get',
    method: 'get',
})

