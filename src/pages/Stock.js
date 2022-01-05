import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import GeneralNav from '../components/generic/GeneralNav';

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
            <GeneralNav />
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
/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   const response = await fetch(url= ' ', objOptions = { });
  
   objOPtions = {                   **********************Opciones Validas**************************
    method: 'GET',                  **** GET*, POST, PUT, DELETE, PATCH, etc.                    ****
    mode: 'cors',                   **** no-cors, cors*, same-origin                             ****
    cache: 'no-cache',              **** default*, no-cache, reload, force-cache, only-if-cached ****
    credentials: 'same-origin',     **** include, same-origin*, omit                             ****
    headers: {                      **** application/json, application/x-www-form-urlencoded    ****
      'Content-Type': 'application/json'
    },
    redirect: 'follow',             **** manual, follow*, error                                 ****
    referrerPolicy: 'no-referrer',  **** no-referrer, no-referrer-when-downgrade*, origin, 
                                    **** origin-when-cross-origin, same-origin, strict-origin, 
                                    ****strict-origin-when-cross-origin, unsafe-url             ****
    body: JSON.stringify(data)      **** body data type must match "Content-Type" header        ****
                                    ****************************************************************
  }

   const data = await response.json();  data va a contener en un JSON lo que devuelva la consulta
 **+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */