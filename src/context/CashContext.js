import React, { useState, createContext } from 'react';

const CashContext = createContext();

const CashProvider = ({ children }) => {

    const [canOpen, setCanOpen] = useState(false)
    const [canClose, setCanClose] = useState(false)
    const [confirmacion, setConfirmacion] = useState('Se ve la info desde el contexto')

    const handleRegister = (objCash) => {
        console.log(objCash)
    }

    const data = {
        canOpen, setCanOpen,
        canClose, setCanClose,
        confirmacion, setConfirmacion, handleRegister
    }
    return (
        <CashContext.Provider value={data}>
            {children}
        </CashContext.Provider>
    );
};
export { CashProvider };
export default CashContext;
