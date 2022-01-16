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
                        <BotonFondoOscuro label='Consulta X nombre' handleClick={goToItemByName} />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='X nombre -ubicación' handleClick={goToItemByNameChanne} />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Traslado cantidad' handleClick={goToTransfer} />
                    </Col>
                    <Col>
                        <BotonFondoOscuro label='Ajuste cantidad' handleClick={goToAdjustQ} />
                    </Col>
                </Row>
                <BotonFondoOscuro label='Ajuste a elemento' handleClick={goToAdjustE} />
            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}

export default NavStock
