import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
  });

  instance.interceptors.request.use(function (config) {
    const localStorage = JSON.parse(window.localStorage.getItem('persist:shop/user'))
    if(localStorage){
      const token = JSON.parse(localStorage?.token)
      config.headers = {Authorization: `Bearer ${token}`}
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return error.response.data;
  });

  export default instance;