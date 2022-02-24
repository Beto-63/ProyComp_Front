/**********************Importacion de Librerias****************************/
import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';


/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';


/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'


const CloseTransaction = () => {

    const { selectedProducts,
        saleSummary, setSaleSummary, isCash, finalSale
    } = useContext(SellTicketContext)


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
                        <p>{`Has vendido un monto de ${finalSale}`}</p>
                        {isCash ?
                            <div>
                                <label htmlFor='cash' className='label'>{`Recibes`}</label>
                                <input className="campo_entrada" type='number' id="cash" />
                                <p className='label'>{`Vas a dar ${document.getElementById('cash').value - finalSale} de Vueltos `}</p>
                            </div>
                            :
                            <label className='label'>La venta se hizo con medio electronico</label>
                        }
                    </table>
                    <button className='btn-light-bkg' type="submit">Ir a vender</button>
                </Container>
            </div>

            <p>Ver figma</p>
        </>
    )
}

export default CloseTransaction