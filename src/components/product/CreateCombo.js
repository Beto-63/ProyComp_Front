import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap'

/**********************Importacion de Componentes**************************/
import { Link, useNavigate } from 'react-router-dom';
import ProductContext from '../../context/ProductContext'
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/

import '../generic/Light-bkg.css'
import ComboItems from './ComboItems';

const CreateCombo = () => {

    let products = []
    let objProduct = {
        name: '',
        quantity: 0
    }

    const {

        productsArray, setProductsArray,
        name, setName
    } = useContext(ProductContext);



    const handleName = () => {
        setName(document.getElementById('name').value)
        console.log(document.getElementById('name').value)
    }


    return (
        <div className='canvas_claro'>
            <div>
                <p className="titulo_oscuro">Nombre del conjunto, numero de items </p>
                <Link to="/" className='inicio'>Inicio</Link>
                <Link to="/sell/prodSelectForm" className='volver'>Volver</Link>
                <label htmlFor='name'>Nombre para creacion del combo en "Producto"</label>
                <input id='name' onBlur={handleName} />
                <br /><br />

            </div>
            <ComboItems />
            <div>
                <h2> Aqui desplegar los items y el nombre del grupo con la x para eliminarlo</h2>
            </div>
        </div>
    )
}

export default CreateCombo