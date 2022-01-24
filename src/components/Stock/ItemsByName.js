/**********************Importacion de Librerias****************************/

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Row, Container, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'

const schema = yup.object({
    /*El primero debe ser el tipo de dato y el ultimo debe ser el required*/
    name: yup.string().required('Este campo es requerido'),
    quantity: yup.number('El valor debeser numerico').moreThan(0, 'El valor debe ser positivo').required('Este campo es requerido'),
    channel: yup.string().required('Este campo es requerido'),
    cat_name: yup.string().required()
}).required();

const ItemsByName = () => {

    const [categories, setCategories] = useState([{}]);
    const [selectedNames, setSelectedNames] = useState([{}]);
    const [selectedItems, setSelectedItems] = useState([{}]);

    useEffect(() => {
        fetch(`${server}/product/categories`)
            .then(response => response.json())
            .then(json => setCategories(json));

    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        let obj = { name: data.name, channel: data.channel, qty: data.qty }
        console.log('desde boton', data)
        console.log("obj", obj)
        //Falta el mensaje de confirmacion
        reset();
    };

    const handleCatChange = () => {
        let obj = { cat_name: document.getElementById('cat_name').value };
        console.log('busqueda por cat_name', obj)
        fetch(`${server}/stock/findByCatName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => setSelectedNames(json));

    }

    const handleNameChange = () => {
        let obj = { name: document.getElementById('name').value };
        console.log(obj)
        console.log('buqueda por nombre', obj)
        fetch(`${server}/stock/findByName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => setSelectedItems(json));

    }

    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Agregar cantidad al sotock</p>
            <Link to="/" className='salir' >Salir</Link>
            <Link to="/stock" className='volver'>Volver</Link>
            <Container >
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <label htmlFor='cat_name' className='label'>Categoria del elemento</label>
                        <select {...register("cat_name")} onChange={handleCatChange}
                            className="campo_entrada"
                            placeholder="Categoria del Elemento"
                            id="cat_name"
                        >
                            <option value=''>Seleccione la categoría del Elemento</option>
                            {categories.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.cat_name?.message}</p>
                    </Row>
                    <Row>
                        <label htmlFor='name' className='label'>Nombre del elemento</label>
                        <select {...register("name")} onChange={handleNameChange}
                            className="campo_entrada container"
                            placeholder="Escoja el Item"
                            id='name'
                        >
                            <option value=''>Elemento a adicionar</option>
                            {selectedNames.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}|-----|{e.channel}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.qty?.name}</p>
                    </Row>
                    <Row>
                        <Table responsive="sm" >
                            <thead>
                                <tr>

                                    <th>Nombre</th>
                                    <th>Ubicación</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            {selectedItems.map((c, index) => {
                                return (
                                    <tbody key={index}>
                                        <tr>
                                            <td>{c.name}</td>
                                            <td>{c.channel}</td>
                                            <td>{c.quantity}</td>
                                        </tr>
                                    </tbody>
                                )
                            })}

                        </Table>
                    </Row>

                </form>
            </Container>
        </div >
    )
}

export default ItemsByName
