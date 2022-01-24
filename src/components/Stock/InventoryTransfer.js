import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

/**********************Importacion de Componentes**************************/

import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'

const schema = yup.object({
    /*El primero debe ser el tipo de dato y el ultimo debe ser el required*/
    name: yup.string().required('Ingresa el nombre del elemento inventariable'),
    qty: yup.number().typeError('Cantidad a trasladar').moreThan(0, 'El valor debe ser positivo').required('Se requiere ingresar cantidad'),
    cat_name: yup.string().required('La categoria sirve para hacer mas cortas las selecciones'),
    source: yup.string().required('Lugar de donde sale la cantidad'),
    destination: yup.string().required('Lugar a donde se manda la cantidad'),

    //    cat: yup.string().required()
});

const InventoryTransfer = () => {
    const [selectedNames, setSelectedNames] = useState([{}]);
    const [categories, setCategories] = useState([{}]); //Esto puede pasar au una contexto
    const [ubicaciones, setUbicaciones] = useState([{}]);
    const [response, setResponse] = useState({});

    useEffect(() => {
        fetch(`${server}/stock/channels`)
            .then(response => response.json())
            .then(json => setUbicaciones(json));
    }, [])

    useEffect(() => {
        fetch(`${server}/product/categories`)
            .then(response => response.json())
            .then(json => setCategories(json));
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        console.log('desde boton', data)
        fetch(`${server}/stock/transfer`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            //enviamos los datos por body y se debe convertir el objeto en JSON
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => setResponse(json));
        console.log(response)
        reset();
    };

    const handleCatChange = () => {
        let obj = { cat_name: document.getElementById('cat_name').value };
        console.log(obj)
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


    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Traslado de cantidades </p>
            <Link to="/" className='salir' >Salir</Link>
            <Link to="/stock" className='volver'>Volver</Link>
            <Container >
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <label htmlFor='cat_name' className='label'>Categoria del elemento</label>
                        <select {...register("cat_name")}
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
                        <label htmlFor='source' className='label'>Ubicación Origen</label>
                        <select {...register("source")}
                            className="campo_entrada"
                            placeholder="Ubicación Física"
                            id='source' onChange={handleCatChange}
                        >
                            <option value=''>Ingrese Ubicacion</option>
                            {/* Asi se customizan las listas de seleccion directamente desde la base de datos */}
                            {ubicaciones.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.source?.message}</p>
                    </Row>
                    <Row>
                        <label htmlFor='name' className='label'>Nombre del elemento a trasladar</label>
                        <select {...register("name")} on
                            className="campo_entrada container"
                            placeholder="Escoja el Item"
                        >
                            <option value=''>Elemento a adicionar</option>
                            {selectedNames.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{`De :${e.name}, se tiene disponibles ${e.quantity}`}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.name?.message}</p>
                    </Row>
                    <Row>
                        <label htmlFor='destination' className='label'>Ubicación Destino</label>
                        <select {...register("destination")} onChange={handleCatChange}
                            className="campo_entrada"
                            placeholder="Ubicación Física"
                        >
                            <option value=''>Ingrese Ubicacion</option>
                            {/* Asi se customizan las listas de seleccion directamente desde la base de datos */}
                            {ubicaciones.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.destination?.message}</p>
                    </Row>

                    <Row>
                        <input {...register("qty")}
                            className="campo_entrada"
                            placeholder="Cantidad (gr/unidades)"
                        />
                        <p className='error'>{errors.qty?.message}</p>
                    </Row>
                    <button className='btn-light-bkg' type="submit" >Trasladar</button>
                </form>
            </Container>

        </div >
    )
}

export default InventoryTransfer
