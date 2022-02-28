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
import '../generic/Light-bkg.css'


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
                <form onSubmit={handleSubmit(onSubmit)}>

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


                    <label className="titulo_claro">Género:</label>

                    <div className="radio">

                        <input {...register("gender")}
                            type='radio'
                            id={`F`}
                            name="gender"
                            value={"F"}
                            label="F"
                        />

                        <input {...register("gender")}
                            type='radio'
                            id={`M`}
                            name="gender"
                            value={"M"}
                            label="M"
                        />

                        <input {...register("gender")}
                            type='radio'
                            id={`Otro`}
                            name="gender"
                            value={"Otro"}
                            label="Otro"
                        />

                        <p className='error-drk-bkg'>{errors.gender?.message}</p>
                    </div>
                    <label className="titulo_claro">Edad:</label>
                    <div className="radio">
                        <input {...register("age_group")}

                            inline
                            label="0-11"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-1`}
                            value={'0-11'}
                        />
                        <input {...register("age_group")}

                            inline
                            label="12-19"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-2`}
                            value={'12-19'}
                        />
                        <input {...register("age_group")}

                            inline
                            label="20-29"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-3`}
                            value={'20-29'}
                        />
                        <input {...register("age_group")}

                            inline
                            label="30-40"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-4`}
                            value={'30-40'}
                        />
                        <input {...register("age_group")}

                            inline
                            label="41-60"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-5`}
                            value={'41-60'}
                        />
                        <input {...register("age_group")}

                            inline
                            label="61-80"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-6`}
                            value={'61-80'}
                        />
                        <input {...register("age_group")}

                            inline
                            label="Mayor"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-7`}
                            value={'81-100'}
                        />
                        <p className='error-drk-bkg'>{errors.age_group?.message}</p>
                    </div>

                    <button type="submit" className='btn-dark-bkg-small'>Continuar</button>
                </form>
            </Container>

        </div>
    )
}

export default ClientForm