import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Pizza from './pages/Pizza';
import Pizzak from './pages/Pizzak';
import Kosar from './pages/Kosar';
import CustomNavbar from './components/Navbar';
import { Product } from './types/Product';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const App: React.FC = () => {
    const [kosar, setKosar] = useState<Product[]>(
        JSON.parse(localStorage.getItem('kosar') || '[]'),
    );

    const addToKosar = (pizza: Product) => {
        const updatedKosar = [...kosar, pizza];
        setKosar(updatedKosar);
        localStorage.setItem('kosar', JSON.stringify(updatedKosar));
    };

    return (
        <BrowserRouter>
            <CustomNavbar />
            <Routes>
                <Route path="/" element={<Pizzak addToKosar={addToKosar} />} />
                <Route path="/pizza/:id" element={<Pizza addToKosar={addToKosar} />} />
                <Route path="/kosar" element={<Kosar kosar={kosar} setKosar={setKosar} />} />
                <Route path="*" element={<h1>404, Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

root.render(<App />);
