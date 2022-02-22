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

const schema = yup.object({
    /*El primero debe ser el tipo de dato y el ultimo debe ser el required*/
    cash_on_hand: yup.number().typeError('Aqui va lo que tienes en efectivo').required(),
    amount_to_deposit: yup.number(),
    change_amount: yup.number().typeError('Este dato se usa para calcular lo que debes consignar').required(),
});

const CloseRegister = () => {

    let navigate = useNavigate();

    const {
        channel, setChannel,
        canClose, setCanClose,
        confirmacion, setConfirmacion,
        lastOpen, setLastOpen,
        lastClose, setLastClose,
        userName, setUserName,
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

    useEffect(() => {
        // resetea la advertencia de apertura/cierre
        setConfirmacion('')
    }, [setConfirmacion]);

    useEffect(() => {
        //trae los metodos de pago para la clasificacion de las ventas por medio de pago
        fetch(`${server}/paymentMethods`)
            .then(response => response.json())
            .then(json => setPaymentMethods(json));
    }, [])

    useEffect(() => {
        //trae los gastos no cerrados del canal actual
        fetch(`${server}/cash/expense/unaccounted`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ channel: channel })
        })
            .then(response => response.json())
            .then(json => setExpenses(json));
    }, [])

    useEffect(() => {
        //trae los depositos no cerrados del canal actual
        fetch(`${server}/cash/deposit/unaccounted`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ channel: channel })
        })
            .then(response => response.json())
            .then(json => setDeposits(json));
    }, [channel])

    useEffect(() => {
        // TODO filtrar por los del channel que viene del contexto y del token
        //una vez se ajuste la estructura del sell ticket
        fetch(`${server}/cash/sellTickets/unaccounted`)
            .then(response => response.json())
            .then(json => setSellTickets(json));
    }, [])

    useEffect(() => {
        // totaliza los depositos, los gastos las ventas totales/efectivo/otros medios
        let temp = 0
        deposits.forEach(element => { temp = temp + element.amount });
        setTotalDeposits(temp)
        temp = 0
        expenses.forEach(element => { temp = temp + element.expense_amount });
        setTotalExpenses(temp)
        let tempCash = 0
        let tempNonCash = 0
        let tempTotal = 0
        sellTickets.forEach(element => {
            tempTotal = tempTotal + element.amount_sold;
            if (element.payment_method === 'Cash') {
                tempCash = tempCash + element.amount_sold
            } else {
                tempNonCash = tempNonCash + element.amount_sold
            }
        });
        setTotalSales(tempTotal)
        setNonCashSales(tempNonCash)
        setCashSales(tempCash)
    }, [deposits, expenses, sellTickets, lastClose, lastOpen]);

    useEffect(() => {
        //Estabiliza la presentacion de las variables del segundo parametro
    }, [countedCash, expectedCashOnHand]);

    const presentClose = (cash) => {
        if (!(cash / expectedCashOnHand < 0.95) || (cash / expectedCashOnHand > 1.05)) {
            setShowClosure(true)
        }
    }

    const handleCountedCash = () => {

        setExpectedCashOnHand(lastOpen[0].change_amount + lastOpen[0].amount_to_deposit + cashSales - totalDeposits - totalExpenses)
        setCountedCash(document.getElementById('cash_on_hand').value)
        presentClose(document.getElementById('cash_on_hand').value);
    }

    const onSubmit = (data) => {
        const answer = window.confirm(`Estas a pundo de hacer el cierre...\n¿Segur@?`);
        if (canClose) {
            if (answer) {
                let objClose = {
                    operation: 'close',
                    amount_to_deposit: newAmountToDeposit,
                    cash_on_hand: data.change_amount + newAmountToDeposit,
                    change_amount: data.change_amount,
                    channel: 'Arsenal', //del token
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
                    <Row>
                        <Col>
                            <label htmlFor='cash_on_hand' className='label'>Cuenta e ingresa el efectivo que tienes en caja</label>
                        </Col>
                        <Col>
                            <input {...register("cash_on_hand")}
                                className="campo_entrada"
                                placeholder="Efectivo en caja Ahora"
                                id='cash_on_hand' onBlur={handleCountedCash}

                            />
                            <p className='error'>{errors.cash_on_hand?.message}</p>
                        </Col>
                    </Row>
                    {showClosure ?
                        <ClosureDetails />
                        :
                        ''
                    }
                    <button className='btn-light-bkg' type="submit" disabled={showClosure}>Cerrar</button>
                </form>
            </Container>
        </div >
    )
}

export default CloseRegister
