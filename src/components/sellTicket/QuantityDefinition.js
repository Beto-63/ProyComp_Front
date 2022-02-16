import React from 'react';
import { Table, Button } from 'react-bootstrap'
import { useContext } from 'react';
import SellTicketContext from '../../context/SellTicketContext';

const QuantityDefinition = () => {

    const { toSellProduct } = useContext(SellTicketContext);

    const handleSubmit = () => {
        //Pasar la info a saleSummary con cantidad y borrar el toSellProduct
    }

    return (
        <div>
            <Table striped bordered hover size="sm" onSubmit={handleSubmit}>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th colSpan={2}>Precio</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {toSellProduct.map((element, i) => {
                        return (
                            <tr key={i}>
                                <td>{element.name}</td>
                                <td>{element.price}</td>
                                <td>Cantidad</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Button type="submit">Agregar</Button>
        </div>
    )
}

export default QuantityDefinition