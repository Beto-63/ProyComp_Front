import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Row, Container, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'
import CashContext from "../../context/CashContext";

const schema = yup.object({

    amount: yup.number().typeError('Aqui va la cantidad gastada').required(),
    //channel: yup.string().trim().required('Por ser inventariable debe asignarsele un lugar físico'),
});


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
    }, []);

    const createItemsCopy = () => {
        items = stockItems
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Lista Cambiada', items)
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
                    <button className='btn-light-bkg' type="submit">Corregir cantidades</button>
                </form>
            </Container>
        </div>
    )
}

export default ChckInventory
