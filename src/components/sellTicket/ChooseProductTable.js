import React, { useState, useContext } from 'react';


/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../../context/Api'


/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'


const ChooseProductTable = () => {

    const { selectedProducts,
        saleSummary, setSaleSummary
    } = useContext(SellTicketContext)

    const [saleProductTemp, setSaleProductTemp] = useState([])
    const [objCombo, setObjCombo] = useState({})

    const getProductsForCombo = (objName) => {
        fetch(`${server}/product/combo/findByName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objName)
        })
            .then(response => response.json())
            .then(json => setObjCombo(json));

    }

    const navigate = useNavigate()

    const handleAddQty = (obj, qty) => {
        if (qty !== NaN || qty !== 0) {
            let newObj = {}
            let arrayCombo = []
            let arrayQuantitiesCombo = []
            let array = saleProductTemp.filter((e) => (e._id !== obj._id))
            if (obj.cat_name !== "Combo") {
                newObj = { ...obj, ...{ quantity: qty } }
                if (qty !== 0) {

                    array = [...array, newObj]
                }
                setSaleProductTemp(array)
            } else {
                getProductsForCombo({ name: obj.cat_name })

                console.log("voy a meter los articulos del combo", obj, qty)
                arrayCombo = objCombo.products


            }
            console.log("lo que esta en la coleccion de Combo", arrayCombo)
            console.log("Lo que queda en lo escogido", arrayQuantitiesCombo)
            if (qty !== 0) {

                array = [...array, ...arrayQuantitiesCombo]
            }
            setSaleProductTemp(array)
            console.log("el definitivo", array)
        } else {
            // do nothing
        }
    }
    //TODO evitar que entre NaN a la seleccion puede ser con Yup
    const handleAddToSale = () => {
        let array = saleSummary
        array = [...array, ...saleProductTemp]
        setSaleSummary(array)
        setSaleProductTemp([])
        navigate('/sell/catTempSelection')
    }


    return (
        <div className='canvas_claro'>
            <p className="titulo_oscuro">Proceso de Venta</p>
            <Link to="/menu" className='inicio'>Inicio</Link>
            <Link to="/sell/prodSelectForm" className='volver'>Volver</Link>
            <form>
                <div>
                    <table className='center' >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Producto</th>
                                <th>Temp</th>
                                <th>Precio</th>
                                <th>Cant.</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProducts.map((element, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{element.name}</td>
                                        <td>{element.temperature}</td>
                                        <td>{element.price}</td>
                                        <td>
                                            <input
                                                onBlur={(event) => { handleAddQty(element, parseInt(event.target.value)) }}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <button className='btn-light-bkg' onClick={handleAddToSale}>Agregar</button>
                </div>
            </form>
        </div>

    );
};

export default ChooseProductTable;
