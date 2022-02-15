import React, { useState, createContext } from 'react';

const CashContext = createContext();

const CashProvider = ({ children }) => {

    const [lastOpen, setLastOpen] = useState([{}]);
    const [lastClose, setLastClose] = useState([{}]);

    const [canOpen, setCanOpen] = useState(false)
    const [canClose, setCanClose] = useState(false)
    const [confirmacion, setConfirmacion] = useState('')
    const [channel, setChannel] = useState("Arsenal") //tomarlo del Token





    const data = {
        channel,
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
