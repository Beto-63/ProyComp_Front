/**********************Importacion de Librerias****************************/

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'

const schema = yup.object({
    /*El primero debe ser el tipo de dato y el ultimo debe ser el required*/
    cash_on_hand: yup.number().typeError('Aqui va lo que tienes en efectivo').required(),
    amount_to_deposit: yup.number(),
    change_amount: yup.number()
});

const CloseRegister = () => {

    const [lastOpen, setLastOpen] = useState({});
    const [canClose, setCanClose] = useState(false);
    const [lastClose, setLastClose] = useState({});
    const [sellTickets, setSellTickets] = useState([{}]);
    const [deposits, setDeposits] = useState([{}]);
    const [expenses, setExpenses] = useState([{}]);
    const [newAmountToDeposit, setNewAmountToDeposit] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [nonCashSales, setNonCashSales] = useState(0)
    const [CashSales, setCashSales] = useState(0)
    const [totalDeposits, setTotalDeposits] = useState(0)
    const [expectedCashOnHand, setExpectedCashOnHand] = useState(0)



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
        console.log("deposits", deposits)
        console.log("expenses", expenses)
        console.log("sellTickets", sellTickets)
        console.log("Estado de aperturas anteriores", lastOpen.status)
        console.log("Estado de cierres anteriores", lastClose.status)
        if (lastOpen.status == 1 && lastClose.status == 0) { setCanClose(true) }
        console.log(canClose)
        temp = 0
        deposits.forEach(element => { temp = temp + element.amount });
        console.log("deposits", temp)
        setTotalDeposits(temp)
        temp = 0
        expenses.forEach(element => { temp = temp + element.expense_amount });
        console.log("expenses", temp)
        setTotalExpenses(temp)
        let tempCash = 0
        let tempNonCash = 0
        let tempTotal = 0
        sellTickets.forEach(element => {
            tempTotal = tempTotal + element.amount_sold;
            if (element.payment_method = 'Cash') {
                tempCash = tempCash + element.amount_sold
            } else {
                tempNonCash = tempNonCash + element.amount_sold
            }
        });
        console.log("Ventas totales", tempTotal)
        console.log("Ventas Cash", tempCash)
        console.log("Ventas No Cash", tempNonCash)

        setTotalSales(tempTotal)
        setNonCashSales(tempNonCash)
        setCashSales(tempCash)
        setExpectedCashOnHand(
            lastOpen.change_amount +
            lastOpen.amount_to_deposit +
            CashSales -
            totalDeposits -
            totalExpenses
        )


        tempCash = 0
        tempNonCash = 0
        tempTotal = 0


    }, [deposits, expenses, sellTickets, lastClose, lastOpen, canClose]);

    const onSubmit = (data) => {

    }

    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Vas a cerrar ya?</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/" className='inicio'>Inicio</Link>
            <Link to="/cash" className='volver'>Volver</Link>
            <Container >
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <label htmlFor='change_on_hand' className='label'>Cuenta el efectivo que tienes en caja</label>
                        </Col>
                        <Col>
                            <input {...register("cash_on_hand")}
                                className="campo_entrada"
                                placeholder="Base de caja para vueltos"
                                id='cash_on_hand'
                            // onChange={handleOpen}
                            />
                            <p className='error'>{errors.cash_on_hand?.message}</p>
                        </Col>
                    </Row>
                    <br />
                    <br />
                </form>
            </Container>
        </div>
    )
}

export default CloseRegister
