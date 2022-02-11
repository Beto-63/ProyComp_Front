import React, { useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap'
import { useContext } from 'react';
import SellTicketContext from '../../context/SellTicketContext';

const STProductChoiceTable = () => {

    const objSelected = {
        name: '',
        stock_qty: '',
        price: '',
        temperature: '',
        amount: ''
    }
    const objAmount = {
        amount: ''
    }

    const { product, setProduct, selected, setSelected, amount, setAmount } = useContext(SellTicketContext)

    const handleSelect = (e) => {
        let obj = { ...selected, name: e.name, stock_qty: e.stock_qty, price: e.price, temperature: e.temperature }
        //de esta forma se llena selected con el objeto pero se sobreescribe cada vez que seleccionamos un elemento
        /* setSelected(obj) */
        //de esta forma se guarda el array y se va llenando cada vez que seleccionamos un elemento
        let array = [...selected, obj]
        setSelected(array)
    }
    console.log('Selected: ')
    console.log(selected)

    let indice = product.length - 1



    const handleAmount = (evt) => {
        let obj = { [evt.target.name]: evt.target.value }
        setAmount(obj)
    }
    //useEffect monitorea los cambios que se le hacen al dato que se pone dentro del corchete, si no se ponen datos monitorea toda la aplicación
    useEffect(() => {

    }, [product]);

    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Selección</th>
                    </tr>
                </thead>
                <tbody>
                    {product[indice] && product[indice].map((element, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{element.name}</td>
                                <td>{element.price}</td>
                                <td>
                                    <>
                                        <div>
                                            <Button variant="primary" size="sm" onClick={() => { handleSelect(element) }}>
                                                Seleccionar
                                            </Button>{' '}
                                            {/* <Button variant="secondary" size="sm" >
                                                Seleccionar
                                            </Button> */}
                                        </div>
                                    </>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

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
                    {selected.map((ele, j) => {
                        return (
                            <tr key={j}>
                                <td>{j + 1}</td>
                                <td>{ele.name}</td>
                                <td>cantidad</td>
                                <td>{ele.price}</td>
                                <td>
                                    <>
                                        <div>
                                            <Button variant="danger" size="sm" >
                                                Eliminar
                                            </Button>{' '}
                                            {/* <Button variant="secondary" size="sm" >
                                                Seleccionar
                                            </Button> */}
                                        </div>
                                    </>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="number" placeholder="digite cantidad" name="amount" id="amount" />
                </Form.Group>
            </Form>
            <Button type="submit">Validar</Button>
        </div>

    );
};

export default STProductChoiceTable;
