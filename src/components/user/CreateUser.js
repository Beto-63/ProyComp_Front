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
    name: yup.string().trim().required('Ingresa el nombre del usuario'),
    email: yup.string().email('Formato de correo invalido').required('El usuario se identifica en el sistema con su email'),
    email2: yup.string().oneOf([yup.ref('email')], 'No coincide con el ingresado').required(),
    password: yup.string().trim().min(6, 'Minimo 6 caracteres').required('Se requiere password'),
    password2: yup.string().oneOf([yup.ref('password')], 'No coincide con el ingresado').required(),
    personal_email: yup.string().email(),
    phone_number: yup.number().typeError('Numeros Unicamente: nacional 60+Cod+número / intl +Cod país+Cod+número ').required(),
    channel: yup.string().trim().required('Aqui debe ir el canal que atiende el usuario'),
    user_cat: yup.string().trim().required('Aqui va el nombre del rol'),
    // status:va por defecto en 2

});



const CreateUser = () => {

    const [ubicaciones, setUbicaciones] = useState([{}]);
    const [roles, setRoles] = useState([{}]);

    useEffect(() => {
        fetch(`${server}/stock/channels`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify()
        })
            .then(response => response.json())
            .then(json => setUbicaciones(json));
    }, [])

    useEffect(() => {
        fetch(`${server}/user/cats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify()
        })
            .then(response => response.json())
            .then(json => setRoles(json));
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {

        const objUser = {
            name: data.name,
            email: data.email,
            personal_email: data.personal_email,
            phone_number: data.phone_number,
            password: data.password,
            channel: data.channel,
            user_cat: data.user_cat,
            status: 2
        }
        window.alert("No olovidar comunicar este password temporal al usuario: \n", JSON.stringify(data.password))
        fetch(`${server}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(objUser)
        })
            .then(response => response.json())
            .then(json => window.alert(JSON.stringify(json)))
        reset();
    }

    return (

        <div className='canvas_claro' >
            <p className="titulo_oscuro">Creación de usuario</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/menu" className='inicio'>Inicio</Link>
            <Link to="/user" className='volver'>Volver</Link>
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
                            type='password'
                            className="campo_entrada"
                            placeholder="Password temporal (será cambiado por el usuario al ingresar)"
                        />
                        {/* Esta es la manera como 'yup' pone los mensajes de error sehun la 
                        defincion del schema */}
                        <p className='error'>{errors.password?.message}</p>
                    </Row>
                    <Row>
                        <input {...register("password2")}
                            type='password'
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
                        <p className='error'>{errors.user_cat?.message}</p>
                    </Row>
                    <button className='btn-light-bkg' type="submit">Crear</button>
                </form>
            </Container>
        </div>
    )
};

export default CreateUser;
