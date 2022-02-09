import { createContext, useEffect, useState } from "react";

//se crea el contexto
const SellTicketContext = createContext();

//se crea el proveedor de contexto (es el que agrupa el arbol de elementos)
const SellTicketProvider = ({children})=>{

    
    //Función para enviar petición al servidor
    const handleClientRegister = async (objClient)=>{
        //enviar los datos capturados a la base de datos
        const resp = await fetch('https://dokotestback.herokuapp.com/client',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            //enviamos los datos por body y se debe convertir el objeto en JSON
            body: JSON.stringify(objClient)
        })
        return resp;    
    }
    const getProductByCatName = async (objProduct) => {        
        const resp = await fetch('https://dokotestback.herokuapp.com/product/findByCatName', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(objProduct)
        })
        return resp;
    }

    const [form, setForm] = useState()

    const [product, setProduct] = useState([]);

    const [selected, setSelected] = useState([]);
    console.log('Selected desde el Context: ')
    console.log(selected)
      
    //aqui voy a crear el GET - hay que envolver toda la app con un Contexto global y empezar a hacer los contextos unitarios.
    const data = {handleClientRegister, getProductByCatName, form, setForm, product, setProduct, selected, setSelected };

    return <SellTicketContext.Provider value={data}>{children}</SellTicketContext.Provider>
}

//se exportan el context y el provider
export {SellTicketProvider};
export default SellTicketContext;