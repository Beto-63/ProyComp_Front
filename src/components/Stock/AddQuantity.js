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
    name: yup.string().trim().required('Ingresa el nombre del elemento inventariable'),
    qty: yup.number().typeError('Ingresa la cantida a adicionar').moreThan(0, 'El valor debe ser positivo').required('Se requiere ingresar cantidad'),
    channel: yup.string().trim().required('Por ser inventariable debe asignarsele un lugar físico'),
    cat_name: yup.string().trim().required('La categoria sirve para hacer mas cortas las selecciones')
});

const AddQuantity = () => {
    const [selectedNames, setSelectedNames] = useState([{}]);
    const [categories, setCategories] = useState([{}]); //Esto puede pasar au una contexto
    const [ubicaciones, setUbicaciones] = useState([{}]);


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
        let obj = { name: data.name, channel: data.channel, qty: data.qty }
        fetch(`${server}/stock/addQty`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => window.alert(JSON.stringify(json)))
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
            <p className="titulo_oscuro">Agregar cantidad al sotock</p>
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
                        <label htmlFor='name' className='label'>Nombre del elemento</label>
                        <select {...register("name")}
                            className="campo_entrada container"
                            placeholder="Escoja el Item"
                        >
                            <option value="">Elemento a adicionar</option>
                            {selectedNames.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.name?.message}</p>
                    </Row>

                    <Row>
                        <input {...register("qty")}
                            className="campo_entrada"
                            placeholder="Cantidad (gr/unidades)"
                        />
                        <p className='error'>{errors.qty?.message}</p>
                    </Row>
                    <button className='btn-light-bkg' type="submit" >Agregar</button>
                </form>
            </Container>

        </div >
    );
}

export default AddQuantity
