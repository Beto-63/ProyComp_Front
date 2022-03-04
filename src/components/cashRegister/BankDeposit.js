/**********************Importacion de Librerias****************************/
import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api';
import CashContext from "../../context/CashContext";
import AuthContext from "../../context/AuthContext";

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'


const schema = yup.object({

    amount: yup.number().typeError('Aqui va la cantidad gastada').required(),
    //channel: yup.string().trim().required('Por ser inventariable debe asignarsele un lugar físico'),
});


const BankDeposit = () => {

    const { setAuth } = useContext(AuthContext);

    let navigate = useNavigate();

    const { channel, userEmail } = useContext(CashContext)    //la propiedad de channel debe venir del token por el cash context

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        let objDeposit = { ...data, ...{ channel: channel, user_email: userEmail } }
        const answer = window.confirm(`Estas registrando una consignacion\npor: ${data.amount} \n¿Estas segur@?`);
        if (answer) {
            // Save it!
            fetch(`${server}/cash/deposit`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(objDeposit)
            })
            //.then(response => response.json()) (anterior primer .then)
            //.then(json => window.alert(JSON.stringify(json))) (anterior segundo .then)
            
            .then(async (resp)=>{ // (primer .then)
            
                switch (resp.status) {

                    // Middleware - Inicio
                    
                    case 401:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("Intente autenticarse nuevamente");
                        navigate("/login");
                        break;

                    case 404:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("404");
                        navigate("/login");
                        break;

                    case 403:
                        //localStorage.removeItem("token");
                        //setAuth(false);
                        window.alert("403");
                        navigate("/");
                        break;
                    
                    // Middleware - Fin

                    // Códigos del backend - Inicio

                    case 201:
                        //localStorage.removeItem("token");
                        //setAuth(false);

                        // Se retorna el json con la información
                        let json = await resp.json();

                        //setEjemplo(json); // Recibo de información del backend en json (Segundo .then)
                        window.alert(json);
                        navigate("/");
                        break;

                    case 500:
                        //localStorage.removeItem("token");
                        //setAuth(false);
                        window.alert("500");
                        navigate("/");
                        break;

                    // Códigos del backend - Fin
                
                    default:
                        localStorage.removeItem("token");
                        setAuth(false);
                        window.alert("default case");
                        navigate("/");
                        break;
                }

                /* if(resp.status === 400){
                    //console.log('Status 400: Usuario y/o contraseña invalido');
                    localStorage.removeItem("token");
                    setAuth(false);
    
                    // Cuando halla terminado de guardar
                    setLoading(false);
    
                    navigate("/login");
                }
    
                if(resp.status === 201){
                    // Se retorna el json con la información
                    let json = await resp.json();
    
                    // Cuando halla terminado de guardar
                    setLoading(false);
    
                    //console.log('Login correcto, se recibe el token');
                    //console.log(json.token);
                    // Guardar el token en el localStorage
                    localStorage.setItem('token', json.token);
                    setAuth(true);
                    // Hacer la redirección, usando la función navigate
                    navigate("/");
                } */


            }).catch(error=>{
                console.error(error);
            })
            
            
            
            
            reset();
            navigate('/cash')
        } else {
            // Do nothing!
        }
    };

    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Registra aquí cada consignación</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/menu" className='inicio'>Inicio</Link>
            <Link to="/cash" className='volver'>Volver</Link>
            <Container >
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <label htmlFor='amount' className='label'>Monto</label>
                        <input {...register("amount")}
                            className="campo_entrada"
                            placeholder="Monto consignado"
                        />
                        <p className='error'>{errors.amount?.message}</p>
                    </Row>
                    <button className='btn-light-bkg' type="submit">Registrar</button>
                </form>
            </Container>
        </div>
    )
}

export default BankDeposit