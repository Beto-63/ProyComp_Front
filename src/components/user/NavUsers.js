import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../generic/LogoDOKO.svg';
import '../generic/Light-bkg.css'

const NavUsers = () => {
    let navigate = useNavigate();
    const goToRegisterUser = () => {
        navigate('/user/createUser');
    }

    const goToAdjustUser = () => {
        navigate('/user/adjustUser');
    }

    return (
        <div className='canvas_oscuro'>
            <p className="titulo_claro">Usuarios</p>
            <Link to="/menu" className='inicio' >Inicio</Link>
            <Link to="/menu" className='volver'>Volver</Link>
            <Container>
                <Row >
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToRegisterUser} >Crear usuario</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToAdjustUser}>Ajuste de Usuario</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' >Gestión de Roles</button>
                        {/* esto va para version 2 */}
                    </Col>
                </Row>
            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}

export default NavUsers