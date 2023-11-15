import React from 'react'
import { Link } from 'react-router-dom'
import path from '../utils/path'
import { useAppStore } from '../store/useAppStore';

const Login = () => {
    const { setModal } = useAppStore();
    return (
        <section class="bg-gray-50 rounded-lg p-6 space-y-4 md:space-y-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}>
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-red-600 text-xl font-bold leading-tight tracking-tigh md:text-2xl ">
                            Đăng nhập tài khoản
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@gmail.com" />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Mật khẩu</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="remember" class="text-gray-500">Lưu</label>
                                    </div>
                                </div>
                                <a href="#" class="text-sm font-medium text-red-600 hover:underlin">Quên mật khẩu?</a>
                            </div>
                            <div>
                                <Link to={`/${path.PRODUCT}`}>
                                    <button type="submit" class=" w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        onClick={() => setModal(false, null)}
                                    >Đăng nhập</button>
                                </Link>
                            </div>
                            <p class="text-sm font-light text-gray-500">
                                Bạn chưa có tài khoản? <a href="#" class="font-medium text-red-600 hover:underlin">Đăng ký</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login