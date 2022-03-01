/**********************Importacion de Librerias****************************/
import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';


/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';


/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'


const CloseTransaction = () => {
    const navigate = useNavigate()
    const [changeAmount, setChangeAmount] = useState(0)
    const {
        saleSummary, setSaleSummary, isCash, finalSale,
        setKeepSelecting, setSelectedProducts, setClientId,
        setSummary, setPacksToFill, setAllPackets, setShowPacketList,
        setFinalSale, setIsCash, setObjCombo
    } = useContext(SellTicketContext)

    const change = () => {
        setChangeAmount(document.getElementById('amountReceived').value - finalSale)
    }

    const close = () => {
        setKeepSelecting(true)
        setSelectedProducts([{}])
        setClientId({})
        setSaleSummary([])
        setSummary(false)
        setPacksToFill([])
        setAllPackets([])
        setShowPacketList(false)
        setFinalSale(0)
        setIsCash(true)
        setObjCombo([])
        navigate('/sell')

    }


    return (
        <>

            <div className='canvas_claro' >
                <p className="titulo_oscuro">Debes entregar los sigueintes productos:</p>
                {/* Se insertan los links de navegacion general */}
                <Link to="/menu" className='inicio'>Inicio</Link>
                <Link to="/cash" className='volver'>Volver</Link>
                <Container >
                    <table className='center' >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Producto</th>
                                <th>Temp</th>

                                <th>Cant.</th>

                            </tr>
                        </thead>
                        <tbody>
                            {saleSummary.map((element, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{element.name}</td>
                                        <td>{element.temperature}</td>
                                        <td>{element.quantity}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <p>{`Has vendido un monto de ${finalSale}`}</p>
                    {isCash ?
                        <div>
                            <label htmlFor='amountReceived' className='label'>Recibes</label>
                            <br />
                            <input className="campo_entrada" type='number' id="amountReceived" defaultValue={0} onChange={change} />

                            <p className='vueltos'>{`Deber devolver ${changeAmount}`}</p>
                        </div>
                        :
                        <div>
                            <label className='result'>La venta se hizo con medio electronico, no hay vueltos</label>
                            <br />
                        </div>
                    }
                    <button className='btn-light-bkg' type="button" onClick={close}>Terminar</button>
                </Container>
            </div>
        </>
    )
}

export default CloseTransaction