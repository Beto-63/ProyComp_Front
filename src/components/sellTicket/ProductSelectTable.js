import React from 'react';
import { Table, Button } from 'react-bootstrap';

let array = [{
    producto: 'Café en Leche',
    cantidad: 10,
    precio: 5000
}, {
    producto: 'Tinto Negro',
    cantidad: 4,
    precio: 4000
}]
let suma = null
array.map(element => {
    if (element.precio) {
        suma += element.precio
    }
})
let medioPago = [{
    tipo: 'Crédito',
    medio: 'Tarjeta de Crédito'
}, {
    tipo: 'Débito',
    medio: 'Tarjeta Débito'
}, {
    tipo: 'Efectivo',
    medio: 'Efectivo'
}]
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
                        {array.map((element, i) => {
                            return (
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{element.producto}</td>
                                    <td>{element.cantidad}</td>
                                    <td>{element.precio}</td>
                                    <td>
                                    <>
                                        <div>
                                            <Button variant="danger" size="sm" >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
                <Table striped bordered hover size="sm">
                    <tbody>
                        <tr>
                            <td>Total</td>

                            <td>{suma}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div>
                <p>Medio de Pago</p>
                <select>
                    <option value=''>Elija Medio de Pago</option>
                    {medioPago.map(e=> <option value={e.tipo}>{e.medio}</option>)}
                </select>
            </div>
            <Button type="submit">Vender</Button>
        </div>
    );
};

export default ProductSelectTable;
