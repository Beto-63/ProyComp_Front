import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../generic/LogoDOKO.svg';
import '../generic/Nav.css'

const NavStock = () => {
    let navigate = useNavigate();
    const goToCreate = () => {
        navigate('/stock/create');
    }
    const goToAdd = () => {
        navigate('/stock/add');
    }
    const goToItemByName = () => {
        navigate('/stock/getbyname');
    }
    const goToItemByNameChanne = () => {
        navigate('/stock/getbynameandchannel');
    }
    const goToTransfer = () => {
        navigate('/stock/transfer');
    }
    const goToAdjustQ = () => {
        navigate('/stock/adjustquantity');
    }
    const goToAdjustE = () => {
        navigate('/stock/adjustelement');
    }

    return (
        <div className='canvas_oscuro'>
            <p className="titulo_claro">Gestión de Inventario</p>
            <Link to="/" className='salir' >Salir</Link>
            <Link to="/" className='volver'>Volver</Link>
            {/* revisar a donde regresa la linea anterior */}
            <Container>
                <Row  >
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToCreate} >Creación elemento</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToAdd} >Adición de cantidad</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToItemByName} >Consulta X nombre</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToItemByNameChanne} >X nombre -ubicación</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToTransfer} >Traslado cantidad</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToAdjustQ} >Ajuste cantidad</button>
                    </Col>
                </Row>
                <button className='btn-dark-bkg' onClick={goToAdjustE} >Ajuste a elemento</button>
            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}

export default NavStock
