/**********************Importacion de Librerias****************************/

import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

/**********************Importacion de Componentes**************************/
import CashContext from '../../context/CashContext'

import { server } from '../../context/Api'
/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'

const schema = yup.object({
    name: yup.string().trim().required('Ingresa el nombre del elemento inventariable'),
    channel: yup.string().required('Por ser inventariable debe asignarsele un lugar físico'),
    cat_name: yup.string().required('La categoria sirve para hacer mas cortas las selecciones'),
    reason: yup.string().required('Se requiere registrat el motivo del ajuste'),
    quantityEdit: yup.number().typeError('Ingresa el precio de venta')
});

const AdjustQuantity = () => {

    const objElement = {
        id: '',
        name: '',
        channel: '',
        cat_name: '',

    }

    const { userEmail } = useContext(CashContext)



    const [selectedNames, setSelectedNames] = useState([{}]);
    const [categories, setCategories] = useState([{}]); //Esto puede pasar au una contexto
    const [ubicaciones, setUbicaciones] = useState([{}]);
    const [toEdit, setToEdit] = useState(objElement);


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

    const handleCatChange = () => {
        let obj = {
            cat_name: document.getElementById('cat_name').value,
            channel: (document.getElementById('channel').value).trim(),
        };
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

    const onSubmit = (data) => {

        let newObj = { id: toEdit._id, status: toEdit.status }
        if (data.quantity !== '') {
            newObj = { ...newObj, ...{ quantity: data.quantityEdit } }
        } else {
            newObj = { ...newObj, quantity: toEdit.quantity }
        }
        console.log("adj", newObj)
        fetch(`${server}/stock/adjust/quantity`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            //enviamos los datos por body y se debe convertir el objeto en JSON
            body: JSON.stringify(newObj)
        })
            .then(response => response.json())
            .then(json => window.alert(JSON.stringify(json)))
        reset();
        setToEdit(objElement);

        //historico de descuentos
        let objAdj = {
            name: toEdit.name,
            channel: toEdit.channel,
            cat_name: toEdit.cat_name,
            difference: (toEdit.quantity - data.quantityEdit),
            reason: data.reason,
            user_mail: userEmail,
        }
        console.log("reason", objAdj)
        fetch(`${server}/stock/adjust/reason`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            //enviamos los datos por body y se debe convertir el objeto en JSON
            body: JSON.stringify(objAdj)
        })
            .then(response => response.json())
            .then(json => window.alert(JSON.stringify(json)))
        reset();
    };
    //TODO revisar el correo de la persona y timestamp en las razones de ajuste 
    return (
        <div className='canvas_claro'>
            <p className="titulo_oscuro">Ajuste mayor de cantidad</p>
            <Link to="/menu" className='inicio' >Inicio</Link>
            <Link to="/stock" className='volver'>Volver</Link>
            <Container >
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Col>
                        <Row>
                            <label htmlFor='cat_name' className='label'>Categoria del elemento (Té, Infusion o Accesorios)</label>
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
                            <label htmlFor='name' className='label'>Nombre del elemento que se ajustará</label>
                            <select {...register("name")}
                                className="campo_entrada container"
                                placeholder="Escoja el Item"
                                id='name' onChange={handleEdit}
                            >
                                <option value=''>Elemento a ajustar</option>
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
                    <p className="titulo_oscuro">Ingresa la nueva información </p>
                    <Row>
                        <p>{`El elemento ${toEdit.name}, en la Ubicacion ${toEdit.channel} tiene una existencia de: ${toEdit.quantity}`}</p>
                    </Row>
                    <Row>
                        <label htmlFor='quantityEdit' className='label'>Nueva Cantidad</label>
                        <input {...register("quantityEdit")}
                            className="campo_entrada"
                            placeholder={toEdit.quantity}
                            id='quantityEdit'
                        />
                        <p className='error'>{errors.quantityEdit?.message}</p>
                    </Row>
                    <Row>
                        <label htmlFor='reason' className='label'>Razon del ajuste</label>
                        <textarea {...register("reason")}
                            className="campo_entrada"

                            id='reason'
                        />
                        <p className='error'>{errors.reason?.message}</p>
                    </Row>
                    <button className='btn-light-bkg' type="submit">Ajustar</button>
                </form>
            </Container>
        </div>
    )
}

export default AdjustQuantity

