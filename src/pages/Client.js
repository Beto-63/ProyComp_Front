import React, { useContext, useState } from 'react'
import ClientForm from '../components/clientes/ClientForm'
import ClientContext from '../context/ClientContext';

const Client = () => {
    //Uso del contexto
    const {handleRegister} = useContext(ClientContext)
    //estado que va a almacenar en un arreglo los datos del ClientForm 
    const [client, setClient] = useState([]);
    //Manejador para el cliente
    const handleClient = (objClient)=>{
        //Utilizar funcion del contexto
        handleRegister(objClient).then(async resp=>{
            if(resp.status===201){
                let json = await resp.json();
                //almacenar los objetos recibidos del ClientForm en un array
                let array = [...client, json] //si ponemos objClient en lugar de json se mostrará todo el objeto en el hook
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