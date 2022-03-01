import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';
import CashContext from '../../context/CashContext'
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'





const SaleSummary = () => {

    let saleTotal = 0

    const navigate = useNavigate()

    const { saleSummary, setSaleSummary,
        keepSelecting, clientId,
        paymentMethods, origins,
        setClientId, setFinalSale, setIsCash,
    } = useContext(SellTicketContext)
    const { channel, userEmail } = useContext(CashContext)

    const handleEliminate = (e) => {
        let array = saleSummary.filter((item) => (item._id !== e._id))
        setSaleSummary(array)
    }

    const handleSale = (e) => {

        const answer = window.confirm('Estas confirmando la venta?')
        if (answer) {
            setFinalSale(saleTotal)
            let obj = {
                client_id: clientId._id,
                products_sold: saleSummary,
                amount_sold: saleTotal,
                channel: channel,
                payment_method: document.getElementById('payment_method').value,
                user_name: userEmail,
                sale_origin: document.getElementById('origin').value,
                status: 1
            }
            if (document.getElementById('payment_method').value === 'Cash') { setIsCash(true) } else { setIsCash(false) }
            fetch(`${server}/sell_ticket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then(response => response.json())
                .then(json => window.alert(JSON.stringify(json)))
            setClientId({})
            navigate('/sell/deliver')
        } else {
            //do nothing
        }

        //Armar el Objeto de venta hacer el fetch a la base de datos
        //presentar el resumen de lo vendido para la entrega
    }

    return (
        <>

            <div>
                <hr />
                <p className="titulo_oscuro">Resumen Parcial</p>
                <div>
                    <table className='center'>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Temp</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Eliminar</th>
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

                                            <FontAwesomeIcon icon={faTrashCan} onClick={() => handleEliminate(element)}></FontAwesomeIcon>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <h5 className="total">{`El total de la venta va en: $${saleTotal}`}</h5>
                    <br />
                </div>
                {keepSelecting ?
                    ''
                    :
                    <div>
                        <form onSubmit={handleSale}>
                            <Container>
                                <div>
                                    <label htmlFor='payment_method' className='label'>Pagas con:</label>
                                    <select
                                        className="campo_entrada summary"
                                        id='payment_method'
                                    >

                                        {paymentMethods.map((e, index) => {
                                            return (
                                                <option key={index} value={e.name} >{e.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor='payment_method' className='label'>Venta originada en:</label>
                                    <select
                                        className="campo_entrada summary"
                                        id='origin'
                                    >

                                        {origins.map((e, index) => {
                                            return (
                                                <option key={index} value={e.name} >{e.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </Container>
                            <br />
                            <button className='btn-light-bkg' type='submit'>Vender</button>
                            <br />
                        </form>
                    </div>
                }
                {/* "el contenido de objCombo es" {JSON.stringify(objCombo)} */}
            </div>
        </>
    )
}

export default SaleSummary