import React, { useEffect } from 'react'
import { Public, Home, Blog, Product, DetailProduct, Faq, Login, Service } from './pages/public';
import { Routes, Route } from 'react-router-dom';
import path from './utils/path';
import { getCategory } from './store/app/asyncAction';
import { useDispatch } from 'react-redux';


const App = () => {
    const disPatch = useDispatch()
    useEffect(() => {
        disPatch(getCategory())
    }, [])
    return (
        <div className='min-h-screen font-main'>
            <Routes>
                <Route path={path.LOGIN} element={<Login />} />
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.PRODUCT} element={<Product />} />
                    <Route path={path.DETAILPRODUCT__PID__TITLE} element={<DetailProduct />} />
                    <Route path={path.SERVICE} element={<Service />} />
                    <Route path={path.BLOG} element={<Blog />} />
                    <Route path={path.FAQS} element={<Faq />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App

