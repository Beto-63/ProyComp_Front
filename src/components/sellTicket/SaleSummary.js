import React, { useContext } from 'react'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/free-solid-svg-icons'

/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';
import CashContext from '../../context/CashContext'
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'





const SaleSummary = () => {

    let saleTotal = 0

    const { saleSummary, setSaleSummary,
        clientId, paymentMethods, origins
    } = useContext(SellTicketContext)
    const { channel, userName } = useContext(CashContext)

    const handleEliminate = (e) => {
        let array = saleSummary.filter((item) => (item._id !== e._id))
        setSaleSummary(array)
        console.log("sin eliminado", array)
    }

    const handleSale = () => {
        let obj = {
            client_id: clientId._id,
            products_sold: saleSummary,
            amount_sold: saleTotal,
            channel: channel,
            payment_method: '',
            user_name: userName,
            sale_origin: "",
            status: 1
        }
        //Armar el Objeto de venta hacer el fetch a la base de datos
        //presentar el resumen de lo vendido para la entrega
    }

    return (
        <div>
            <hr />
            <p className="titulo_oscuro">Resumen Parcial</p>
            <hr />
            <div>
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Temp</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saleSummary.map((element, i) => {
                            saleTotal = saleTotal + element.price * element.quantity
                            return (
                                <tr key={i}>
                                    <td>{element.name}</td>
                                    <td>{element.temperature}</td>
                                    <td>{element.price}</td>
                                    <td>{element.quantity}</td>
                                    <td>
                                        <td>
                                            <i className="fa-solid fa-xmark" onClick={() => handleEliminate(element)}>x</i>
                                        </td>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <h5 className="result">{`El total de la venta va en $${saleTotal}`}</h5>

            </div>
            <div>
                <div>
                    <select
                        className="campo_entrada"
                        placeholder="Origen de la venta"
                        id='origin'
                    >
                        <option defaultValue='cash'>Pago en...</option>
                        {paymentMethods.map((e, index) => {
                            return (
                                <option key={index} value={e.name} >{e.name}</option>
                            )
                        })}
                    </select>
                    <select
                        className="campo_entrada"
                        placeholder="Pago en..."
                        id='payment_method'
                    >
                        <option defaultValue='cash'>Venta desde ...</option>
                        {origins.map((e, index) => {
                            return (
                                <option key={index} value={e.name} >{e.name}</option>
                            )
                        })}
                    </select>
                </div>

                <button className='btn-light-bkg' onClick={handleSale}>Vender</button>
            </div>
        </div>
    )
}

export default SaleSummary