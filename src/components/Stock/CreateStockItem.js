/**********************Importacion de Librerias****************************/

import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/**********************Importacion de Componentes**************************/
import { GetUbicaciones, NewStockItem, ubicaciones } from '../../context/FecthIntructions'
/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'


const schema = yup.object({
    /*El primero debe ser el tipo de dato y el ultimo debe ser el required*/
    name: yup.string().required('Este campo es requerido'),
    quantity: yup.number('El valor debeser numerico').moreThan(0, 'El valor debe ser positivo').required('Este campo es requerido'),
    channel: yup.string().required('Este campo es requerido')
}).required();

const CreateStockItem = () => {

    useEffect(() => {
        GetUbicaciones()
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {

        NewStockItem(data)
        //aqui va la creacion del item con un fetch al back
        reset();
    };

    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Crear elemento</p>
            <Link to="/" className='salir'>Salir</Link>
            <Link to="/stock" className='volver'>Volver</Link>
            <Container>
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <input {...register("name")}
                            className="campo_entrada"
                            placeholder="Nombre"
                        />
                        <p className='error'>{errors.name?.message}</p>
                    </Row>
                    <Row>
                        <input {...register("quantity")}
                            className="campo_entrada"
                            placeholder="Cantidad (gr/unidades)"
                        />
                        <p className='error'>{errors.quantity?.message}</p>
                    </Row>
                    <Row>
                        <select {...register("channel")}
                            className="campo_entrada"
                            placeholder="Ubicación Física"
                        >
                            {/* aqui se usa la variable Ubicaciones */}
                            <option value=''>Ingrese Ubicacion</option>
                            {ubicaciones.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.channel?.message}</p>
                    </Row>
                    <button className='btn-light-bkg' type="submit">Crear</button>
                </form>
            </Container>
        </div>
    );
};

export default CreateStockItem;

