/**********************Importacion de Librerias****************************/

import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api'
import CashContext from "../../context/CashContext";

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'

const schema = yup.object({
    /*El primero debe ser el tipo de dato y el ultimo debe ser el required*/
    change_amount: yup.number().typeError('Aqui va lo de reservas para vueltos').moreThan(2000, 'Menos de 20 es poco!').required(),
    amount_to_deposit: yup.number()
});

const OpenRegister = () => {

    let navigate = useNavigate();

    const { setConfirmacion, lastClose, channel, userEmail } = useContext(CashContext)

    useEffect(() => {
        setConfirmacion('')
    }, [setConfirmacion]);


    const [newAmountToDeposit, setNewAmountToDeposit] = useState(0);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleOpen = () => {
        setNewAmountToDeposit(lastClose[0].change_amount + lastClose[0].amount_to_deposit - document.getElementById('change_amount').value)
    };

    const onSubmit = (data) => {
        const answer = window.confirm(`Anota el valore que tienes disponible por consignar: $${newAmountToDeposit} \n¿Abrimos?`);
        if (answer) {
            let obj = {
                operation: 'open',
                amount_to_deposit: newAmountToDeposit,
                cash_on_hand: data.change_amount + newAmountToDeposit,
                change_amount: data.change_amount,
                channel: channel, //del token
                user_email: userEmail, //del token
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
                .then(json => window.alert(JSON.stringify(json)))
            // Al cerrar 
            fetch(`${server}/cash/lastClose/account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: lastClose[0]._id })
            })
                .then(response => response.json())
                .then(json => window.alert(JSON.stringify(json)))

            reset();
            navigate('/cash')
        } else {
            // Do nothing!
        }

    };

    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Abre tu caja</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/menu" className='inicio'>Inicio</Link>
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
                    <button className='btn-light-bkg' type="submit">Abrir</button>
                </form>
            </Container>
        </div>
    )
}

export default OpenRegister