import React, { useEffect, useState, useContext } from 'react';


/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';
import { Link, useNavigate } from 'react-router-dom';


/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'


const ChooseProductTable = () => {

    const { selectedProducts, objCombo, setObjCombo,
        saleSummary, setSaleSummary
    } = useContext(SellTicketContext)
    const [saleProductTemp, setSaleProductTemp] = useState([])
    const [newCombo, setNewCombo] = useState({})

    useEffect(() => {
        setObjCombo([...objCombo, newCombo])
    }, [newCombo])



    const navigate = useNavigate()

    const handleAddQty = (obj, qty) => {
        console.log("objeto", obj, "cantidad", qty)
        if (qty !== NaN || qty !== 0) {
            let newObj = {}
            let array = saleProductTemp.filter((e) => (e._id !== obj._id))
            newObj = { ...obj, ...{ quantity: qty } }
            if (qty !== 0) {
                array = [...array, newObj]
            }
            setSaleProductTemp(array)
            console.log("el definitivo", array)
            // if (obj.cat_name === "Combo") {
            //     getProductsForCombo({ name: obj.combo_name })
            // }
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
            {/* {JSON.stringify(objCombo)} */}
        </div>

    );
};

export default ChooseProductTable;
