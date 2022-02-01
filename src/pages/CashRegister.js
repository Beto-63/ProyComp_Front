import React from 'react'
import BankDeposit from '../components/cashRegister/BankDeposit'
import CloseRegister from '../components/cashRegister/CloseRegister'
import Expenses from '../components/cashRegister/Expenses'
import NavCashRegister from '../components/cashRegister/NavCashRegister'
import OpenRegister from '../components/cashRegister/OpenRegister'
import ThemeContext from '../context/CashContext'

function CashRegister() {
    return (
        <div>
            <ThemeContext>
                <NavCashRegister />
                <BankDeposit />
                <CloseRegister />
                <Expenses />
                <OpenRegister />
            </ThemeContext>
        </div>
    )
}

export default CashRegister
