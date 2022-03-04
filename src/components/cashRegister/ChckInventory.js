import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
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
    let navigate = useNavigate();

    useEffect(() => {
        let data = { channel: channel }
        fetch(`${server}/stock/findByChannel`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
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
            fetch(`${server}/stock/adjust`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
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
        navigate('/cash')
    }




    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">{`Ajuste general de Inventario en ${channel}`}</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/menu" className='inicio'>Inicio</Link>
            <Link to="/cash" className='volver'>Volver</Link>
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
                                                onChange={(event) => { items[index].quantity = parseInt(event.target.value) }}
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
