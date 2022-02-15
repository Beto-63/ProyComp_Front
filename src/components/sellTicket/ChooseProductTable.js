import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap'
import { useContext } from 'react';
import SellTicketContext from '../../context/SellTicketContext';

const STProductChoiceTable = () => {
    const { selectedProducts } = useContext(SellTicketContext)




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
                    {selectedProducts.map((element, i) => {
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
