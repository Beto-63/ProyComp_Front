import React, { useContext, useState } from 'react'
import STClientForm from './STClientForm';
import SellTicketContext from '../../context/SellTicketContext';
import STProductSelect from './STProductSelect';

const STClient = () => {
    //Uso del contexto
    const {handleClientRegister} = useContext(SellTicketContext)
    //estado que va a almacenar en un arreglo los datos del ClientForm 
    const [client, setClient] = useState([]);
    //Manejador para el cliente
    const handleClient = (objClient)=>{
        //Utilizar funcion del contexto
        handleClientRegister(objClient).then(async resp=>{
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
            <STClientForm handleClient={handleClient}/>
            <STProductSelect/>
        </div>
        
    )
}

export default STClient