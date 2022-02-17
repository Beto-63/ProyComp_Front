import React, { useContext } from 'react'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/free-solid-svg-icons'

/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';
import AuthContext from '../../context/AuthContext'
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'





const SaleSummary = () => {

    let saleTotal = 0

    const { saleSummary, setSaleSummary, clientId
    } = useContext(SellTicketContext)
    const { channel } = useContext(AuthContext)

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
            payment_method: "",
            user_name: "",
            sale_origin: "",
            status: 1
        }
        //Armar el Objeto de venta hacer el fetch a la base de datos
        //presentar el resumen de lo vendido para la entrega
    }

    return (
        <div>
            <hr />
            <h3>Resumen Parcial</h3>
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
                    <h5>{`El total de la venta va en $${saleTotal}`}</h5>
                </Table>

            </div>
            <Button onClick={handleSale}>Vender</Button>
        </div>
    )
}

export default SaleSummary