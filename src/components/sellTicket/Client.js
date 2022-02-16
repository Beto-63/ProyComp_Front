import React, { useContext, useEffect } from 'react'
import ClientForm from './ClientForm';
import SellTicketContext from '../../context/SellTicketContext';

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/

const Client = () => {
    //Uso del contexto
    const { setOrigins, setPaymentMethods, setCategories } = useContext(SellTicketContext)

    useEffect(() => {
        fetch(`${server}/origins`)
            .then(response => response.json())
            .then(json => setOrigins(json));
    }, [setOrigins])

    useEffect(() => {
        fetch(`${server}/paymentMethods`)
            .then(response => response.json())
            .then(json => setPaymentMethods(json));
    }, [setPaymentMethods])

    useEffect(() => {
        fetch(`${server}/product/categories`)
            .then(response => response.json())
            .then(json => setCategories(json));
    }, [setCategories])


    return (
        <div>
            <ClientForm />
        </div>

    )
}

export default Client