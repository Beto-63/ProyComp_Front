import React, { useContext, useEffect, useState } from 'react'
import ClientForm from './ClientForm';
import SellTicketContext from '../../context/SellTicketContext';
import STProductSelect from './STProductSelect';
/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/

const Client = () => {
    //Uso del contexto
    const { handleClientRegister, setOrigins, setPaymentMethods, setCategories } = useContext(SellTicketContext)
    //estado que va a almacenar en un arreglo los datos del ClientForm 
    const [client, setClient] = useState([]);

    useEffect(() => {
        fetch(`${server}/origins`)
            .then(response => response.json())
            .then(json => setOrigins(json));
    }, [])

    useEffect(() => {
        fetch(`${server}/paymentMethods`)
            .then(response => response.json())
            .then(json => setPaymentMethods(json));
    }, [])

    useEffect(() => {
        fetch(`${server}/product/categories`)
            .then(response => response.json())
            .then(json => setCategories(json));
    }, [])


    return (
        <div>
            <ClientForm />
        </div>

    )
}

export default Client