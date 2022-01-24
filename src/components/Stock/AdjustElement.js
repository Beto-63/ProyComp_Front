/**********************Importacion de Librerias****************************/

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
    name: yup.string().required('Este campo es requerido').min(6, 'Debe tener por lo menos 6 caracteres'),
    nameEdit: yup.string(),
    qty: yup.number().moreThan(0, 'El valor debe ser positivo').required('Este campo es requerido'),
    channel: yup.string().required('Este campo es requerido'),
    channelEdit: yup.string(),
    cat_name: yup.string().required(),
    cat_nameEdit: yup.string()
    //    cat: yup.string().required()
});

const AdjustElement = () => {

    const [selectedNames, setSelectedNames] = useState([{}]);
    const [categories, setCategories] = useState([{}]); //Esto puede pasar au una contexto
    const [ubicaciones, setUbicaciones] = useState([{}]);
    const [response, setResponse] = useState([{}]);


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
        //Falta el mensaje de confirmacion
        let obj = { name: data.nameEdit, channel: data.channelEdit, cat_name: data.qty }
        console.log('desde boton', data)
        console.log("obj", obj)
        fetch(`${server}/stock/adjust`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            //enviamos los datos por body y se debe convertir el objeto en JSON
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => setResponse(json));
        console.log(response);
        reset();
    };

    const handleCatChange = () => {
        let obj = { cat_name: document.getElementById('cat_name').value };
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
            <p className="titulo_oscuro">Elemento que quieres ajustar</p>
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
                        <label htmlFor='channel' className='label'>Ubicación</label>
                        <select {...register("channel")} onChange={handleCatChange}
                            className="campo_entrada"
                            placeholder="Ubicación Física"
                            id='ubicacion'
                        >
                            <option value=''>Ingrese Ubicacion</option>
                            {/* Asi se customizan las listas de seleccion directamente desde la base de datos */}
                            {ubicaciones.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.channel?.message}</p>
                    </Row>
                    <Row>
                        <label htmlFor='name' className='label'>Nombre del elemento que requiere modificación</label>
                        <select {...register("name")} on
                            className="campo_entrada container"
                            placeholder="Escoja el Item"
                            id='name'
                        >
                            <option value=''>Elemento a adicionar</option>
                            {selectedNames.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.qty?.name}</p>
                    </Row>
                    <br /><br />


                    <p className="titulo_oscuro">Ingresa la nueva información </p>
                    <Row>
                        <input {...register("nameEdit")}
                            className="campo_entrada"
                            placeholder="Nombre corregido"
                        />
                        <p className='error'>{errors.nameEdit?.message}</p>
                    </Row>
                    <Row>
                        <label htmlFor='ChannelEdit' className='label'>Ubicación corregida</label>
                        <select {...register("channelEdit")}
                            className="campo_entrada"
                            placeholder="Ubicación Corregida"
                            id='channeledit'
                        >
                            <option value=''>Ingrese Ubicacion</option>
                            {/* Asi se customizan las listas de seleccion directamente desde la base de datos */}
                            {ubicaciones.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.channelEdit?.message}</p>
                    </Row>
                    <Row>
                        <label htmlFor='cat_nameEdit' className='label'>Categoria corregida</label>
                        <select {...register("cat_nameEdit")}
                            className="campo_entrada"
                            placeholder="Categoria corregida"
                            id="cat_nameEdit"
                        >
                            <option value=''>Seleccione la categoría del Elemento</option>
                            {categories.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.cat_nameEdit?.message}</p>
                    </Row>
                    <button className='btn-light-bkg' type="submit" >Corregir</button>



                </form>
            </Container>

        </div >
    );
}



export default AdjustElement
