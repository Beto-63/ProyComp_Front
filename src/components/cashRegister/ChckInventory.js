import React, { useEffect, useContext, } from 'react'

import CashContext from '../../context/CashContext';

const ChckInventory = () => {

    const { setConfirmacion } = useContext(CashContext)

    useEffect(() => {
        setConfirmacion('')
    }, [setConfirmacion]);

    return (
        <div>
            <h1> Check Inventory</h1>
        </div>
    )
}

export default ChckInventory
