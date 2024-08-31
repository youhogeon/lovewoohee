import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Home from './pages/Home'
import { MainLayout } from './themes/MainLayout'


const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <MainLayout>
            <Home />
        </MainLayout>
    </React.StrictMode>,
)