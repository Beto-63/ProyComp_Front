import { createContext } from "react";

//se crea el contexto
const ClientContext = createContext();

//se crea el proveedor de contexto (es el que agrupa el arbol de elementos)
const ClientProvider = ({children})=>{

    //Función para enviar petición al servidor
    const handleRegister = async (objClient)=>{
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
    
    const data = {handleRegister};

    return <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
}
//se exportan el context y el provider
export {ClientProvider};
export default ClientContext;