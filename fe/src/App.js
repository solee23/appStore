import React from 'react'
import { Public, Home } from './pages/public';
import { Routes, Route } from 'react-router-dom';
import path from './utils/path';
import { useAppStore } from './store/useAppStore';
import Modal from './components/commons/Modal';


const App = () => {
    const {isShowModal} = useAppStore();
    return (
        <div>
            { isShowModal && <Modal/>}
            <Routes>
                <Route path={path.PUBLIC} element={<Public/>}>
                    <Route path={path.HOME} element={<Home/>}/>
                    {/* <Route path={path.LOGIN} element={<Login/>}/> */}
                </Route>
            </Routes>
        </div>
    )
}

export default App

