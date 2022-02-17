import React, { useContext } from 'react'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/free-solid-svg-icons'

/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'


//TODO Falta eliminar una linea


const SaleSummary = () => {

    let saleTotal = 0

    const { saleSummary, setSaleSummary
    } = useContext(SellTicketContext)

    const handleEliminate = (e) => {
        console.log("eliminar", e)
    }

    const handleSale = () => {
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