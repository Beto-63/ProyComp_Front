import React from 'react';
import { Table, Dropdown, Button } from 'react-bootstrap';

const ProductSelectTable = () => {
    return (
        <div>
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Qty</th>
                            <th colSpan={2}>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Café en leche</td>
                            <td>10</td>
                            <td>5.000</td>
                            <td>Eliminar</td>
                        </tr>
                        <tr>
                            <td>Tinto Negro</td>
                            <td>4</td>
                            <td>4.000</td>
                            <td>Eliminar</td>
                        </tr>
                    </tbody>
                </Table>
                <Table striped bordered hover size="sm">
                    <tbody>
                        <tr>
                            <td>Total</td>
                            <td>9.000</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div>
            <p>Medio de Pago</p>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Elija Medio de Pago
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item name='nombre' href="#/action-1">Tarjeta de Crédito</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Tarjeta Débito</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Efectivo</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
            <Button type="submit">Vender</Button>
        </div>
    );
};

export default ProductSelectTable;
