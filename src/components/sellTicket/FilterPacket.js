import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';


/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'




const schema = yup.object({

    weight: yup.number().typeError('Ingresa gramaje a vender').moreThan(0, 'El valor debe ser positivo').required(),
    cat_name: yup.string().trim().required('Con que vas a llenar la bolsa: Té o Infusión?'),

})



const FilterPacket = () => {

    const { selectedProducts, setSelectedProducts,
        setShowPacketList
    } = useContext(SellTicketContext)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [packetCat, setPacketCat] = useState('')
    const [packetWeight, setPacketWeight] = useState('')

    useEffect(() => {

    })

    const handleCat = (e) => {
        setPacketCat(e.target.value)
    }

    const handleWeight = (e) => {
        setPacketWeight(parseInt(e.target.value))
    }

    const onSubmit = () => {
        let array, array2 = []
        array = selectedProducts.filter((item) => (item.fill === packetCat))
        array2 = array.filter((item) => (item.stock_qty === packetWeight))
        setSelectedProducts(array2)
        setShowPacketList(true)
        reset()
    }
    //TODO Hacer que se filtre la seleccion antes de poner la cantidad
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label >Describe contenido de la venta por gramos</label>
                <div className="radio-light">
                    <div>
                        <input  {...register("cat_name")}
                            onClick={handleCat}
                            inline
                            label='Té'
                            name="cat_name"
                            type='radio'
                            id={`inline-radio-1`}
                            value='Té'
                        />
                        <input  {...register("cat_name")}
                            onClick={handleCat}
                            inline
                            label='Infusión'
                            name="cat_name"
                            type='radio'
                            id={`inline-radio-2`}
                            value='Infusión'
                        />
                        <p className='cat_name'>{errors.product_id?.message}</p>
                    </div>
                    <div>
                        <input  {...register("weight")}
                            onClick={handleWeight}
                            inline
                            label='20 gr.'
                            name="weight"
                            type='radio'
                            id={`inline-radio-1`}
                            value={20}
                        />
                        <input {...register("weight")}
                            onClick={handleWeight}
                            inline
                            label='50 gr.'
                            name="weight"
                            type='radio'
                            id={`inline-radio-2`}
                            value={50}
                        />
                        <p className='weight'>{errors.product_id?.message}</p>

                    </div>
                </div>
                <button className='btn-light-bkg' type='submit'>Seleccionar</button>
            </form>
        </>
    )
}

export default FilterPacket