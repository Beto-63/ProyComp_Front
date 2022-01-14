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
            <p className="titulo_claro">Gestiona tu caja</p>
            <Container>
                <Row xs={2} md={4} lg={6}>
                    <Col>
                        <BotonFondoOscuro label='Apertura de caja' handleClick={enruteCrear} />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Revisión de inventario' />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Cónsignacion' />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Gastos menores' />
                    </Col>
                </Row>
                <BotonFondoOscuro label='Cierre de caja' />
            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}

export default NavStock
