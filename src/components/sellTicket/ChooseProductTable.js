import React from 'react';
import { Table, Button } from 'react-bootstrap'
import { useContext } from 'react';
import SellTicketContext from '../../context/SellTicketContext';
import QuantityDefinition from './QuantityDefinition';

const STProductChoiceTable = () => {
    const { selectedProducts, toSellProducts, setToSellProducts } = useContext(SellTicketContext)

    const handleSelect = (e) => {
        let tempArray = []
        if (toSellProducts.length === 0) {
            tempArray[0] = e
        } else {
            tempArray = [...toSellProducts, e]
        }
        console.log(tempArray)
        setToSellProducts(tempArray)
    }


    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Temp</th>
                        <th>Precio</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {selectedProducts.map((element, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{element.name}</td>
                                <td>{element.temperature}</td>
                                <td>{element.price}</td>
                                <td>
                                    <Button variant="primary" size="sm" onClick={() => { handleSelect(element) }}>
                                        Seleccionar
                                    </Button>{' '}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Button type="submit">Validar</Button>

        </div>
    );
};

export default STProductChoiceTable;
