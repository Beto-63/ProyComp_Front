import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap'
import { useContext } from 'react';
import AppContext from '../../context/AppContext';

const STProductChoiceTable = () => {
    const { getProductByCatName } = useContext(AppContext)
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getProductByCatName().then(async resp => {
            let json = await resp.json();
            setProduct(json)
        })
    }, []);

    return (
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
                    {product.map((element, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{element.name}</td>
                                <td>Cantidad</td>
                                <td>{element.price}</td>
                                <td>Seleccionar</td>
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
