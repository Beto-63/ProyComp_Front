import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import BotonFondoOscuro from '../generic/BotonFondoOscuro';
import logo from '../generic/LogoDOKO.svg';
import '../generic/Nav.css'
import '../generic/BotonFondoOscuro.css'
import { useNavigate } from 'react-router-dom';

const NavStock = () => {
    let navigate = useNavigate();
    const goToCreate = () => {
        navigate('/product/create');
    }
    const goToAdjust = () => {
        navigate('/product/adjust');
    }
    return (
        <div className='canvas_oscuro'>
            <p className="titulo_claro">Gestión de Productos</p>
            <Container>
                <Row >
                    <Col>
                        <BotonFondoOscuro label='Creación de Producto' handleClick={goToCreate} />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Ajuste de Producto' handleClick={goToAdjust} />
                    </Col>
                </Row>
            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}

export default NavStock
