import React, { useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import CashContext from "../../context/CashContext";

import logo from '../generic/LogoDOKO.svg';
import '../generic/Nav.css'

const NavCashRegister = () => {

    const { lastClose, lastOpen, setConfirmacion, confirmacion } = useContext(CashContext)


    let navigate = useNavigate();
    const goToOpen = () => {
        navigate('/cash/open');
    }
    const goToCheckInventory = () => {
        navigate('/cash/checkinventory');
    }
    const goToDeposit = () => {
        navigate('/cash/deposit');
    }
    const goToExpenses = () => {
        navigate('/cash/expenses');
    }
    const goToClose = () => {
        navigate('/cash/close');
    }

    const handleOpen = () => {
        console.log("Apertura", lastOpen.length)
        console.log("Cierre", lastClose.length)

        if (lastOpen.length === 0 && lastClose.length === 1) {
            goToOpen()
        } else {
            if (lastOpen.length === 1 && lastClose.length === 0) {
                setConfirmacion("Tienes un cierre pendiente")
            } else {
                setConfirmacion("Error en la base de datos")
            }
        }
    }
    console.log("objApertura", lastOpen)
    console.log("ObjCierre", lastClose)

    const handleClose = () => {
        console.log("Apertura", lastOpen.length)
        console.log("Cierre", lastClose.length)

        if (lastOpen.length === 1 && lastClose.length === 0) {
            goToClose()
        } else {
            if (lastOpen.length === 0 && lastClose.length === 1) {
                setConfirmacion("Tienes una apertura pendiente")
            } else {
                setConfirmacion("Error en la base de datos")
            }
        }
    }

    return (
        <div className='canvas_oscuro'>
            <Link to="/" className='inicio' >Inicio</Link>
            <Link to="/" className='volver'>Volver</Link>
            {/* revisar a donde regresa la linea anterior */}
            <p className="titulo_claro">Gestiona tu caja</p>
            {/* <h4>{confirmacion}</h4> */}
            <Container>
                <Row >
                    <Col>
                        <button className='btn-dark-bkg' onClick={handleOpen} >Apertura de caja</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToCheckInventory} >Revisión de inventario</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToDeposit} >Consignación</button>
                    </Col>
                    <Col>
                        <button className='btn-dark-bkg' onClick={goToExpenses} >Gastos menores</button>
                    </Col>

                </Row>
                <button className='btn-dark-bkg' onClick={handleClose} >Cierre de caja</button>
                <h3 className='openclose'>{confirmacion}</h3>
            </Container>
            <img src={logo} alt='logo de El DOKO' className='footer' />
        </div>
    )
}

export default NavCashRegister
