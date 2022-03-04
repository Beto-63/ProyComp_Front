import React, { useContext, useEffect } from 'react'
import ClientForm from './ClientForm';
import SellTicketContext from '../../context/SellTicketContext';

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api'


const Client = () => {
    //Uso del contexto
    const { setOrigins, setPaymentMethods, setCategories } = useContext(SellTicketContext)

    useEffect(() => {
        fetch(`${server}/origins`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify()
        })
            .then(response => response.json())
            .then(json => setOrigins(json));
    }, [setOrigins])

    useEffect(() => {
        fetch(`${server}/paymentMethods`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify()
        })
            .then(response => response.json())
            .then(json => setPaymentMethods(json));
    }, [setPaymentMethods])

    useEffect(() => {
        fetch(`${server}/product/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify()
        })
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