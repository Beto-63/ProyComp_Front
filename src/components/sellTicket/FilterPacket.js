import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';


/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'

const FilterPacket = () => {
    // selectedProducts: en este caso son los productos tipificados como paquetes
    const { selectedProducts, setSelectedProducts } = useContext(SellTicketContext)

    const [packetCat, setPacketCat] = useState('')
    const [packetWeight, setPacketWeight] = useState('')

    useEffect(() => {

    })

    const handleCat = (e) => {
        setPacketCat(e.target.value)
        console.log('tipo de paquete', (e.target.value))
    }

    const handleWeight = (e) => {
        setPacketWeight(e.target.value)
        console.log('peso de paquete', (e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let array, array2 = []
        array = selectedProducts.filter((item) => (item.fill === packetCat))
        array2 = array.filter((item) => (item.stock_qty === packetWeight))
        setSelectedProducts(array2)
        console.log("los que son", array2)
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div>
                    <Form.Label >Describe el paquete</Form.Label>
                    <div className="mb-3" >

                        <Form.Check
                            onClick={handleCat}
                            inline
                            label='Té'
                            name="cat_name"
                            type='radio'
                            id={`inline-radio-1`}
                            value='Té'
                        />
                        <Form.Check
                            onClick={handleCat}
                            inline
                            label='Infusión'
                            name="cat_name"
                            type='radio'
                            id={`inline-radio-2`}
                            value='Infusión'
                        />
                    </div>
                </div>
                <div>
                    {/* <Form.Label>¿De cuantos gramos es el paquete?</Form.Label> */}
                    <div className="mb-3" >

                        <Form.Check
                            onClick={handleWeight}
                            inline
                            label='20 gr.'
                            name="weight"
                            type='radio'
                            id={`inline-radio-1`}
                            value={20}
                        />
                        <Form.Check
                            onClick={handleWeight}
                            inline
                            label='50 gr.'
                            name="weight"
                            type='radio'
                            id={`inline-radio-2`}
                            value={50}
                        />
                    </div>
                </div>
                <button className='btn-light-bkg' type='submit'>Seleccionar</button>
            </Form>
        </>
    )
}

export default FilterPacket