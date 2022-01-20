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
                <Row >
                    <Col>
                        <button className='btn-dark-bkg' onClick={enruteCrear} >Crear usuario</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' >Ajuste de Usuario</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' >Gestión de Roles</button>
                    </Col>
                </Row>
            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}

export default NavStock
