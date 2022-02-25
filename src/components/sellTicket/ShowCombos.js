import React, { useContext } from 'react'


import SellTicketContext from '../../context/SellTicketContext'




const ShowCombos = () => {
    const { objCombo } = useContext(SellTicketContext)
    return (
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
                        {objCombo.map((element, i) => {
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
                {/* {isCash ?
                        <div>
                            <label htmlFor='cashAmount' className='label'>Recibes</label>
                            <input className="campo_entrada" type='number' id="cash" />
                            <p className='label'>{`Vas a dar ${(document.getElementById('cash').value - finalSale)} de Vueltos `}</p>
                        </div>
                        :
                        <label className='label'>La venta se hizo con medio electronico</label>
                    } */}
                <button className='btn-light-bkg' type="submit">Ir a vender</button>
            </Container>
        </div>
    )
}

export default ShowCombos