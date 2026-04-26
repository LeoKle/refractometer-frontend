import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';

import { ParameterProvider } from './context/ParameterProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <PrimeReactProvider>
            <ParameterProvider>
                <App />
            </ParameterProvider>
        </PrimeReactProvider >
    </React.StrictMode>,
)
