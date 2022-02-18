import React from 'react'
import { Routes, Route } from 'react-router-dom'

//Importar componentes o paginas
import IndexTemp from '../components/Landing/IndexTemp'
import CashRegister from '../pages/CashRegister';
import Product from '../pages/Product';
import Sell from '../pages/SellTicket';
import Stock from '../pages/Stock';
import User from '../pages/User';
import CreateStockItem from '../components/Stock/CreateStockItem';
import AddQuantity from '../components/Stock/AddQuantity';
import CreateProduct from '../components/product/CreateProduct';
import AdjustProduct from '../components/product/AdjustProduct';
import OpenRegister from '../components/cashRegister/OpenRegister';
import CheckInventory from '../components/cashRegister/ChckInventory';
import BankDeposit from '../components/cashRegister/BankDeposit';
import Expenses from '../components/cashRegister/Expenses';
import CloseRegister from '../components/cashRegister/CloseRegister';
import ItemsByName from '../components/Stock/ItemsByName';
import ItemByNameAndChannel from '../components/Stock/ItemByNameAndChannel';
import InventoryTransfer from '../components/Stock/InventoryTransfer';
import AdjustQuantity from '../components/Stock/AdjustQuantity';
import AdjustElement from '../components/Stock/AdjustElement';
import CreateUser from '../components/user/CreateUser';
import AdjustUser from '../components/user/AdjustUser';
import NotFound from '../components/auth/NotFound';
import CatAndTempSelction from '../components/sellTicket/CatAndTempSalection';
import ChooseProductTable from '../components/sellTicket/ChooseProductTable';
import GeneralMenu from '../components/generic/GeneralMenu';
import ProductSelectForm from '../components/sellTicket/CatAndTempSalection';
import CloseTransaction from '../components/sellTicket/CloseTransaction';
import Packet from '../components/sellTicket/Packet';
import Combo from '../components/sellTicket/Combo';


export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<IndexTemp />} />
            <Route path="/menu" element={<GeneralMenu />} />

            <Route path="/cash" element={<CashRegister />} />
            <Route path="/cash/open" element={<OpenRegister />} />
            <Route path="/cash/checkinventory" element={<CheckInventory />} />
            <Route path="/cash/deposit" element={<BankDeposit />} />
            <Route path="/cash/expenses" element={<Expenses />} />
            <Route path="/cash/close" element={<CloseRegister />} />

            <Route path="/product" element={<Product />} />
            <Route path="/product/create" element={<CreateProduct />} />
            <Route path="/product/adjust" element={<AdjustProduct />} />

            <Route path="/sell" element={<Sell />} />
            <Route path="/sell/prodSelectForm" element={<ProductSelectForm />} />
            <Route path="/sell/catTempSelection" element={<CatAndTempSelction />} />
            <Route path="/sell/chooseProductTable" element={<ChooseProductTable />} />
            <Route path="/sell/packet" element={<Packet />} />
            <Route path="/sell/combo" element={<Combo />} />
            <Route path="/sell/deliver" element={<CloseTransaction />} />

            <Route path="/stock" element={<Stock />} />
            <Route path="/stock/create" element={<CreateStockItem />} />
            <Route path="/stock/getbyname" element={<ItemsByName />} />
            <Route path="/stock/getbynameandchannel" element={<ItemByNameAndChannel />} />
            <Route path="/stock/add" element={<AddQuantity />} />
            <Route path="/stock/transfer" element={<InventoryTransfer />} />
            <Route path="/stock/adjustquantity" element={<AdjustQuantity />} />
            <Route path="/stock/adjustelement" element={<AdjustElement />} />


            <Route path="/user" element={<User />} />
            <Route path="/user/createUser" element={<CreateUser />} />
            <Route path="/user/adjustUser" element={<AdjustUser />} />
            <Route path="*" element={<NotFound />} />


        </Routes>
    )
}
