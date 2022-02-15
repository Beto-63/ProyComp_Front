import React, { useContext, useEffect, useState } from 'react'
import STClientForm from './STClientForm';
import SellTicketContext from '../../context/SellTicketContext';
import STProductSelect from './STProductSelect';
/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/

const STClient = () => {
    //Uso del contexto
    const { handleClientRegister, setOrigins, setPaymentMethods } = useContext(SellTicketContext)
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

    //Manejador para el cliente
    const handleClient = (objClient) => {
        //Utilizar funcion del contexto
        handleClientRegister(objClient)
            .then(async resp => {
                if (resp.status === 201) {
                    let json = await resp.json();
                    //almacenar los objetos recibidos del ClientForm en un array
                    let array = [...client, json] //si ponemos objClient en lugar de json se mostrará todo el objeto en el hook
                    //enviar el array al useState "client"
                    setClient(array)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            {/*Se envía el handleClient como prop al formulario*/}
            <STClientForm handleClient={handleClient} />
        </div>

    )
}

export default STClient