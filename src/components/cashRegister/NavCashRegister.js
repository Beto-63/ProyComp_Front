import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import BotonFondoOscuro from '../generic/BotonFondoOscuro';
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
                <Row xs={2} md={4} lg={6}>
                    <Col>
                        <BotonFondoOscuro label='Apertura de caja' handleClick={goToOpen} />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Revisión de inventario' handleClick={goToCheckInventory} />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Cónsignacion' handleClick={goToDeposit} />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Gastos menores' handleClick={goToExpenses} />
                    </Col>
                </Row>
                <BotonFondoOscuro label='Cierre de caja' handleClick={goToClose} />
            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}

export default NavStock
