import React, { useState, useContext } from 'react';
import { Table, Button } from 'react-bootstrap'

/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';
import { Link, useNavigate } from 'react-router-dom';


/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'


const STProductChoiceTable = () => {

    let saleTotal = 0

    const { selectedProducts,
        saleSummary, setSaleSummary
    } = useContext(SellTicketContext)

    const [saleProductTemp, setSaleProductTemp] = useState([])

    const navigate = useNavigate()

    const handleAddQty = (obj, qty) => {
        if (qty !== NaN || qty !== 0) {
            let array = saleProductTemp.filter((e) => (e._id !== obj._id))
            let newObj = { ...obj, ...{ quantity: qty } }
            console.log('Objeto con Cantidad', newObj)
            if (qty !== 0) {
                array = [...array, newObj]
            }
            setSaleProductTemp(array)
            console.log('arreglo con cantidades', array)
        } else {
            console.log("valor de la linea en cero o inexistente")
        }
    }

    const handleAddToSale = () => {
        let array = saleSummary
        console.log('Antes de "Agregar"', array)
        array = [...array, ...saleProductTemp]
        console.log('Despues de "Agregar"', array)
        setSaleSummary(array)
        setSaleProductTemp([])
        navigate('/sell/catTempSelection')
    }


    return (
        <div className='canvas_claro'>
            <p className="titulo_oscuro">Proceso de Venta</p>
            <Link to="/" className='inicio'>Inicio</Link>
            <Link to="/sell/prodSelectForm" className='volver'>Volver</Link>
            <form>
                <div>
                    <Table striped bordered hover size="sm">
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
                    </Table>
                    <Button onClick={handleAddToSale}>Agregar</Button>
                </div>
            </form>
        </div>

    );
};

export default STProductChoiceTable;
