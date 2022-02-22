/**********************Importacion de Librerias****************************/
import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Container } from 'react-bootstrap';


/**********************Importacion de Componentes**************************/
import CashContext from "../../context/CashContext";

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'

const ClosureDetails = () => {

    const {
        channel, setChannel,

        canClose, setCanClose,

        lastOpen, setLastOpen,




        totalSales,

        totalDeposits,
        expenses, setExpenses,
        totalExpenses, setTotalExpenses,
        newAmountToDeposit, setNewAmountToDeposit,
        cashSales, setCashSales,
        nonCashSales, setNonCashSales,
        countedCash, setCountedCash,
        expectedCashOnHand, setExpectedCashOnHand,
        paymentMethods, setPaymentMethods
    } = useContext(CashContext)


    const handleNewChangeAmount = () => {

        setNewAmountToDeposit(
            lastOpen[0].change_amount +
            lastOpen[0].amount_to_deposit +
            cashSales -
            totalDeposits -
            totalExpenses - document.getElementById('change_amount').value
        )
    }



    return (
        <>

            <div>
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
                        <input
                            className="campo_entrada"
                            placeholder="Cambio para Manana"
                            id='change_amount' onChange={handleNewChangeAmount}
                        // onChange={handleOpen}
                        />

                    </Col>
                </Row>
                <p className="label">{`Las ventas en medios electronicos________$${nonCashSales},`}</p>
                <p className="label">{`Las Ventas totales han sido de___________$${totalSales},`}</p>
                <p className="result">{`Por tanto debo consignar_________________$${newAmountToDeposit}`}</p>
            </div>
        </>
    )
}

export default ClosureDetails