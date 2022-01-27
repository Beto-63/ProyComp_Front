import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


import logo from '../generic/LogoDOKO.svg';
import '../generic/Nav.css'

const NavStock = () => {
    let navigate = useNavigate();
    const goToOpen = () => {
        navigate('/cash/open');
    }
    const goToCheckInventory = () => {
        navigate('/cash/checkinventory');
    }
    const goToDeposit = () => {
        navigate('/cash/deposit');
    }
    const goToExpenses = () => {
        navigate('/cash/expenses');
    }
    const goToClose = () => {
        navigate('/cash/close');
    }

    return (
        <div className='canvas_oscuro'>
            <Link to="/" className='salir' >Salir</Link>
            <Link to="/" className='volver'>Volver</Link>
            {/* revisar a donde regresa la linea anterior */}
            <p className="titulo_claro">Gestiona tu caja</p>
            <Container>
                <Row >
                    <Col>
                        <button className='btn-dark-bkg' handleClick={goToOpen} >Apertura de caja;</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' handleClick={goToCheckInventory} >Revisión de inventario</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' handleClick={goToDeposit} >Consignación</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' handleClick={goToExpenses} >Gastos menores</button>
                    </Col>

                </Row>
                <button className='btn-dark-bkg' handleClick={goToClose} >Cierre de caja</button>
            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}

export default NavStock
