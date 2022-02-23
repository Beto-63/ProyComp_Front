/**********************Importacion de Librerias****************************/
import React, { useEffect, useState, createContext } from 'react';

/**********************Importacion de Componentes**************************/
import { server } from './Api'

const CashContext = createContext();

const CashProvider = ({ children }) => {

    // estas varables me indican si puedo o no abrir y si puedo o no cerrar
    const [lastOpen, setLastOpen] = useState([{}]);
    const [lastClose, setLastClose] = useState([{}]);
    // Este mensaje se usa para en el momento de hacer un intento de cierre avise que no lo puede hacer
    const [confirmacion, setConfirmacion] = useState('')
    // Se usa para validar que se ha obtenido el valor exacto de cierre de caja y se pueda proceder a cerrar
    const [canClose, setCanClose] = useState(false)
    // estos dos datos se tomaran del token y son especificos del usuario
    const [channel, setChannel] = useState("Arsenal")
    const [userEmail, SetUserEmail] = useState("temporal")
    //esta variable debe definir si puede o no abrir los detalles del cierre con precision del 95%
    const [showClosure, setShowClosure] = useState(false)
    // Estos valosre se usan para recoger la informacion de cierre          
    const [sellTickets, setSellTickets] = useState([{}]);
    const [totalSales, setTotalSales] = useState(0);
    const [deposits, setDeposits] = useState([{}]);
    const [totalDeposits, setTotalDeposits] = useState(0)
    const [expenses, setExpenses] = useState([{}]);
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [cashSales, setCashSales] = useState(0)
    const [nonCashSales, setNonCashSales] = useState(0)
    //se usa para definir las ventas por medio de pago
    const [paymentMethods, setPaymentMethods] = useState([{}])
    //datos de entrada para el cierre
    const [countedCash, setCountedCash] = useState(0)
    const [expectedCashOnHand, setExpectedCashOnHand] = useState(0)
    const [newAmountToDeposit, setNewAmountToDeposit] = useState(0);

    useEffect(() => {
        if ((expectedCashOnHand - countedCash) === 0) {
            setCanClose(true)
        } else {
            setCanClose(false)
        }
    }, [countedCash, expectedCashOnHand])

    useEffect(() => {
        setExpectedCashOnHand(lastOpen[0].change_amount + lastOpen[0].amount_to_deposit + cashSales - totalDeposits - totalExpenses)
    }, [lastOpen, cashSales, totalDeposits, totalExpenses])

    useEffect(() => {
        // TODO filtrar por los del channel que viene del contexto y del token
        //una vez se ajuste la estructura del sell ticket
        fetch(`${server}/cash/sellTickets/unaccounted`)
            .then(response => response.json())
            .then(json => setSellTickets(json));
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
    }, [channel])

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
        //trae los metodos de pago para la clasificacion de las ventas por medio de pago
        fetch(`${server}/paymentMethods`)
            .then(response => response.json())
            .then(json => setPaymentMethods(json));
    }, [])

    const data = {
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
    }
    return (
        <CashContext.Provider value={data}>
            {children}
        </CashContext.Provider>
    );
};
export { CashProvider };
export default CashContext;
