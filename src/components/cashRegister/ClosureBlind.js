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

const ClosureBlind = () => {

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

    const presentClose = (cash) => {
        if ((cash > expectedCashOnHand * 0.95) && (cash < expectedCashOnHand * 1.05)) {
            setShowClosure(true)
        } else {
            setShowClosure(false)
            alert("El monto ingresado es muy diferente del esperado. \nAsegurate de haber registrado consignaciones y gastos. \nIntentalo nuevamente")
        }
        let test = expectedCashOnHand
        console.log("Limite superior", test * 1.05)
        console.log("Limite inferior", test * 0.95)

    }

    const handleCountedCash = () => {

        setCountedCash(document.getElementById('cash_on_hand').value)
        presentClose(document.getElementById('cash_on_hand').value);

    }

    return (
        <div>
            <Container >
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
            </Container>
        </div>
    )
}

export default ClosureBlind