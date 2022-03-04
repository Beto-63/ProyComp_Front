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
    name: yup.string().trim(),
    personal_email: yup.string().email(),
    phone_number: yup.number().typeError('Numeros Unicamente: nacional 60+Cod+número / intl +Cod país+Cod+número '),
    channel: yup.string().trim(),
    user_cat: yup.string().trim(),
    status: yup.number(),
    original_email: yup.string().email('Formato de correo invalido')
        .required('El email permite traer los campos editables'),
});

const AdjustUser = () => {

    const objUser = {
        name: '',
        email: '',
        password: '',
        personal_email: '',
        phone_number: '',
        channel: '',
        user_cat: '',
        status: null
    }

    const [ubicaciones, setUbicaciones] = useState([{}]);
    const [roles, setRoles] = useState([{}]);
    const [toEdit, setToEdit] = useState(objUser);

    // useEffect(() => {

    // }, [toEdit]);


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

    const handleUser = () => {

        let objUser = {
            email: document.getElementById('original_email').value.trim(),
        }
        fetch(`${server}/user/byEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(objUser)
        })
            .then(response => response.json())
            .then(json => setToEdit(json));
        //busca los datos del Usuario y los presenta en el formulario como en ajuste de producto
    }

    const onSubmit = (data) => {
        let newObj = { id: toEdit._id }
        if (data.name !== '') {
            newObj = { ...newObj, name: data.name }
        } else {
            newObj = { ...newObj, name: toEdit.name }
        }
        if (data.personal_email !== '') {
            newObj = { ...newObj, personal_email: data.personal_email }
        } else {
            newObj = { ...newObj, personal_email: toEdit.personal_email }
        }
        if (data.phone_number !== '') {
            newObj = { ...newObj, phone_number: data.phone_number }
        } else {
            newObj = { ...newObj, phone_number: toEdit.phone_number }
        }
        if (data.channel !== '') {
            newObj = { ...newObj, channel: data.channel }
        } else {
            newObj = { ...newObj, channel: toEdit.channel }
        }
        if (data.user_cat !== '') {
            newObj = { ...newObj, user_cat: data.user_cat }
        } else {
            newObj = { ...newObj, user_cat: toEdit.user_cat }
        }
        if (data.status !== '') {
            newObj = { ...newObj, status: data.status }
        } else {
            newObj = { ...newObj, status: toEdit.status }
        }
        fetch(`${server}/users`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            //enviamos los datos por body y se debe convertir el objeto en JSON
            body: JSON.stringify(newObj)
        })
            .then(response => response.json())
            .then(json => window.alert(JSON.stringify(json)))
        reset();
        setToEdit(objUser);



    }


    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Ajuste a datos de usuario</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/menu" className='inicio'>Inicio</Link>
            <Link to="/user" className='volver'>Volver</Link>
            <Container >
                <form className='container' onSubmit={handleSubmit(onSubmit)}>

                    <Row>
                        <input {...register("original_email")} on onBlur={handleUser}
                            className="campo_entrada"
                            placeholder="Email del usuario"
                            defaultValue={''}
                            id='original_email'
                        />
                        <p className='error'>{errors.original_email?.message}</p>
                    </Row>
                    {/* <button className='btn-light-bkg' type="submit">Buscar</button> */}


                    {/***********************  elementos a editar ***********************************/}
                    <h6>Datos para corrección - solo editar los que cambian</h6>

                    <Row>
                        {/* poner "{...register("name")}" en el input o el select, es la 
                        manera como react-hook-form incluye ese campo como un valor 
                        del objeto de datos en la forma */}
                        <label htmlFor='name' className='label'>Nombre del usuario</label>
                        <input {...register("name")}
                            className="campo_entrada"
                            placeholder={toEdit.name}
                        />
                        {/* Esta es la manera como 'yup' pone los mensajes de error sehun la 
                        defincion del schema */}
                        <p className='error'>{errors.name?.message}</p>
                    </Row>
                    <Row>
                        <label htmlFor='personal_email' className='label'>Correo personal</label>
                        <input {...register("personal_email")}
                            className="campo_entrada"
                            placeholder={toEdit.personal_email}
                        />
                        {/* Esta es la manera como 'yup' pone los mensajes de error sehun la 
                        defincion del schema */}
                        <p className='error'>{errors.personal_email?.message}</p>
                    </Row>
                    <Row>
                        <label htmlFor='phone_number' className='label'>Número de teléfono</label>
                        <input {...register("phone_number")}
                            className="campo_entrada"
                            placeholder={toEdit.phone_number}
                        />
                        {/* Esta es la manera como 'yup' pone los mensajes de error sehun la 
                        defincion del schema */}
                        <p className='error'>{errors.phone_number?.message}</p>
                    </Row>
                    <Row>
                        <label htmlFor='channel' className='label'>Tienda donde trabaja</label>
                        <select {...register("channel")}
                            className="campo_entrada"
                            placeholder={toEdit.channel}
                        >
                            {/* aqui se usa la variable Ubicaciones */}
                            <option >{toEdit.channel}</option>
                            {ubicaciones.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.channel?.message}</p>
                    </Row>
                    <Row>
                        <label htmlFor='user_cat' className='label'>Rol del usuario</label>
                        <select {...register("user_cat")}
                            className="campo_entrada"
                            placeholder={toEdit.user_cat}
                        >
                            <option value=''>{toEdit.user_cat}</option>
                            {roles.map((e, index) => {
                                return (
                                    <option key={index} value={e.name} >{e.name}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.user_cat?.message}</p>
                    </Row>
                    <Row>
                        <select {...register("status")}
                            className="campo_entrada"
                            placeholder={toEdit.status}
                        >
                            <option value=''>Defina el estado del usuario asi:</option>
                            <option value={0}>0 || Deshabilitar</option>
                            <option value={1}>1 || Activar</option>
                            <option value={2}>2 || Restablecer contraseña </option>
                        </select>
                        <p className='error'>{errors.status?.message}</p>
                    </Row>
                    <button className='btn-light-bkg' type="submit">Ajustar</button>
                    <h6>Si requiere cambiar el correo, deshabilite el usuario y cree uno nuevo</h6>
                    <h6>Si requiere cambiar el password de un usaurio, hacerlo por la opción
                        de cambio: olvidé mi password, en la pagina de ingreso</h6>
                </form>
            </Container>
        </div>
    );
};

export default AdjustUser;
