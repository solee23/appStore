import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { store } from './store/redux';
import { Provider } from 'react-redux';

import './index.css';

const container = document.getElementById('root')
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

