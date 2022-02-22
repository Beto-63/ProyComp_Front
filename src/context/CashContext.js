import React, { useState, createContext } from 'react';

const CashContext = createContext();

const CashProvider = ({ children }) => {

    const [lastOpen, setLastOpen] = useState([{}]);
    const [lastClose, setLastClose] = useState([{}]);

    //const [canOpen, setCanOpen] = useState(false)
    const [canClose, setCanClose] = useState(false)
    const [confirmacion, setConfirmacion] = useState('')
    const [channel, setChannel] = useState("Arsenal")   //tomarlo del Token
    const [userEmail, SetUserEmail] = useState("temporal")    //tomarlo del token
    const [showClosure, setShowClosure] = useState(false)
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
