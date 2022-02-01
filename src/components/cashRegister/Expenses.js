/**********************Importacion de Librerias****************************/

import React, { useState } from "react";
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
    description: yup.string().trim().required('Ingresa en que se gastó el dinero'),
    expense_amount: yup.number().typeError('Aqui va la cantidad gastada').required(),
    //channel: yup.string().trim().required('Por ser inventariable debe asignarsele un lugar físico'),
});


const Expenses = () => {


    //la propiedad de channel debe venir del token, pero sera Arsenal por ahora
    const [response, setResponse] = useState({});
    //const [lastOpen, setLastOpen] = useState({});



    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = (data) => {


        const answer = window.confirm(`Estas registrando un gasto\npor: ${data.expense_amount} \n¿Estas segur@?`);
        if (answer) {
            // Save it!
            fetch(`${server}/cash/expense`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(json => setResponse(json));
            console.log(response);
            reset();
        } else {
            // Do nothing!
        }
    };

    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Registra gastos menores</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/" className='inicio'>Inicio</Link>
            <Link to="/cash" className='volver'>Volver</Link>
            <Container >
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <label htmlFor='description' className='label'>Monto</label>
                        <textarea  {...register("description")}
                            className="campo_entrada"
                            placeholder="Descripcion de los elementos comprados"
                        />
                        <p className='error'>{errors.description?.message}</p>
                    </Row>
                    <Row>
                        <label htmlFor='expense_amount' className='label'>Monto</label>
                        <input {...register("expense_amount")}
                            className="campo_entrada"
                            placeholder="Monto del gasto"

                        />
                        <p className='error'>{errors.expense_amount?.message}</p>
                    </Row>


                    <button className='btn-light-bkg' type="submit">Registrar</button>
                </form>
            </Container>
        </div>
    )
}

export default Expenses
