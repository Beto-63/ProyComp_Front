import React, { useContext } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import SellTicketContext from '../../context/SellTicketContext';


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

    const { selected, setSelected } = useContext(SellTicketContext)

    let suma = null

    return (
        <div>
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th colSpan={2}>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selected.map((element, i) => {
                            return (
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{element.name}</td>
                                    <td><td><Form>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="number" placeholder="digite cantidad" name="amount" id="amount" />
                                    </Form.Group>
                                </Form></td></td>
                                    <td>{element.price}</td>
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
                        {selected.map(element => {
                            if (element.price) {
                                suma += element.price
                            }
                        })}
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
                    {medioPago.map(e => <option value={e.tipo}>{e.medio}</option>)}
                </select>
            </div>
            <Button type="submit">Vender</Button>
        </div>
    );
};

export default ProductSelectTable;
