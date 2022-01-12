import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import BotonFondoOscuro from './BotonFondoOscuro';
import logo from './LogoDOKO.svg';
import './CanvasOscuro.css'

const CanvasOscuro = () => {
    return (
        <div className='canvas_oscuro'>
            <Container>
                <p>El contenido presentato en el containtner debera cambiar segun se requiera,
                    el logo y el fondo son el canvas</p>
                <Row>
                    <Col>
                        <BotonFondoOscuro action='Primera accion' />
                    </Col>
                    <Col>
                        <BotonFondoOscuro action='Segunda accion' />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <BotonFondoOscuro action='Tercera accion' />
                    </Col>
                    <Col>
                        <BotonFondoOscuro action='Cuarta accion' />
                    </Col>
                </Row>
                <BotonFondoOscuro action='Quinta accion' />
            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}
export default CanvasOscuro
