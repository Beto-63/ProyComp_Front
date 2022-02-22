import React, { useContext } from 'react';

/**********************Importacion de Componentes**************************/
import { Link, useNavigate } from 'react-router-dom';
import ProductContext from '../../context/ProductContext'
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/

import '../generic/Light-bkg.css'
import ComboItems from './ComboItems';
import ComboSummary from './ComboSummary';

const CreateCombo = () => {


    let navigate = useNavigate()

    const {
        showSummaryCombo,
        productsArray, setProductsArray,
        name, setName
    } = useContext(ProductContext);



    const handleName = () => {
        setName(document.getElementById('name').value)
    }
    //TODO validar que no se haga el click si falta valores verificar con yup
    const handleCreateCombo = () => {
        let objCombo = {
            name: name,
            products: productsArray
        }
        fetch(`${server}/product/combo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objCombo)
        })
            .then(response => response.json())
        setProductsArray([])
        setName('')
        navigate('/product')
    }


    return (
        <div className='canvas_claro'>
            <div>
                <p className="titulo_oscuro">Nombre del conjunto</p>
                <Link to="/menu" className='inicio'>Inicio</Link>
                <Link to="/product" className='volver'>Volver</Link>
                <p>La creacióndel producto usa este "Nombre" en la posicion de "Elemento a descontar del Inventario" </p>
                <label htmlFor='name'>Nombre :</label>
                <input
                    id='name'
                    onBlur={handleName}
                    style={{ marginLeft: '1rem' }} />
                <br /><br />

            </div>
            <ComboItems />
            {showSummaryCombo ?
                <ComboSummary />
                :
                ""
            }
            <br />
            <button className='btn-light-bkg' onClick={handleCreateCombo}>Crear Combo</button>

        </div>
    )
}

export default CreateCombo