import React from 'react'
import STClient from '../components/sellTicket/STClient'
import GeneralNav from '../components/generic/GeneralNav'
import { SellTicketProvider } from '../context/SellTicketContext'
import ProductContext from '../context/ProductContext'

function Sell() {
    return (
        <div>
            <GeneralNav />
            VENTAS
            <ProductContext>
            <SellTicketProvider>
                <STClient />
            </SellTicketProvider>
            </ProductContext>
        </div>
    )
}

export default Sell
