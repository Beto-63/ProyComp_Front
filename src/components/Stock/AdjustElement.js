/**********************Importacion de Librerias****************************/

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
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
    nameEdit: yup.string(),
    channel: yup.string().required('Por ser inventariable debe asignarsele un lugar físico'),
    channelEdit: yup.string(),
    cat_name: yup.string().required('La categoria sirve para hacer mas cortas las selecciones'),
    cat_nameEdit: yup.string(),
    statusEdit: yup.number()
});

const AdjustElement = () => {

    const [selectedNames, setSelectedNames] = useState([{}]);
    const [categories, setCategories] = useState([{}]); //Esto puede pasar au una contexto
    const [ubicaciones, setUbicaciones] = useState([{}]);
    const [response, setResponse] = useState([{}]);
    const [toEdit, setToEdit] = useState({

        id: '',
        name: '',
        channel: '',
        cat_name: '',
        status: null
    });


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
        // Aqui armo el objeto que actualiza la informacion en la BD dependiendo de que cambio...
        let newObj = { id: toEdit._id, status: data.statusEdit }
        console.log("nuevo dato antes", newObj)
        if (data.nameEdit != '') {
            newObj = { ...newObj, name: data.nameEdit }
        } else {
            newObj = { ...newObj, name: data.name }
        }
        if (data.channelEdit != '') {
            newObj = { ...newObj, channel: data.channelEdit.trim() }
        } else {
            newObj = { ...newObj, channel: data.channel.trim() }
        }
        if (data.cat_nameEdit != '') {
            newObj = { ...newObj, cat_name: data.cat_nameEdit }
        } else {
            newObj = { ...newObj, cat_name: data.cat_name }
        }

        fetch(`${server}/stock/adjust`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            //enviamos los datos por body y se debe convertir el objeto en JSON
            body: JSON.stringify(newObj)
        })
            .then(response => response.json())
            .then(json => setResponse(json));
        reset();
    };

    const handleCatChange = () => {
        let obj = {
            cat_name: document.getElementById('cat_name').value,
            channel: (document.getElementById('channel').value).trim(),
        };
        console.log(obj)
        fetch(`${server}/stock/findByCatNameChannel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => setSelectedNames(json));
    }

    const handleEdit = () => {
        let obj = {
            name: (document.getElementById('name').value).trim(),
            channel: (document.getElementById('channel').value).trim(),
        }
        console.log(obj)
        fetch(`${server}/stock/findByNameChannel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => setToEdit(json));
    }


    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Elemento que quieres ajustar</p>
            <Link to="/" className='inicio' >Inicio</Link>
            <Link to="/stock" className='volver'>Volver</Link>
            <Container >
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Col>
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
                            <select {...register("channel")} onBlur={handleCatChange}
                                className="campo_entrada"
                                placeholder="Ubicación Física"
                                id='channel'
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
                            <select {...register("name")}
                                className="campo_entrada container"
                                placeholder="Escoja el Item"
                                id='name' onChange={handleEdit}
                            >
                                <option value=''>Elemento a adicionar</option>
                                {selectedNames.map((e, index) => {
                                    return (
                                        <option key={index} value={e.name} >{e.name}</option>
                                    )
                                })}
                            </select>
                            <p className='error'>{errors.name?.name}</p>
                        </Row>

                    </Col>
                    {/********************************************************************************* */}
                    <Col>
                        <p className="titulo_oscuro">Ingresa la nueva información </p>
                        <Row>
                            <label htmlFor='nameEdit' className='label'>Nombre del elemento que requiere modificación</label>
                            <input {...register("nameEdit")}
                                className="campo_entrada"
                                placeholder={toEdit.name}
                                id='nameEdit'
                            />
                            <p className='error'>{errors.nameEdit?.message}</p>
                        </Row>
                        <Row>
                            <label htmlFor='channelEdit' className='label'>¿Requiere cambiar ubicacion?</label>
                            <select {...register("channelEdit")}
                                className="campo_entrada"
                                placeholder={toEdit.channel}
                                id='channelEdit'
                            >
                                <option value=''>{toEdit.channel}</option>
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
                            <label htmlFor='cat_nameEdit' className='label'>¿Requiere cambiar categoria?</label>
                            <select {...register("cat_nameEdit")}
                                className="campo_entrada"
                                placeholder={toEdit.cat_name}
                                id="cat_nameEdit"
                            >
                                <option value=''>{toEdit.cat_name}</option>
                                {categories.map((e, index) => {
                                    return (
                                        <option key={index} value={e.name} >{e.name}</option>
                                    )
                                })}
                            </select>
                            <p className='error'>{errors.cat_nameEdit?.message}</p>
                        </Row>
                        <Row>
                            <label htmlFor='statusEdit' className='label'>¿Requiere cambiar el estado?</label>
                            <select {...register("statusEdit")}
                                className="campo_entrada"
                                placeholder={toEdit.status}
                                id="statusEdit"
                            >
                                <option value='1'>¿Lo va a cambiar?</option>
                                <option value='0'>Descontinuar</option>
                                <option value='1'>Activar</option>
                            </select>
                            <p className='error'>{errors.statusEdit?.message}</p>
                        </Row>
                    </Col>
                    <button className='btn-light-bkg' type="submit" >Corregir</button>
                </form>
            </Container>

        </div >
    );
}



export default AdjustElement
