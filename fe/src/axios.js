import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config();

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
  });

axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return error.data;
  });

  export default instance;