import logo from './LogoDOKO.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Auth from './pages/Auth';
import CashRegister from './pages/CashRegister';
import Product from './pages/Product';
import Sell from './pages/Sell';
import Stock from './pages/Stock';
import User from './pages/User';


function App() {
  return (
    <Router>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <nav>
        <Link to="/">Autenticacion </Link><br />
        <Link to="/cash">Caja</Link><br />
        <Link to="/product">Gestion de Productos</Link><br />
        <Link to="/sell">Gestion de Ventas</Link><br />
        <Link to="/stock">Gestion de Inventarios</Link><br />
        <Link to="/user">Gestion de Usuarios</Link><br /><br />
      </nav>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/cash" element={<CashRegister />} />
        <Route path="/product" element={<Product />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/user" element={<User />} />
      </Routes>

    </Router>

  );
}

export default App;
// <div className="App">

      
    // </div>