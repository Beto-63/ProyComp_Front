/**********************Importacion de Librerias****************************/

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

/**********************Importacion de Componentes**************************/
import { GetUbicaciones, AddQuantityToStock, ubicaciones } from '../../context/FecthIntructions'

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'

const schema = yup.object({
    /*El primero debe ser el tipo de dato y el ultimo debe ser el required*/
    name: yup.string().required('Este campo es requerido').min(6, 'Debe tener por lo menos 6 caracteres'),
    qty: yup.number().moreThan(0, 'El valor debe ser positivo').required('Este campo es requerido'),
    channel: yup.string().required('Este campo es requerido')
}).required();

const AddQuantity = () => {

    useEffect(() => {
        GetUbicaciones();
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        console.log(data)
        AddQuantityToStock(data);      //Falta el mensaje de confirmacion
        reset();
    };

    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Agregar cantidad al sotock</p>
            <Link to="/" className='salir' >Salir</Link>
            <Link to="/stock" className='volver'>Volver</Link>
            <Container >
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <label htmlFor='Channel' className='label'>Nombre del elemento</label>
                        {/* la busqueda de este Item debera complementarse con lo que hagamos para 
                        selecccionar el item en ventas */}
                        <select {...register("name")}
                            className="campo_entrada container"
                            placeholder="escoja el Item --Temporal"
                        >
                            <option value=''>Elemento a adicionar</option>
                            {/* Aca deb ir una lista de articulos seleccionado porcategoria */}
                            <option value='Alberto'>Alberto</option>
                            <option value='Temp dos'>Temp dos</option>
                        </select>
                        <p className='error'>{errors.qty?.name}</p>
                    </Row>
                    <Row>
                        <label htmlFor='Channel' className='label'>Ubicación</label>
                        <select {...register("channel")}
                            className="campo_entrada"
                            placeholder="Ubicación Física"
                        >
                            <option value=''>Ingrese Ubicacion</option>
                            {/* Asi se customizan las listas de seleccion directamente desde la base de datos */}
                            {ubicaciones.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.channel?.message}</p>
                    </Row>
                    <Row>
                        <input {...register("qty")}
                            className="campo_entrada"
                            placeholder="Cantidad (gr/unidades)"
                        />
                        <p className='error'>{errors.qty?.message}</p>
                    </Row>
                    <button className='btn-light-bkg' type="submit" >Agregar</button>
                </form>
            </Container>

        </div >
    );
}

export default AddQuantity
