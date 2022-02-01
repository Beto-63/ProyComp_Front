import React, { useState } from 'react';

export const ThemeContext = React.createContext();

const CashContext = (props) => {

    const [canOpen, setCanOpen] = useState(false)
    const [canClose, setCanClose] = useState(false)
    const confirmacion = 'Se ve la info desde el contexto'
    return (
        <ThemeContext.Provider value={{
            canOpen, setCanOpen,
            canClose, setCanClose,
            confirmacion
        }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default CashContext;
