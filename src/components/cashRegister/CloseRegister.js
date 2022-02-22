/**********************Importacion de Librerias****************************/

import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api'
import CashContext from "../../context/CashContext";

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'
import ClosureDetails from "./ClosureDetails";
import ClosureBlind from "./ClosureBlind";

const schema = yup.object({
    /*El primero debe ser el tipo de dato y el ultimo debe ser el required*/

    amount_to_deposit: yup.number(),
    change_amount: yup.number().typeError('Este dato se usa para calcular lo que debes consignar')
});

const CloseRegister = () => {

    let navigate = useNavigate();

    const {
        channel, setChannel,
        canClose, setCanClose,
        confirmacion, setConfirmacion,
        lastOpen, setLastOpen,
        lastClose, setLastClose,
        userEmail, SetUserEmail,
        showClosure, setShowClosure,
        sellTickets, setSellTickets,
        totalSales, setTotalSales,
        deposits, setDeposits,
        totalDeposits, setTotalDeposits,
        expenses, setExpenses,
        totalExpenses, setTotalExpenses,
        newAmountToDeposit, setNewAmountToDeposit,
        cashSales, setCashSales,
        nonCashSales, setNonCashSales,
        countedCash, setCountedCash,
        expectedCashOnHand, setExpectedCashOnHand,
        paymentMethods, setPaymentMethods
    } = useContext(CashContext)


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = (data) => {
        const answer = window.confirm(`Estas a pundo de hacer el cierre...\n¿Segur@?`);
        if (canClose) {
            if (answer) {
                let objClose = {
                    operation: 'close',
                    amount_to_deposit: newAmountToDeposit,
                    cash_on_hand: data.change_amount + newAmountToDeposit,
                    change_amount: data.change_amount,
                    channel: channel,
                    status: 1
                }
                // fetch de cierre
                fetch(`${server}/cash/last/transaction`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(objClose)
                })
                    .then(response => response.json())
                    .then(json => window.alert(JSON.stringify(json)))

                let objSalesToday = {
                    sell_tickets: sellTickets,
                    payment_method: paymentMethods,
                    channel: 'Arsenal', //del token

                }
                // fetch de registro permanente de ventas al cierre
                fetch(`${server}/sales/byMethod`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(objSalesToday)
                })
                    .then(response => response.json())
                    .then(json => window.alert(JSON.stringify(json)))



                expenses.forEach(element => {
                    fetch(`${server}/cash/expense/account`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: element._id })
                    })
                        .then(response => response.json())
                        .then(json => console.log(JSON.stringify(json)))
                });

                deposits.forEach(element => {
                    fetch(`${server}/cash/deposit/account`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: element._id })
                    })
                        .then(response => response.json())
                        .then(json => console.log(JSON.stringify(json)))
                });

                sellTickets.forEach(element => {
                    fetch(`${server}/cash/sellTicket/account`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: element._id })
                    })
                        .then(response => response.json())
                        .then(json => console.log(JSON.stringify(json)))
                });
                fetch(`${server}/cash/lastOpen/account`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: lastOpen[0]._id })
                })
                    .then(response => response.json())
                    .then(json => window.alert(JSON.stringify(json)))
                reset()
                navigate('/cash')
            } else {
                // Do nothing!
            }
        } else {
            alert(`La cantidad Ingresada de efectivo en caja no coincide\n 
                    asegurese de registrar los gastos y las consignaciones\n
                    e intentelos de nuevo`)
        }
        navigate('/cash');
    }

    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Vas a cerrar ya?</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/menu" className='inicio'>Inicio</Link>
            <Link to="/cash" className='volver'>Volver</Link>
            <Container >
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <p className="label">{`La ultima apertura se hizo con una base  _______$${lastOpen[0].change_amount}`}</p>
                    <p className="label">{`y tenias por consignar _________________________$${lastOpen[0].amount_to_deposit},`}</p>
                    <ClosureBlind />
                    {showClosure ?
                        <ClosureDetails />
                        :
                        ''
                    }
                    <button className='btn-light-bkg' type="submit" >Cerrar</button>
                </form>
            </Container>
        </div >
    )
}

export default CloseRegister
