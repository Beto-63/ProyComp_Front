import React, { useContext } from 'react'
import BankDeposit from '../components/cashRegister/BankDeposit'
import CloseRegister from '../components/cashRegister/CloseRegister'
import Expenses from '../components/cashRegister/Expenses'
import NavCashRegister from '../components/cashRegister/NavCashRegister'
import OpenRegister from '../components/cashRegister/OpenRegister'
import CashContext from '../context/CashContext'

function CashRegister() {
    const { confirmacion, setConfirmacion } = useContext(CashContext)
    return (
        <div>

            <NavCashRegister />
            <BankDeposit />
            <CloseRegister />
            <Expenses />
            <OpenRegister />

        </div>
    )
}

export default CashRegister
