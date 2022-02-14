import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'
import CashContext from "../../context/CashContext";


const ChckInventory = () => {
    let items = [];
    const [stockItems, setStockItems] = useState([{}]);
    const { channel } = useContext(CashContext)

    useEffect(() => {
        let data = { channel: channel }
        fetch(`${server}/stock/findByChannel`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => setStockItems(json));
    }, [channel]);

    const createItemsCopy = () => {
        items = stockItems
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let termino = true
        items.map((e) => {
            let data = { ...e, ...{ id: e._id } }
            console.log('data modificado', data)
            fetch(`${server}/stock/adjust`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.status !== 201) { termino = false };
                    response.json()
                })
                .then(json => console.log(JSON.stringify(json)))

        })
        console.log("termino", termino)
    }




    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">{`Ajuste general de Inventario en ${channel}`}</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/" className='inicio'>Inicio</Link>
            <Link to="/stock" className='volver'>Volver</Link>
            {console.log('lista', stockItems)}
            {createItemsCopy()}
            <Container >
                <form onSubmit={handleSubmit}>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Té/Inf</th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Corrección</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((e, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{e.cat_name}</td>
                                        <td>{e.name}</td>
                                        <td>{e.quantity}</td>
                                        <td>
                                            <input defaultValue={e.quantity}
                                                // onChange={(event) => console.log(event.target.value)}
                                                onChange={(event) => { items[index].quantity = parseInt(event.target.value); console.log(items[index].quantity) }}
                                            />

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <button className='btn-light-bkg' type="submit">Aplicar</button>
                </form>
            </Container>
        </div>
    )
}
export default ChckInventory
