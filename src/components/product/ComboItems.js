import React, { useContext, useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/**********************Importacion de Componentes**************************/
import CashContext from '../../context/CashContext'
import ProductContext from '../../context/ProductContext'
import { Link } from 'react-router-dom';
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import '../generic/Light-bkg.css'

const schema = yup.object({
    quantity: yup.number().typeError('Numero de unidades incluidas en el Combo').moreThan(0, 'El valor debe ser positivo').required(),
    name: yup.string('Solo se aceptan caracteres').required('Nombre del producto catalogado Incluido en el Combo').trim('No dejar espacios antes o al final')
})


const ComboItems = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    //cinco listas de elementos para conformar el combo
    const [tePacketsLarge, setTePacketsLarge] = useState([])
    const [tePacketsSmall, setTePacketsSmall] = useState([])
    const [infPacketsLarge, setInfPacketsLarge] = useState([])
    const [infPacketsSmall, setInfPacketsSmall] = useState([])
    const [Accesorios, setAccesorios] = useState([])

    //objeto {name, quantity} que se adiciona al "productsArray" del contexto para configurar el combo
    const [objItem, setObjItem] = useState({})

    //booleanas para definir cual de las 5 listas debo deplegar 
    const [esAccesorio, setEsAccesorio] = useState(false)
    const [esTe, setEsTe] = useState(false)
    const [esLarge, setEsLarge] = useState(false)


    //este arreglo contrndra los items que van en el combo
    const { productsArray, setProductsArray } = useContext(ProductContext)

    useEffect(() => {
        let obj = {
            cat_name: 'Accesorios',
        };
        fetch(`${server}/product/selectCat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => setAccesorios(json));

    }, [])

    useEffect(() => {
        let obj = {
            fill: 'Té',
            stock_qty: 20
        };
        fetch(`${server}/product/selectPacketAndFill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => setTePacketsSmall(json));

    }, [])

    useEffect(() => {
        let obj = {
            fill: 'Té',
            stock_qty: 50
        };
        fetch(`${server}/product/selectPacketAndFill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => setTePacketsLarge(json));

    }, [])

    useEffect(() => {
        let obj = {
            fill: 'Infusión',
            stock_qty: 20
        };
        fetch(`${server}/product/selectPacketAndFill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => setInfPacketsSmall(json));

    }, [])

    useEffect(() => {
        let obj = {
            fill: 'Infusión',
            stock_qty: 50
        };
        fetch(`${server}/product/selectPacketAndFill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => setInfPacketsLarge(json));

    }, [])


    const handleFill = (valor) => {
        if (valor === 'Accesorio') {
            setEsAccesorio(true)
            setEsTe(false)
        }
        if (valor === 'Té') {
            setEsTe(true)
            setEsAccesorio(false)
        }
        if (valor === 'Infusión') {
            setEsTe(false)
            setEsAccesorio(false)
        }

    }


    const handleStockQty = (valor) => {
        if (valor === 50) {
            setEsLarge(true)
        } else {
            setEsLarge(false)
        }

    }



    const onSubmit = (data) => {
        setObjItem(data)
        let array = productsArray
        array = [...array, data]
        setProductsArray(array)
        console.log(array)
        reset();
        setEsTe(false)
        setEsAccesorio(false)
        setEsLarge(false)
    };

    return (

        <div >
            <div>
                <p className="">componentes del conjunto</p>
                <Row>
                    <Col>
                        <Form >
                            <div>
                                <div className="mb-3" >
                                    <Form.Check
                                        onClick={() => handleFill('Té')}
                                        inline
                                        label='Té'
                                        name="primer"
                                        type='radio'
                                        id={`radio-1`}
                                        value='Té'
                                    />
                                    <Form.Check
                                        onClick={() => handleFill('Infusión')}
                                        inline
                                        label='Infusión'
                                        name="primer"
                                        type='radio'
                                        id={`radio-2`}
                                        value='Infusión'
                                    />
                                    <Form.Check
                                        onClick={() => handleFill('Accesorio')}
                                        inline
                                        label='Accesorio'
                                        name="primer"
                                        type='radio'
                                        id={`-radio-3`}
                                        value='Accesorio'
                                    />
                                </div>
                            </div>
                        </Form>
                    </Col>
                    <Col>
                        <Form >
                            <div>
                                <div className="mb-3" >
                                    <Form.Check
                                        onClick={() => handleStockQty(20)}
                                        inline
                                        label='20 gr'
                                        name="stock_qty"
                                        type='radio'
                                        id={`radio-1`}
                                        value={20}
                                    />
                                    <Form.Check
                                        onClick={() => handleStockQty(50)}
                                        inline
                                        label='50 gr'
                                        name="stock_qty"
                                        type='radio'
                                        id={`radio-2`}
                                        value={50}
                                    />
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <form className='container' onSubmit={handleSubmit(onSubmit)}>


                        <label htmlFor='quantity' >Unidades</label>
                        <input {...register("quantity")}
                            className='short'
                            type='number' defaultValue={1}
                            style={{ marginRight: '1rem' }}
                        />


                        {esAccesorio ?
                            <select {...register("name")}
                                className="campo_entrada"
                                placeholder="Item"
                                id='name'
                            >
                                {Accesorios.map((e, index) => {
                                    return (
                                        <option key={index} value={e.name} >{e.name}</option>
                                    )
                                })}
                            </select>
                            :
                            ''
                        }
                        {(esTe && esLarge && !esAccesorio) ?
                            <select {...register("name")}
                                className="campo_entrada"
                                placeholder="Item"
                                id='name'
                            >
                                {tePacketsLarge.map((e, index) => {
                                    return (
                                        <option key={index} value={e.name} >{e.name}</option>
                                    )
                                })}
                            </select>
                            :
                            ''}
                        {(esTe && !esLarge && !esAccesorio) ?
                            <select {...register("name")}
                                className="campo_entrada"
                                placeholder="Item"
                                id='name'
                            >
                                {tePacketsSmall.map((e, index) => {
                                    return (
                                        <option key={index} value={e.name} >{e.name}</option>
                                    )
                                })}
                            </select>
                            :
                            ''}
                        {(!esTe && esLarge && !esAccesorio) ?
                            <select {...register("name")}
                                className="campo_entrada"
                                placeholder="Item"
                                id='name'
                            >
                                {infPacketsLarge.map((e, index) => {
                                    return (
                                        <option key={index} value={e.name} >{e.name}</option>
                                    )
                                })}
                            </select>
                            :
                            ''}
                        {(!esTe && !esLarge && !esAccesorio) ?
                            <select {...register("name")}
                                className="campo_entrada"
                                placeholder="Item"
                                id='name'
                            >
                                {infPacketsSmall.map((e, index) => {
                                    return (
                                        <option key={index} value={e.name} >{e.name}</option>
                                    )
                                })}
                            </select>
                            :
                            ''}


                        <div>
                            <br />
                            <button className='btn-light-bkg-tall' type="submit" >
                                <FontAwesomeIcon icon={faCirclePlus} size="2x" />
                            </button>
                        </div>
                    </form>
                </Row>
                <br />
            </div>
            <hr />
        </div >
    )
}

export default ComboItems