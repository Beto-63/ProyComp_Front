import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api';
import ProductContext from '../../context/ProductContext';
import AuthContext from "../../context/AuthContext";


/**********************Importacion de Estilos******************************/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import '../generic/Light-bkg.css';

const schema = yup.object({
    quantity: yup.number().typeError('Numero de unidades incluidas en el Combo').moreThan(0, 'El valor debe ser positivo').required(),
    name: yup.string('Solo se aceptan caracteres').required('Nombre del producto catalogado Incluido en el Combo').trim('No dejar espacios antes o al final')
})


const ComboItems = () => {

    const { setAuth } = useContext(AuthContext);

    let navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema)
    });

    //cinco listas de elementos para conformar el combo
    const [tePacketsLarge, setTePacketsLarge] = useState([])
    const [tePacketsSmall, setTePacketsSmall] = useState([])
    const [infPacketsLarge, setInfPacketsLarge] = useState([])
    const [infPacketsSmall, setInfPacketsSmall] = useState([])
    const [Accesorios, setAccesorios] = useState([])

    //booleanas para definir cual de las 5 listas debo deplegar 
    const [esAccesorio, setEsAccesorio] = useState(false)
    const [esTe, setEsTe] = useState(false)
    const [esLarge, setEsLarge] = useState(false)
    const [showQuantity, setShowQuantity] = useState(false)


    //este arreglo contrndra los items que van en el combo
    const { setShowSummaryCombo, productsArray, setProductsArray } = useContext(ProductContext)


    useEffect(() => {
        let obj = {
            cat_name: 'Accesorios',
        };
        fetch(`${server}/product/selectCat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(obj)
        })
            //.then(response => response.json())
            //.then(json => setAccesorios(json));

            .then(async (resp)=>{ // (primer .then)
            
                switch (resp.status) {
        
                    // Middleware - Inicio
                    
                    case 401:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("Intente autenticarse nuevamente");
                        navigate("/login");
                        break;
        
                    case 404:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("404");
                        navigate("/login");
                        break;
        
                    case 403:
                        //localStorage.removeItem("token");
                        //setAuth(false);
                        window.alert("403");
                        navigate("/");
                        break;
                    
                    // Middleware - Fin
        
                    // Códigos del backend - Inicio
        
                    case 200:
                        //localStorage.removeItem("token");
                        //setAuth(false);
        
                        // Se retorna el json con la información
                        let json = await resp.json();
        
                        setAccesorios(json); // Recibo de información del backend en json (Segundo .then)
                        //window.alert(json);
                        //navigate("/");
                        break;
        
                    case 400:
                        window.alert("400: categoria invalida");
                        //navigate("/");
                        break;

                    case 500:
                        //localStorage.removeItem("token");
                        //setAuth(false);
                        window.alert("500");
                        navigate("/");
                        break;
        
                    // Códigos del backend - Fin
                
                    default:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("default case");
                        navigate("/");
                        break;
                }
        
            }).catch(error=>{
                console.error(error);
            })

    }, [])

    useEffect(() => {
        let obj = {
            fill: 'Té',
            stock_qty: 20
        };
        fetch(`${server}/product/selectPacketAndFill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(obj)
        })
            //.then(response => response.json())
            //.then(json => setTePacketsSmall(json));

            .then(async (resp)=>{ // (primer .then)
            
                switch (resp.status) {
        
                    // Middleware - Inicio
                    
                    case 401:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("Intente autenticarse nuevamente");
                        navigate("/login");
                        break;
        
                    case 404:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("404");
                        navigate("/login");
                        break;
        
                    case 403:
                        //localStorage.removeItem("token");
                        //setAuth(false);
                        window.alert("403");
                        navigate("/");
                        break;
                    
                    // Middleware - Fin
        
                    // Códigos del backend - Inicio
        
                    case 200:
                        //localStorage.removeItem("token");
                        //setAuth(false);
        
                        // Se retorna el json con la información
                        let json = await resp.json();
        
                        setTePacketsSmall(json); // Recibo de información del backend en json (Segundo .then)
                        //window.alert(json);
                        //navigate("/");
                        break;

                    case 500:
                        //localStorage.removeItem("token");
                        //setAuth(false);
                        window.alert("500");
                        navigate("/");
                        break;
        
                    // Códigos del backend - Fin
                
                    default:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("default case");
                        navigate("/");
                        break;
                }
        
            }).catch(error=>{
                console.error(error);
            })

    }, [])

    useEffect(() => {
        let obj = {
            fill: 'Té',
            stock_qty: 50
        };
        fetch(`${server}/product/selectPacketAndFill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(obj)
        })
            //.then(response => response.json())
            //.then(json => setTePacketsLarge(json));

            .then(async (resp)=>{ // (primer .then)
            
                switch (resp.status) {
        
                    // Middleware - Inicio
                    
                    case 401:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("Intente autenticarse nuevamente");
                        navigate("/login");
                        break;
        
                    case 404:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("404");
                        navigate("/login");
                        break;
        
                    case 403:
                        //localStorage.removeItem("token");
                        //setAuth(false);
                        window.alert("403");
                        navigate("/");
                        break;
                    
                    // Middleware - Fin
        
                    // Códigos del backend - Inicio
        
                    case 200:
                        //localStorage.removeItem("token");
                        //setAuth(false);
        
                        // Se retorna el json con la información
                        let json = await resp.json();
        
                        setTePacketsLarge(json); // Recibo de información del backend en json (Segundo .then)
                        //window.alert(json);
                        //navigate("/");
                        break;

                    case 500:
                        //localStorage.removeItem("token");
                        //setAuth(false);
                        window.alert("500");
                        navigate("/");
                        break;
        
                    // Códigos del backend - Fin
                
                    default:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("default case");
                        navigate("/");
                        break;
                }
        
            }).catch(error=>{
                console.error(error);
            })

    }, [])

    useEffect(() => {
        let obj = {
            fill: 'Infusión',
            stock_qty: 20
        };
        fetch(`${server}/product/selectPacketAndFill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(obj)
        })
            //.then(response => response.json())
            //.then(json => setInfPacketsSmall(json));

            .then(async (resp)=>{ // (primer .then)
            
                switch (resp.status) {
        
                    // Middleware - Inicio
                    
                    case 401:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("Intente autenticarse nuevamente");
                        navigate("/login");
                        break;
        
                    case 404:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("404");
                        navigate("/login");
                        break;
        
                    case 403:
                        //localStorage.removeItem("token");
                        //setAuth(false);
                        window.alert("403");
                        navigate("/");
                        break;
                    
                    // Middleware - Fin
        
                    // Códigos del backend - Inicio
        
                    case 200:
                        //localStorage.removeItem("token");
                        //setAuth(false);
        
                        // Se retorna el json con la información
                        let json = await resp.json();
        
                        setInfPacketsSmall(json); // Recibo de información del backend en json (Segundo .then)
                        //window.alert(json);
                        //navigate("/");
                        break;

                    case 500:
                        //localStorage.removeItem("token");
                        //setAuth(false);
                        window.alert("500");
                        navigate("/");
                        break;
        
                    // Códigos del backend - Fin
                
                    default:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("default case");
                        navigate("/");
                        break;
                }
        
            }).catch(error=>{
                console.error(error);
            })

    }, [])

    useEffect(() => {
        let obj = {
            fill: 'Infusión',
            stock_qty: 50
        };
        fetch(`${server}/product/selectPacketAndFill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(obj)
        })
            //.then(response => response.json())
            //.then(json => setInfPacketsLarge(json));

            .then(async (resp)=>{ // (primer .then)
            
                switch (resp.status) {
        
                    // Middleware - Inicio
                    
                    case 401:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("Intente autenticarse nuevamente");
                        navigate("/login");
                        break;
        
                    case 404:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("404");
                        navigate("/login");
                        break;
        
                    case 403:
                        //localStorage.removeItem("token");
                        //setAuth(false);
                        window.alert("403");
                        navigate("/");
                        break;
                    
                    // Middleware - Fin
        
                    // Códigos del backend - Inicio
        
                    case 200:
                        //localStorage.removeItem("token");
                        //setAuth(false);
        
                        // Se retorna el json con la información
                        let json = await resp.json();
        
                        setInfPacketsLarge(json); // Recibo de información del backend en json (Segundo .then)
                        //window.alert(json);
                        //navigate("/");
                        break;

                    case 500:
                        //localStorage.removeItem("token");
                        //setAuth(false);
                        window.alert("500");
                        navigate("/");
                        break;
        
                    // Códigos del backend - Fin
                
                    default:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("default case");
                        navigate("/");
                        break;
                }
        
            }).catch(error=>{
                console.error(error);
            })

    }, [])


    const handleFill = (valor) => {
        if (valor === 'Accesorio') {
            setEsAccesorio(true)
            setEsTe(false)
            setShowQuantity(false)
        }
        if (valor === 'Té') {
            setEsTe(true)
            setEsAccesorio(false)
            setShowQuantity(true)
        }
        if (valor === 'Infusión') {
            setEsTe(false)
            setEsAccesorio(false)
            setShowQuantity(true)
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
        let array = productsArray
        array = [...array, data]
        setProductsArray(array)
        reset();
        setEsTe(false)
        setEsAccesorio(false)
        setEsLarge(false)
        setShowSummaryCombo(true)
    };

    return (

        <div >
            <div>
                <p className="titulo_oscuro">Componentes del conjunto</p>
                <Row>

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

                    {showQuantity ?
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
                        :
                        ''
                    }

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