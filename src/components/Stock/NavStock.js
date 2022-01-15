import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import BotonFondoOscuro from '../generic/BotonFondoOscuro';
import logo from '../generic/LogoDOKO.svg';
import '../generic/Nav.css'

const NavStock = () => {
    let navigate = useNavigate();
    const goToCreate = () => {
        navigate('/stock/create');
    }
    const goToAdjust = () => {
        navigate('/stock/adjust');
    }
    const goToAdd = () => {
        navigate('/stock/add');
    }
    return (
        <div className='canvas_oscuro'>
            <p className="titulo_claro">Gestión de Inventario</p>
            <Link to="/" className='salir' >Salir</Link>
            <Link to="/" className='volver'>Volver</Link>
            {/* revisar a donde regresa la linea anterior */}
            <Container>
                <Row xs={2} md={4} lg={6}>
                    <Col>
                        <BotonFondoOscuro label='Creación elemento' handleClick={goToCreate} >
                            <Link to='/stock/create' />
                        </BotonFondoOscuro>
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Adición de cantidad' handleClick={goToAdd} />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Consulta X nombre' />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='X nombre -ubicación' />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Traslado cantidad' />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Ajuste cantidad' handleClick={goToAdjust} />
                    </Col>
                </Row>
                <BotonFondoOscuro label='Ajuste a elemento' />
            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}

export default NavStock
