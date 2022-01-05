import React, { useState } from 'react'
import { Table } from 'react-bootstrap'

function Stock() {
    const [items, setItems] = useState([]);

    async function getData() {
        const response = await fetch("https://dokotestback.herokuapp.com/stock");
        const data = await response.json();
        setItems(data);
    }
    getData();
    return (
        <>
            <h2>Inventarios</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((items, index) => (
                        <tr key={index}>
                            <td>{items.channel}</td>
                            <td>{items.name}</td>
                            <td>{items.quantity}</td>
                            <td>{items.status}</td>
                        </tr>
                    ))}

                </tbody>
            </Table>

        </>
    )
}

export default Stock
