import React, { useContext, useEffect, useState } from 'react';


/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';
import { Link, useNavigate } from 'react-router-dom';


/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'
import FillPacket from './FillPacket';



const Packet = () => {

    const [fillPacket, setFillPacket] = useState(false)

    const { selectedProducts,
        packsToFill, setPacksToFill
    } = useContext(SellTicketContext)

    useEffect(() => {
        if (packsToFill.length > 0) { setPacksToFill(true) }
    }, [])


    const handleFillPack = (element) => {
        console.log('element', element)
        let array = packsToFill
        array = [...array, element]
        setPacksToFill(array)
        console.log('arreglo', array)
    }

    const handleAddToSale = () => {

    }

    return (
        <>

            <div className='canvas_claro'>
                <p className="titulo_oscuro">Seleccion y llenado de Paquetes</p>
                <Link to="/" className='inicio'>Inicio</Link>
                <Link to="/sell/prodSelectForm" className='volver'>Volver</Link>

                <div>
                    <table className='center' >
                        <thead>
                            <tr>
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
                                        <td>{element.name}</td>
                                        <td>{element.temperature}</td>
                                        <td>{element.price}</td>
                                        <td>
                                            <button className='btn-light-bkg-short' onClick={() => handleFillPack(element)}>Llenar</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
            {fillPacket ?
                <FillPacket /> :
                ''
            }
        </>
    )
}

export default Packet