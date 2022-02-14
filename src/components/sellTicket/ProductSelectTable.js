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

    const { selected, setSelected, sellTicket, setSellTicket } = useContext(SellTicketContext)

    const handleSellTicket = () => {
        let obj = {...selected, client_id: '', products_sold: '', amount_sold: '', channel_id: '', payment_method_id: '', user_id: '', status: '' }
        //de esta forma se llena selected con el objeto pero se sobreescribe cada vez que seleccionamos un elemento
        /* setSelected(obj) */
        //de esta forma se guarda el array y se va llenando cada vez que seleccionamos un elemento
        let array = [obj]
        setSellTicket(obj)
        console.log('sellticket: ')
        console.log(sellTicket)
    }


    let suma = null

    const handleRemove = (id) => {
        const newSelected = selected.filter((select) => select.id !== id)
        setSelected(newSelected)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleSellTicket()
        console.log('haciendo submit')
    }
    return (
        <div>
            <div>
                <Form onSubmit={handleSubmit}>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selected.map((element, i) => {
                                return (
                                    <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td>{element.name}</td>
                                        <td>{element.amount}</td>
                                        <td>{element.price}</td>
                                        <td>
                                            <>
                                                <div>
                                                    <Button onClick={() => { handleRemove(element.id) }} variant="danger" size="sm" >
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
                                let multiplicacion = (element.amount * element.price)
                                suma += multiplicacion
                            }
                        })}
                        <tr>
                            <td>Total</td>

                            <td>{suma}</td>
                        </tr>
                    </tbody>
                </Table>
                <p>Medio de Pago</p>
                <select>
                    <option value=''>Elija Medio de Pago</option>
                    {medioPago.map(e => <option name='medio' value={e.tipo}>{e.medio}</option>)}
                </select>
                <br/>
                <Button type="submit">Vender</Button>
                </Form>
            </div> 
        </div>
        
    );
};

export default ProductSelectTable;
