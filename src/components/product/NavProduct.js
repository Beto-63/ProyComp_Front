import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import logo from '../generic/LogoDOKO.svg';
import '../generic/Nav.css'
import { Link, useNavigate } from 'react-router-dom';

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
            <Link to="/" className='inicio' >Inicio</Link>
            <Link to="/menu" className='volver'>Volver</Link>
            {/* revisar a donde regresa la linea anterior */}
            <p className="titulo_claro">Gestión de Productos</p>
            <Container>
                <Row >
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToCreate} >Creación Producto</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToAdjust} >Ajuste a Producto</button>
                    </Col>
                </Row>
            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}

export default NavStock
