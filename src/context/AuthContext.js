import { createContext, useEffect, useState } from "react";
//import { apiLogin, apiRegister } from "./Api";

import { server } from './Api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    /******************************************************************************
    * Debe siempre empezar en "false" cuando esten implementadas las seguridades  *
    *por ahora se deja en "true"                                                  *
    ******************************************************************************/
    const [auth, setAuth] = useState(true);
    //const [token, setToken] = useState('');

    /*useEffect(()=>{

        const token = localStorage.getItem('token');

        // Es cuando la variable 'token' del localStorage trae algo, haga el fetch con el backend
        if (token != null) {

            console.log('AuthContext.js : fetch verify (Se valida el token para permitir navegar rutas privadas)');

            fetch(`${server}/verify`, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify()
            }).then(async (resp)=>{
    
                //const status = resp.status;
                //console.log(status);
    
                if(resp.status === 200){
                    // Se retorna el json con la información
                    //let json = await resp.json();
                    //console.log(json);
                    // Guardar el token en el localStorage
                    //localStorage.setItem('token', json.token);
                    setAuth(true);
                    // Hacer la redirección, usando la función navigate
                    //navigate("/");
                }else{
                    //let json = await resp.json();
                    //console.log(json);
    
                    localStorage.removeItem("token");
                    setAuth(false);
                    //navigate("/");
                }
            }).catch(error=>{
                console.error(error);
            })

        } else {
        // Es cuando la variable 'token' no existe en el localStorage, no pase por el fetch

            console.log('AuthContext.js : localStorage token null');
            localStorage.removeItem("token"); // No necesario, pero dejada por seguridad
            setAuth(false);
            //navigate("/");
        }

    }, []); */


    // ****************** Código del profesor ***********************

    /* useEffect(()=>{
        let token = localStorage.getItem('token');
        if(token){
            setAuth(true);
        }
    }, []); */

    // const handleRegister = (objUser)=>{
    //     fetch(apiRegister, {
    //         method: 'POST',
    //         headers:{
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(objUser)
    //     }).then(async (resp)=>{ 
    //         if(resp.status === 201){
    //             let json = await resp.json();
    //             localStorage.setItem('token', json.token);
    //             setAuth(true);
    //         }
    //     }).catch(error=>{
    //         console.error(error);
    //     })
    // }

    // const handleLogin = async (objUser)=>{
    //     let resp = await fetch(apiLogin, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(objUser)
    //     });

    //     if(resp.status === 200){
    //         setAuth(true);
    //     }

    //     return resp;
    // }

    // const data = {handleRegister, auth, handleLogin}
    const data = {  
                    auth, setAuth,
                    //token, setToken 
                }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export { AuthProvider };
export default AuthContext;