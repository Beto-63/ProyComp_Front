import React from 'react'
import { Navbar, Container, Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function GeneralNav() {
    return (
        <div>
            <Navbar bg="light" expand={false}>
                <Container fluid>
                    <Navbar.Brand href="#">Sistema de Gestion de EL DOKO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>

                            <Link to="/cash">Caja</Link><br />
                            <Link to="/product">Gestion de Productos</Link><br />
                            <Link to="/sell">Gestion de Ventas</Link><br />
                            <Link to="/stock">Gestion de Inventarios</Link><br />
                            <Link to="/user">Gestion de Usuarios</Link><br />
                            <Link to="/">REGRESAR</Link>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    )
}

export default GeneralNav
