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
    name: yup.string().trim().required('Ingresa el nombre del elemento inventariable'),
    qty: yup.number().typeError('Cantidad a trasladar').moreThan(0, 'El valor debe ser positivo').required('Se requiere ingresar cantidad'),
    cat_name: yup.string().trim().required('La categoria sirve para hacer mas cortas las selecciones'),
    source: yup.string().trim().required('Lugar de donde sale la cantidad'),
    destination: yup.string().trim().required('Lugar a donde se manda la cantidad'),
});

const InventoryTransfer = () => {
    const [selectedNames, setSelectedNames] = useState([{}]);
    const [categories, setCategories] = useState([{}]);
    const [ubicaciones, setUbicaciones] = useState([{}]);


    useEffect(() => {
        fetch(`${server}/stock/channels`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify()
        })
            .then(response => response.json())
            .then(json => setUbicaciones(json));
    }, [])

    useEffect(() => {
        fetch(`${server}/product/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify()
        })
            .then(response => response.json())
            .then(json => setCategories(json));
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const handleGetCatName = () => {
        let obj = {
            cat_name: document.getElementById('cat_name').value
        };
        fetch(`${server}/stock/findByCatName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => setSelectedNames(json));
    }

    const onSubmit = (data) => {
        let obj = {
            destination: data.destination,
            name: data.name,
            qty: data.qty,
            source: data.source
        }

        fetch(`${server}/stock/transfer`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => window.alert(JSON.stringify(json)))
        reset();
    };


    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Traslado de cantidades </p>
            <Link to="/menu" className='inicio' >Inicio</Link>
            <Link to="/stock" className='volver'>Volver</Link>
            <Container >
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <label htmlFor='cat_name' className='label'>Categoria del elemento</label>
                        <select {...register("cat_name")}
                            className="campo_entrada"
                            placeholder="Categoria del Elemento"
                            id="cat_name"
                            onBlur={handleGetCatName}
                        >
                            <option value=''>Seleccione la categor??a del Elemento</option>
                            {categories.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.cat_name?.message}</p>
                    </Row>
                    <Row>
                        <label htmlFor='name' className='label'>Nombre del elemento a trasladar</label>
                        <select {...register("name")}
                            className="campo_entrada container"
                            placeholder="Escoja el Item"
                        >
                            <option value=''>Selecciona...</option>
                            {selectedNames.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >
                                        {`El inventario de ${e.name} es ${e.quantity} en ${e.channel}`}
                                    </option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.name?.message}</p>
                    </Row>
                    <Row>
                        <label htmlFor='source' className='label'>Ubicaci??n Origen</label>
                        <select {...register("source")}
                            className="campo_entrada"
                            placeholder="Ubicaci??n F??sica"
                            id='source'
                        // onChange={handleCatChange}
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
                        <label htmlFor='destination' className='label'>Ubicaci??n Destino</label>
                        <select {...register("destination")}
                            // onChange={handleCatChange}
                            className="campo_entrada"
                            placeholder="Ubicaci??n F??sica"
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
