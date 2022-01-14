import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import BotonFondoOscuro from '../generic/BotonFondoOscuro';
import logo from '../generic/LogoDOKO.svg';
import '../generic/Nav.css'

const NavStock = () => {
    const enruteCrear = () => {
        console.log('llamo la funcion');
        //quiero que se vaya a la pagina correspondiente
    }
    return (
        <div className='canvas_oscuro'>
            <p className="titulo_claro">Usuarios</p>
            <Container>
                <Row xs={2} md={4} lg={6}>
                    <Col>
                        <BotonFondoOscuro label='Crear usuario' handleClick={enruteCrear} />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Ajuste de Usuario' />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Gestión de Roles' />
                    </Col>
                </Row>
            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}

export default NavStock
