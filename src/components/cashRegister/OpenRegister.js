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
    change_amount: yup.number().typeError('Aqui va lo que reservas para vueltos').moreThan(2000, 'Menos de 20 es poco!').required(),
    amount_to_deposit: yup.number()
});

const OpenRegister = () => {


    const [lastOpen, setLastOpen] = useState({});
    const [lastClose, setLastClose] = useState({});
    const [newAmountToDeposit, setNewAmountToDeposit] = useState(0);
    const [canOpen, setCanOpen] = useState(false);

    useEffect(() => {
        fetch(`${server}/cash/lastOpen`)
            .then(response => response.json())
            .then(json => setLastOpen(json));
    }, [])

    useEffect(() => {
        fetch(`${server}/cash/lastClose`)
            .then(response => response.json())
            .then(json => setLastClose(json));
    }, [])






    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    useEffect(() => {
        console.log("Effect")


    }, [lastClose, lastOpen])

    const handleOpen = () => {
        setNewAmountToDeposit(lastClose.change_amount + lastClose.amount_to_deposit - document.getElementById('change_amount').value)
    };

    const onSubmit = (data) => {
        let obj = {
            operation: 'open',
            amount_to_deposit: newAmountToDeposit,
            cash_on_hand: data.change_amount + newAmountToDeposit,
            change_amount: data.change_amount,
            channel: 'Arsenal', //del token
            status: 1
        }
        // fetch de apertura
        fetch(`${server}/cash/last/transaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => console.log('salida fetch de registro', json));

        // fetch de cambio de estado al ultimo cierre NO FUNCIONA
        fetch(`${server}/cash/lastClose/account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lastClose.id)
        })
            .then(response => response.json())
            .then(json => console.log("salida fetch de cierre", json));

        if (lastClose.status == 1 && lastOpen.status == 0) console.log("fetch")
        console.log("Data", data)
        console.log("Obj", obj)
        reset();
    };


    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Abre tu caja</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/" className='inicio'>Inicio</Link>
            <Link to="/cash" className='volver'>Volver</Link>
            <Container >
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <label htmlFor='change_amount' className='label'>Cantidad para aprovisionar vueltos</label>
                        <input {...register("change_amount")}
                            className="campo_entrada"
                            placeholder="Base de caja para vueltos"
                            id='change_amount'
                            onChange={handleOpen}
                        />
                        <p className='error'>{errors.change_amount?.message}</p>
                    </Row>
                    <br />
                    <br />
                    <p className="label">{`El cierre anterior tenia una base de  $ ${lastClose.change_amount},`}</p>
                    <p className="label">{`y habia un monto por consignar de     $${lastClose.amount_to_deposit}`}</p>
                    <p className="result">{`El Nuevo Valor a consignar es ahora   $${newAmountToDeposit}`}</p>



                    <button className='btn-light-bkg' type="submit">Abrir Caja(alerta)</button>
                </form>
            </Container>
        </div>
    )
}

export default OpenRegister
