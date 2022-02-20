import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap'

/**********************Importacion de Componentes**************************/
import CashContext from '../../context/CashContext'
import ProductContext from '../../context/ProductContext'
import { Link } from 'react-router-dom';
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';
import '../generic/Light-bkg.css'


const ComboItems = () => {

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

        console.log("renderizo")
    }, esAccesorio, esTe, esLarge)


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
            .then(json => setInfPacketsLarge(json));

    }, [])


    const handleAddProductToCombo = () => {

    }

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

    const handleItemName = () => {

    }

    const handleItemQuantity = () => {

    }

    return (
        <div className='canvas_claro'>
            <div>
                <p className="titulo_oscuro">Especifica: té/infusión/accesorio y unidades a vender</p>


                <div>
                    <table className='center' >
                        <thead>
                            <tr>
                                <th>Té/Inf/Accs</th>
                                <th>Gramos</th>
                                <th>Item</th>
                                <th>Cant.</th>
                                <th>+</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
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
                                </td>
                                <td>
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
                                </td>
                                <td>
                                    {esAccesorio ?
                                        <select
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
                                </td>
                                <td>
                                    <input onBlur={handleItemQuantity}></input>
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faArrowDownShortWide} onClick={() => handleAddProductToCombo()}></FontAwesomeIcon>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default ComboItems