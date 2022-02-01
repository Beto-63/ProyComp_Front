/**********************Importacion de Librerias****************************/

import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'
import CashContext from "../../context/CashContext";

const schema = yup.object({

    amount: yup.number().typeError('Aqui va la cantidad gastada').required(),
    //channel: yup.string().trim().required('Por ser inventariable debe asignarsele un lugar físico'),
});


const BankDeposit = () => {

    const { setConfirmacion } = useContext(CashContext)

    useEffect(() => {
        setConfirmacion('')
    }, [setConfirmacion]);


    //la propiedad de channel debe venir del token, pero sera Arsenal por ahora
    const [response, setResponse] = useState({});


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = (data) => {
        const answer = window.confirm(`Estas registrando una consignacion\npor: ${data.amount} \n¿Estas segur@?`);
        if (answer) {
            // Save it!
            fetch(`${server}/cash/deposit`, {
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
            <p className="titulo_oscuro">Registra aquí cada consignación</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/" className='inicio'>Inicio</Link>
            <Link to="/cash" className='volver'>Volver</Link>
            <Container >

                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <label htmlFor='amount' className='label'>Monto</label>
                        <input {...register("amount")}
                            className="campo_entrada"
                            placeholder="Monto consignado"

                        />
                        <p className='error'>{errors.amount?.message}</p>
                    </Row>


                    <button className='btn-light-bkg' type="submit">Registrar</button>
                </form>

            </Container>
        </div>
    )
}

export default BankDeposit
