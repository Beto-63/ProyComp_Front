/**********************Importacion de Librerias****************************/
import React, { useContext, useEffect } from 'react'

/**********************Importacion de Componentes**************************/
import NavCashRegister from '../components/cashRegister/NavCashRegister'
import CashContext from '../context/CashContext'
import { server } from '../context/Api'

/**********************Importacion de Estilos******************************/
import '../components/generic/Light-bkg.css'

function CashRegister() {

    const { setLastOpen, setLastClose } = useContext(CashContext)
    const channel = "Arsenal" // Esto vendra del Token

    useEffect(() => {
        fetch(`${server}/cash/lastOpen`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ channel: channel })
            }
        )
            .then(response => response.json())
            .then(json => setLastOpen(json));
    }, [setLastOpen])

    useEffect(() => {
        fetch(`${server}/cash/lastClose`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ channel: channel })
            }
        )

            .then(response => response.json())
            .then(json => setLastClose(json));
    }, [setLastClose])

    return (
        <div>
            <NavCashRegister />
        </div>
    )
}

export default CashRegister


