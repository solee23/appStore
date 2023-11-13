import React from 'react'
import { Public, Home, Login } from './pages/public';
import { Routes, Route } from 'react-router-dom';
import path from './utils/path';


const App = () => {
    return (
        <div>
            <Routes>
                <Route path={path.PUBLIC} element={<Public/>}>
                    <Route path={path.HOME} element={<Home/>}/>
                    <Route path={path.LOGIN} element={<Login/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App

