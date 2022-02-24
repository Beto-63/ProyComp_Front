import React, { useContext } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';
import { server } from '../../context/Api'
/**********************Importacion de Estilos******************************/
import '../generic/Nav.css'


const schema = yup.object({
    /*El primero debe ser el tipo de dato y el ultimo debe ser el required*/
    name: yup.string(),
    email: yup.string(),
    gender: yup.string().required().typeError('La información demográfica es importante'),
    age_group: yup.string().required().typeError('La información demográfica es importante')
});


const ClientForm = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const { setClientId } = useContext(SellTicketContext)
    const navigate = useNavigate();



    const onSubmit = (data) => {
        handleClient(data)
        reset()
        console.log(data)
        //TODO condicionar el navigate al response.status 201
        navigate('/sell/catTempSelection')
    }

    const handleClient = (objClient) => {
        fetch(`${server}/client`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            //enviamos los datos por body y se debe convertir el objeto en JSON
            body: JSON.stringify(objClient)
        })
            .then(response => response.json())
            .then(json => setClientId(json))


    }



    return (
        <div className='canvas_oscuro'>
            <h4 className="titulo_claro">¡Bien hecho!</h4>
            <h4 className="titulo_claro">¿Quien es tu cliente?</h4>
            <Link to="/menu" className='inicio' >Inicio</Link>
            <Link to="/menu" className='volver'>Volver</Link>
            <Container>
                <form className='container' onSubmit={handleSubmit(onSubmit)}>

                    <input {...register("name")}
                        className="campo_entrada_cliente"
                        name='name'
                        type="name"
                        placeholder="Nombre (opcional)"
                    />

                    <input {...register("email")}
                        className="campo_entrada_cliente"
                        name='email'
                        type="email"
                        placeholder="Correo Electrónico (opcional)"
                    />
                    <br />


                    <Form.Label>Género:</Form.Label>

                    <div className="mb-3">
                        <Form.Check {...register("gender")}

                            inline
                            label="F"
                            name="gender"
                            type='radio'
                            id={`inline-radio-1`}
                            value={"F"}
                        />
                        <Form.Check {...register("gender")}

                            inline
                            label="M"
                            name="gender"
                            type='radio'
                            id={`inline-radio-2`}
                            value={"M"}
                        />
                        <Form.Check {...register("gender")}

                            inline
                            label="Otro"
                            name="gender"
                            type='radio'
                            id={`inline-radio-3`}
                            value={"Otro"}
                        />
                        <p className='error'>{errors.gender?.message}</p>
                    </div>
                    <Form.Label>Edad:</Form.Label>
                    <div className="mb-3">
                        <Form.Check {...register("age_group")}

                            inline
                            label="0-11"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-1`}
                            value={'0-11'}
                        />
                        <Form.Check {...register("age_group")}

                            inline
                            label="12-19"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-2`}
                            value={'12-19'}
                        />
                        <Form.Check {...register("age_group")}

                            inline
                            label="20-29"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-3`}
                            value={'20-29'}
                        />
                        <Form.Check {...register("age_group")}

                            inline
                            label="30-40"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-4`}
                            value={'30-40'}
                        />
                        <Form.Check {...register("age_group")}

                            inline
                            label="41-60"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-5`}
                            value={'41-60'}
                        />
                        <Form.Check {...register("age_group")}

                            inline
                            label="61-80"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-6`}
                            value={'61-80'}
                        />
                        <Form.Check {...register("age_group")}

                            inline
                            label="Mayor"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-7`}
                            value={'81-100'}
                        />
                        <p className='error'>{errors.age_group?.message}</p>
                    </div>

                    <button type="submit" className='btn-dark-bkg-small'>Continuar</button>
                </form>
            </Container>

        </div>
    )
}

export default ClientForm