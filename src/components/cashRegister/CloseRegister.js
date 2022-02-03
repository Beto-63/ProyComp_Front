/**********************Importacion de Librerias****************************/

import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
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
    cash_on_hand: yup.number().typeError('Aqui va lo que tienes en efectivo').required(),
    amount_to_deposit: yup.number(),
    change_amount: yup.number()
});

const CloseRegister = () => {

    const { setConfirmacion, lastOpen, lastClose, canClose, setCanClose } = useContext(CashContext)

    useEffect(() => {
        setConfirmacion('')
    }, [setConfirmacion]);

    const [sellTickets, setSellTickets] = useState([{}]);
    const [totalSales, setTotalSales] = useState(0);
    const [deposits, setDeposits] = useState([{}]);
    const [totalDeposits, setTotalDeposits] = useState(0)
    const [expenses, setExpenses] = useState([{}]);
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [newAmountToDeposit, setNewAmountToDeposit] = useState(0);
    const [cashSales, setCashSales] = useState(0)
    const [nonCashSales, setNonCashSales] = useState(0)
    const [countedCash, setCountedCash] = useState(0)
    const [expectedCashOnHand, setExpectedCashOnHand] = useState(0)
    const [paymentMethods, setPaymentMethods] = useState([{}])

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        fetch(`${server}/paymentMethods`)
            .then(response => response.json())
            .then(json => setPaymentMethods(json));
    }, [])

    useEffect(() => {
        fetch(`${server}/cash/expense/unaccounted`)
            .then(response => response.json())
            .then(json => setExpenses(json));
    }, [])

    useEffect(() => {
        fetch(`${server}/cash/deposit/unaccounted`)
            .then(response => response.json())
            .then(json => setDeposits(json));
    }, [])

    useEffect(() => {
        fetch(`${server}/cash/sellTickets/unaccounted`)
            .then(response => response.json())
            .then(json => setSellTickets(json));
    }, [])

    useEffect(() => {
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

    const handleNewChangeAmount = () => {
        if ((expectedCashOnHand - countedCash) === 0) {
            setCanClose(true)
        } else {
            setCanClose(false)
        }
        console.log("medios de pago", paymentMethods)
        setNewAmountToDeposit(
            lastOpen[0].change_amount +
            lastOpen[0].amount_to_deposit +
            cashSales -
            totalDeposits -
            totalExpenses - document.getElementById('change_amount').value
        )
    }

    const handleCountedCash = () => {

        setCountedCash(document.getElementById('cash_on_hand').value)

        setExpectedCashOnHand(
            lastOpen[0].change_amount +
            lastOpen[0].amount_to_deposit +
            cashSales -
            totalDeposits -
            totalExpenses
        )
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
            } else {
                // Do nothing!
            }
        } else {
            alert(`La cantidad Ingresada de efectivo en caja no coincide\n 
                    asegurese de registrar los gastos y las consignaciones\n
                    e intentelos de nuevo`)
        }
    }

    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Vas a cerrar ya?</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/" className='inicio'>Inicio</Link>
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
                                id='cash_on_hand' onChange={handleCountedCash}

                            />
                            <p className='error'>{errors.cash_on_hand?.message}</p>
                        </Col>
                    </Row>
                    <p className="label">{`Las ventas en efectivo del dia HOY_______$${cashSales}`}</p>
                    <p className="label">{`Desde el ultimo cierre consigné__________$${totalDeposits},`}</p>
                    <p className="label">{`Desde el ultimo cierre tuve gastos por___$${totalExpenses}`}</p>
                    <hr />
                    <p className="label">{`Se espera tener en efectivo a mano_______$${expectedCashOnHand},`}</p>
                    <hr />

                    <p p className="result">{`La diferencia en la caja_________________$${expectedCashOnHand - countedCash}`}</p>
                    <p className={(expectedCashOnHand - countedCash === 0) ? "perfect" : "result"}>{(expectedCashOnHand - countedCash === 0) ? `Puede cerrar` : (expectedCashOnHand - countedCash > 0) ? `Hay un faltante` : `Hay un excedente`}</p>
                    <Row>
                        <Col>
                            <label htmlFor='change_amount' className='label'>Cual sera la base de cambio manana?</label>
                        </Col>
                        <Col>
                            <input {...register("change_amount")}
                                className="campo_entrada"
                                placeholder="Cambio para Manana"
                                id='change_amount' onChange={handleNewChangeAmount}
                            // onChange={handleOpen}
                            />
                            <p className='error'>{errors.cash_on_hand?.message}</p>
                        </Col>
                    </Row>
                    <p className="label">{`Las ventas en medios electronicos________$${nonCashSales},`}</p>
                    <p className="label">{`Las Ventas totales han sido de___________$${totalSales},`}</p>
                    <p className="result">{`Por tanto debo consignar_________________$${newAmountToDeposit}`}</p>
                    <button className='btn-light-bkg' type="submit">Cerrar</button>
                    <br />
                    <br />
                </form>
            </Container>
        </div >
    )
}

export default CloseRegister
