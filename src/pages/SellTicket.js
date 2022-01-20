import React from 'react'
import Client from './Client'
import GeneralNav from '../components/generic/GeneralNav'
import { ClientProvider } from '../context/ClientContext'

function Sell() {
    return (
        <div>
            <GeneralNav />
            VENTAS
            <ClientProvider>
                <Client />
            </ClientProvider>
        </div>
    )
}

export default Sell
