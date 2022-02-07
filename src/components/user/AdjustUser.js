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
    email: yup.string().email().required(),
    email2: yup.string().email().required(),
    password: yup.string().trim().required(),
    passwor2: yup.string().trim().required(),
    personal_email: yup.string().email().required(),
    phone_number: yup.string().trim().required(),
    channel: yup.string().trim().required('Por ser inventariable debe asignarsele un lugar físico'),
    user_cat: yup.string().trim().required(),
    // status:va por defecto en 2
    cat_name: yup.string().trim().required('La categoria sirve para hacer mas cortas las selecciones')
});

const AdjustUser = () => {

    const [ubicaciones, setUbicaciones] = useState([{}]);
    const [roles, setRoles] = useState([{}]);

    useEffect(() => {
        fetch(`${server}/stock/channels`)
            .then(response => response.json())
            .then(json => setUbicaciones(json));
    }, [])

    useEffect(() => {
        fetch(`${server}/user/cats`)
            .then(response => response.json())
            .then(json => setRoles(json));
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleUser = () => {
        //busca los datos del Usuario y los presenta en el formulario como en ajuste de producto
    }

    const onSubmit = (data) => {
    }


    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Ajuste a datos de usuario</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/" className='inicio'>Inicio</Link>
            <Link to="/user" className='volver'>Volver</Link>
            <Container >
                <Row>
                    <h4> email para ajuste de datos </h4>
                    <p> esta funcion sera solo para el admin \n y debera ser
                        refrescado el password en caso de ser este cambiado
                    </p>
                </Row>





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
                        <input {...register("email")}
                            className="campo_entrada"
                            placeholder="email de El Doko"
                        />
                        {/* Esta es la manera como 'yup' pone los mensajes de error sehun la 
                        defincion del schema */}
                        <p className='error'>{errors.email?.message}</p>
                    </Row>
                    <Row>
                        <input {...register("email2")}
                            className="campo_entrada"
                            placeholder="Validacione del email de El Doko"
                        />
                        {/* Esta es la manera como 'yup' pone los mensajes de error sehun la 
                        defincion del schema */}
                        <p className='error'>{errors.email2?.message}</p>
                    </Row>
                    <Row>
                        <input {...register("password")}
                            className="campo_entrada"
                            placeholder="Password"
                        />
                        {/* Esta es la manera como 'yup' pone los mensajes de error sehun la 
                        defincion del schema */}
                        <p className='error'>{errors.password?.message}</p>
                    </Row>
                    <Row>
                        <input {...register("password2")}
                            className="campo_entrada"
                            placeholder="Validación del password temporal"
                        />
                        {/* Esta es la manera como 'yup' pone los mensajes de error sehun la 
                        defincion del schema */}
                        <p className='error'>{errors.password2?.message}</p>
                    </Row>
                    <Row>
                        <input {...register("personal_email")}
                            className="campo_entrada"
                            placeholder="Email personal"
                        />
                        {/* Esta es la manera como 'yup' pone los mensajes de error sehun la 
                        defincion del schema */}
                        <p className='error'>{errors.personal_email?.message}</p>
                    </Row>
                    <Row>
                        <input {...register("phone_number")}
                            className="campo_entrada"
                            placeholder="Teléfono personal"
                        />
                        {/* Esta es la manera como 'yup' pone los mensajes de error sehun la 
                        defincion del schema */}
                        <p className='error'>{errors.phone_number?.message}</p>
                    </Row>
                    <Row>
                        <select {...register("channel")}
                            className="campo_entrada"
                            placeholder="Ubicación Física"
                        >
                            {/* aqui se usa la variable Ubicaciones */}
                            <option value=''>Ingrese ubicacion donde operará el usuario</option>
                            {ubicaciones.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.channel?.message}</p>
                    </Row>
                    <Row>
                        <select {...register("user_cat")}
                            className="campo_entrada"
                            placeholder="Rol o categoría del usuario"
                        >
                            <option value=''>Ingrese rol o categoría del usuario</option>
                            {roles.map((e, index) => {
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

export default AdjustUser;
