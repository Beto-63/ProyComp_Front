import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ProductSelectTable = () => {
    return (
        <div>
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Producto</th>
                            <th>Qty</th>
                            <th colSpan={2}>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Café en leche</td>
                            <td>10</td>
                            <td>5.000</td>
                            <td>Eliminar</td>
                        </tr>
                        <tr>
                            <th>2</th>
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
            <select>
                <option value=''>Elija Medio de Pago</option>
                <option value='Crédito'>Tarjeta de Crédito</option>
                <option value='Débito'>Tarjeta Débito</option>
                <option value='Efectivo'>Efectivo</option>
            </select>
            </div>
            <Button type="submit">Vender</Button>
        </div>
    );
};

export default ProductSelectTable;
