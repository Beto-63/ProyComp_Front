import React, { useState } from 'react'
import ClientForm from '../components/clientes/ClientForm'

const Client = () => {
    //estado que va a almacenar en un arreglo los datos del ClientForm 
    const [client, setClient] = useState([]);
    //Manejador para el cliente
    const handleClient = (objClient)=>{
        //enviar los datos capturados a la base de datos
        fetch('https://dokotestback.herokuapp.com/client',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            //enviamos los datos por body y se debe convertir el objeto en JSON
            body: JSON.stringify(objClient)
        }).then(async resp=>{
            if(resp.status===201){
                //almacenar los objetos recibidos del ClientForm en un array
                let array = [...client, objClient]
                //enviar el array al useState "client"
                setClient(array)
            }
        }).catch(error=>{
            console.log(error);
        });     
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