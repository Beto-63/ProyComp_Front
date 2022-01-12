import React, { useState } from 'react'
import ClientForm from '../components/clientes/ClientForm'

const Client = () => {
    //estado que va a almacenar en un arreglo los datos del ClientForm 
    const [client, setClient] = useState([]);
    //Manejador para el cliente
    const handleClient = (objClient)=>{
        let array = [...client, objClient]
        setClient(array)
    }
    
    return (
        <div>
            <h2>Cliente</h2>
            {/*Se envía el handleClient como prop al formulario*/}
            <ClientForm handleClient={handleClient}/>
        </div>
        
    )
}

export default Client