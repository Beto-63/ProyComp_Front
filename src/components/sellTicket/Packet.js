import React, { useContext, useEffect, useState } from 'react';

/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';
import { Link, useNavigate } from 'react-router-dom';


/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'
import FilterPacket from './FilterPacket';



const Packet = () => {




    const [saleProductTemp, setSaleProductTemp] = useState([])

    const navigate = useNavigate()

    const { selectedProducts,
        saleSummary, setSaleSummary,
        showPacketList, setShowPacketList
    } = useContext(SellTicketContext)



    const handleAddQuantity = (obj, qty) => {
        if (qty !== NaN || qty !== 0) {
            let array = saleProductTemp.filter((e) => (e._id !== obj._id))
            let newObj = { ...obj, ...{ quantity: qty } }
            if (qty !== 0) {
                array = [...array, newObj]
            }
            setSaleProductTemp(array)
        } else {
            //do nothing
        }
    }


    const handleAddToSale = () => {
        let array = saleSummary
        array = [...array, ...saleProductTemp]
        setSaleSummary(array)
        setSaleProductTemp([])
        navigate('/sell/catTempSelection')
    }

    return (
        <>

            <div className='canvas_claro'>
                <div>
                    <p className="titulo_oscuro">Tipo y Cantidad de paquetes</p>
                    <Link to="/menu" className='inicio'>Inicio</Link>
                    <Link to="/sell/prodSelectForm" className='volver'>Volver</Link>


                    <FilterPacket />
                    {showPacketList ?
                        <div>
                            <table className='center' >
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio</th>

                                        <th>Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedProducts.map((element, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{element.name}</td>
                                                <td>{element.price}</td>
                                                <td>
                                                    <input id='quantity'
                                                        onBlur={(event) => { handleAddQuantity(element, parseInt(event.target.value)) }}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        :
                        ''
                    }
                    <button className='btn-light-bkg' onClick={handleAddToSale}>Agregar</button>
                </div>
                <br />
            </div>
        </>
    )
}

export default Packet