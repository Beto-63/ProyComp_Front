import React from 'react'
import { Navbar, Container, Offcanvas, Nav } from 'react-bootstrap'
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
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="#action1"><Link to="/cash">Caja</Link></Nav.Link>
                                <Nav.Link href="#action2"><Link to="/product">Gestion de Productos</Link></Nav.Link>
                                <Nav.Link href="#action2"><Link to="/sell">Gestion de Ventas</Link></Nav.Link>
                                <Nav.Link href="#action2"><Link to="/stock">Gestion de Inventarios</Link></Nav.Link>
                                <Nav.Link href="#action2"><Link to="/user">Gestion de Usuarios</Link></Nav.Link>
                                <Nav.Link href="#action2"><Link to="/">REGRESAR</Link></Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    )
}

export default GeneralNav
