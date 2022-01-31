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
    change_amount: yup.number().typeError('Aqui va lo de reservas para vueltos').moreThan(2000, 'Menos de 20 es poco!').required(),
    amount_to_deposit: yup.number()
});

const OpenRegister = () => {

    const transaction = {
        operation: "",
        cash_on_hand: 0,
        change_amount: 0,
        channel: "",
        status: null,
        amount_to_deposit: 0,
    }


    const [lastOpen, setLastOpen] = useState([{ transaction }]);
    const [lastClose, setLastClose] = useState([{ transaction }]);
    const [newAmountToDeposit, setNewAmountToDeposit] = useState(0);
    const [canOpen, setCanOpen] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

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

    useEffect(() => {
        // console.log("last Open status", lastOpen[0].status)
        // console.log("last Close status", lastClose[0].status)
        if (lastOpen.length === 0 && lastClose.length === 1) { setCanOpen(true) }


    }, [lastClose, lastOpen])

    useEffect(() => {
        console.log("canOpen", canOpen)
    }, [canOpen])

    const handleOpen = () => {
        setNewAmountToDeposit(lastClose[0].change_amount + lastClose[0].amount_to_deposit - document.getElementById('change_amount').value)
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
        console.log("vanOpen antes del fetch", canOpen)
        // fetch de apertura
        if (canOpen) {
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
                body: JSON.stringify({ id: lastClose[0]._id })
            })
                .then(response => response.json())
                .then(json => console.log("salida fetch de cierre", json));
        } else {
            console.log("no se puede hacer apertura")
        }

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
                    <p className="label">{`El cierre anterior tenia una base de  $ ${lastClose[0].change_amount},`}</p>
                    <p className="label">{`y habia un monto por consignar de     $${lastClose[0].amount_to_deposit}`}</p>
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
                    <p className="result">{`El Nuevo Valor a consignar es ahora   $${newAmountToDeposit}`}</p>



                    <button className='btn-light-bkg' type="submit">Abrir Caja(alerta)</button>
                </form>
            </Container>
        </div>
    )
}

export default OpenRegister
