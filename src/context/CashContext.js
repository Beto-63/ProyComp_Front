import React, { useState, createContext } from 'react';

const CashContext = createContext();

const CashProvider = ({ children }) => {

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

    const [canOpen, setCanOpen] = useState(false)
    const [canClose, setCanClose] = useState(false)
    const [confirmacion, setConfirmacion] = useState('')



    const data = {
        canOpen, setCanOpen,
        canClose, setCanClose,
        confirmacion, setConfirmacion,
        lastOpen, setLastOpen,
        lastClose, setLastClose
    }
    return (
        <CashContext.Provider value={data}>
            {children}
        </CashContext.Provider>
    );
};
export { CashProvider };
export default CashContext;
