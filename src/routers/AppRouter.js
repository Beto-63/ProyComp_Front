import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Importar paginas
import Auth from '../pages/Auth';
import CashRegister from '../pages/CashRegister';
import Product from '../pages/Product';
import Sell from '../pages/SellTicket';
import Stock from '../pages/Stock';
import User from '../pages/User';
import CreateStockItem from '../components/Stock/CreateStockItem';
import AddQuantity from '../components/Stock/AddQuantity';

export const AppRouter = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Auth />} />

                    <Route path="/cash" element={<CashRegister />} />

                    <Route path="/product" element={<Product />} />
                    {/* <Route path="/product/create" element={<CreateProduct />} />
                    <Route path="/prduct/adjust" element={<AdjustProduct />} /> */}

                    <Route path="/sell" element={<Sell />} />

                    <Route path="/stock" element={<Stock />} />
                    <Route path="/stock/create" element={<CreateStockItem />} />
                    <Route path="/stock/add" element={<AddQuantity />} />

                    <Route path="/user" element={<User />} />

                </Routes>

            </Router>
        </>
    )
}
