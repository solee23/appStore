import React, { useEffect } from 'react'
import { Public, Home } from './pages/public';
import { Routes, Route } from 'react-router-dom';
import path from './utils/path';
import { getCategory } from './store/asyncAction';
import { useDispatch } from 'react-redux';


const App = () => {
    const disPatch = useDispatch()
    useEffect(() => {
        disPatch(getCategory())
    }, [])
    return (
        <div className='min-h-screen font-main'>
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    {/* <Route path={path.LOGIN} element={<Login/>}/> */}
                </Route>
            </Routes>
        </div>
    )
}

export default App

