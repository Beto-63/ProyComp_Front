import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import BotonFondoOscuro from '../generic/BotonFondoOscuro';
import logo from '../generic/LogoDOKO.svg';
import './NavStock.css'

const NavStock = () => {
    const enruteCrear = () => {
        console.log('llamo la funcion');
        //quiero que se vaya a la pagina correspondiente
    }
    return (
        <div className='canvas_oscuro'>
            <p className="titulo_claro">Gestión de Inventario</p>
            <Container>
                <Row xs={2} md={4} lg={6}>
                    <Col>
                        <BotonFondoOscuro label='Creación elemento' handleClick={enruteCrear} />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Adición de cantidad' />
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
                        <BotonFondoOscuro label='Ajuste cantidad' />
                    </Col>
                </Row>
                <BotonFondoOscuro label='Ajuste a elemento' />
            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}

export default NavStock
