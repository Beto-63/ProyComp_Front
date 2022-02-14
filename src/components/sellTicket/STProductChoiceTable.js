import React, { useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap'
import { useContext } from 'react';
import SellTicketContext from '../../context/SellTicketContext';
import { useNavigate } from 'react-router-dom';


const STProductChoiceTable = () => {

    const objSelected = {
        name: '',
        id: '',
        price: '',
        temperature: '',
        amount: null
    }
    
    const objAmount = {
        amount: ''
    }    

    const { product, selected, setSelected } = useContext(SellTicketContext)

    const handleSelect = (e) => {
        let obj = { ...selected, id: e._id, name: e.name, price: e.price, temperature: e.temperature, amount: '' }
        //de esta forma se llena selected con el objeto pero se sobreescribe cada vez que seleccionamos un elemento
        /* setSelected(obj) */
        //de esta forma se guarda el array y se va llenando cada vez que seleccionamos un elemento
        let array = [...selected, obj]
        setSelected(array)
    }

    let indice = product.length - 1

    const handleSubmit = (event) => {
        event.preventDefault()
        navigate('/sell/productSelect')
    }

    const handleEdit = (id) => {
        const newSelected = selected.map((element)=>{
            if (element.id === id){
                return{
                    ...element,
                    amount: element.amount
                }
            }
            return element
        })
        setSelected(newSelected)
    }

    const handleRemove = (id)=>{
        const newSelected = selected.filter((select)=>select.id !== id)
        setSelected(newSelected)
    }
    
    //useEffect monitorea los cambios que se le hacen al dato que se pone dentro del corchete, si no se ponen datos monitorea toda la aplicación
    useEffect(() => {

    }, [product]);

    /* useEffect(()=>{
        setAmount({id: selected._id, amount: selected.amount})
    }, [selected]) */

    const navigate = useNavigate()

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
                        {selected.map((ele, j) => {
                            return (
                                <tr key={j}>
                                    <td>{j + 1}</td>
                                    <td>{ele.name}</td>
                                    <td>
                                        <Form.Group className="mb-3">
                                            <Form.Control onChange={(event)=>{handleEdit(ele.amount = parseInt(event.target.value))}} type="number" placeholder="digite cantidad" name="amount" id="amount" />
                                        </Form.Group>
                                    </td>
                                    <td>{ele.price}</td>
                                    <td>
                                        <>
                                            <div>
                                                <Button onClick={()=>{handleRemove(ele.id)}} variant="danger" size="sm" >
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
                <Button  type="submit">Validar</Button>
            </Form>
        </div>

    );
};

export default STProductChoiceTable;
