/**********************Importacion de Librerias****************************/

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'


const schema = yup.object({
    /*El primero debe ser el tipo de dato y el ultimo debe ser el required*/
    name: yup.string().trim().required('Ingresa el nombre del elemento inventariable'),
    quantity: yup.number().typeError('Ingresa la cantidad inicial').moreThan(0, 'El valor debe ser positivo').required('Se requiere ingresar cantidad'),
    channel: yup.string().trim().required('Por ser inventariable debe asignarsele un lugar físico'),
    cat_name: yup.string().trim().required('La categoria sirve para hacer mas cortas las selecciones')
});

const CreateStockItem = () => {

    const [categories, setCategories] = useState([{}]);
    const [ubicaciones, setUbicaciones] = useState([{}]);


    // Se usa para obtener las ubicaciones validas y evitar entrada erronea de datos
    useEffect(() => {
        fetch(`${server}/stock/channels`)
            .then(response => response.json())
            .then(json => setUbicaciones(json));
    }, [])

    // Se usa para obtener las categorias validas y evitar entrada erronea de datos
    useEffect(() => {
        fetch(`${server}/product/categories`)
            .then(response => response.json())
            .then(json => setCategories(json));

    }, [])

    // Asi se usa el 'react-hook-form' y liyga el contenido de la forma con la 
    // validacion de 'yup'
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // La manera de llamar las acciones del boton submit la forma 'react-hook-form'
    // es poner en la cabecera de la forma es: "onSubmit={handleSubmit(onSubmit)"
    // pues usa el "handleSubmit" importado de 'react-hook-form'
    const onSubmit = (data) => {
        let output = {}
        fetch(`${server}/stock`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            //enviamos los datos por body y se debe convertir el objeto en JSON
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => output(json));

        reset();
    };

    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Crear elemento</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/" className='inicio'>Inicio</Link>
            <Link to="/stock" className='volver'>Volver</Link>
            <Container >
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        {/* poner "{...register("name")}" en el input o el select, es la 
                        manera como react-hook-form incluye ese campo como un valor 
                        del objeto de datos en la forma */}
                        <input {...register("name")}
                            className="campo_entrada"
                            placeholder="Nombre"
                        />
                        {/* Esta es la manera como 'yup' pone los mensajes de error sehun la 
                        defincion del schema */}
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
                    <Row>
                        <select {...register("cat_name")}
                            className="campo_entrada"
                            placeholder="Categoría del Producto"
                        >
                            {/* aqui se usa la variable Ubicaciones */}
                            <option value=''>Ingrese Categoría</option>
                            {categories.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.cat_name?.message}</p>
                    </Row>
                    <button className='btn-light-bkg' type="submit">Crear</button>
                </form>
            </Container>
        </div>
    );
};

export default CreateStockItem;
