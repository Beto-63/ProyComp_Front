import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../generic/LogoDOKO.svg';
import '../generic/Nav.css'

const GeneralMenu = () => {



    let navigate = useNavigate();
    const goToSales = () => {
        navigate('/sell');
    }
    const goToCashRegister = () => {
        navigate('/cash');
    }
    const goToProducts = () => {
        navigate('/product');
    }
    const goToStock = () => {
        navigate('/stock');
    }
    const goToUsers = () => {
        navigate('/user');
    }



    return (
        <div className='canvas_oscuro'>
            {/* Este Link debe cambiarse a "to='/Logout' cuando se monte la seguridad" */}

            <Link to="/logout" className='inicio'>Cerrar Sesión</Link>

            <p className="titulo_claro">Cómo quieres administrar tu tienda</p>

            <Container>
                <Row >
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToSales} >Ventas</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToCashRegister} >Caja</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToProducts} >Productos</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToStock} >Inventarios</button>
                    </Col>
                </Row>
                <Col>
                    <button className='btn-dark-bkg' onClick={goToUsers} >Usuarios</button>
                </Col>

            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}

export default GeneralMenu