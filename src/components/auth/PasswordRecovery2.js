import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button, Spinner } from 'react-bootstrap';

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api';


const PasswordRecovery2 = () => {

    let { token } = useParams();
    //https://v5.reactrouter.com/web/example/no-match
    //console.log(token);

    // Estado para capturar los imputs del formulario
    const [recovery2, setRecovery2] = useState({
        token: '',
        codigoVerificacion: '',
        password1: '',
        password2: ''
    });

    // Define si de puede mostrar el formulario o no
    const [formulario, setFormulario] = useState(false);

    // Estado para "loading" cuando la página esté lenta
    const [loading, setLoading] = useState(false);

    //Redireccionar luego de enviar los datos al backend
    const navigate = useNavigate();

    //Carga inicial para verificar el token en el backend
    useEffect(()=>{

        //console.log('probando')

        fetch(`${server}/recovery/${token}`)
        
        /*, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                //'authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify()
        }) */
        
        .then(async (resp)=>{ 

            if(resp.status === 401){
                //Error al hacer passwordResetRequest (validación del link de restablecer contraseña)
                //return false;

                setFormulario(false);

                navigate("/lost-password");
            }

            if(resp.status === 400){
                //El token no existe o link invalido;
                //return false;

                setFormulario(false);

                navigate("/lost-password");
            }

            if(resp.status === 200){
                //El link es válido / mostrar el formulario para restablecer contraseña
                //return true;

                setFormulario(true);

                // Hacer la redirección, usando la función navigate
                //navigate("/");
            }


        }).catch(error=>{
            console.error(error);
        })


    }, []);


    const handleChange = (e) => {
        //console.log(e.target.name, e.target.value);

        // Cuando los imputs sean tipeados, se actalizan en el useState
        setRecovery2({ ...recovery2, [e.target.name]: e.target.value });
    };

    // Manejar el evento submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir refresco de página del evento submit


        // El objeto que se le va enviar al backend
        //console.log(login);

        //Antes de enviar el formulario
        setLoading(true);

        await fetch(`${server}/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                //'authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(formulario)
        }).then(async (resp)=>{ 
            
            if(resp.status === 400){
                //console.log('Status 400: Código de verificación incorrecto / token incorrecto || Esta cuenta no existe en el sistema. (usuario desactivado / status: 0)');

                // Cuando halla terminado de guardar
                setLoading(false);

                navigate("/lost-password");
            }

            if(resp.status === 201){
                console.log('Status 201: Contraseña actualizada correctamente (redireccionar al login)');
                // Se retorna el json con la información
                let json = await resp.json();
                console.log(json);

                // Cuando halla terminado de guardar
                setLoading(false);

                //console.log('Status 201: Contraseña actualizada correctamente (redireccionar al login)');

                // Hacer la redirección, usando la función navigate
                //navigate("/login");
            }
        }).catch(error=>{
            console.error(error);
        })


        // Cuando halla terminado de guardar
        //setLoading(false);

        // Hacer la redirección, usando la función navigate
        //navigate('/');


    }

    return(

        formulario ? 

            <Container fluid="md">
                <Form onSubmit={handleSubmit}>

                    <Form.Label>Nueva contraseña:</Form.Label>

                    <Form.Group className="mb-3" controlId="codigoVerificacion">
                        <Form.Label>Revisa en tu correo el código de verificación enviado e ingrésalo</Form.Label>
                        <Form.Control

                            name="codigoVerificacion"
                            type="text" 
                            placeholder="Código de verificación"
                            onChange={handleChange}
                        />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password1">
                        <Form.Label>Ingresa tu nueva contraseña</Form.Label>
                        <Form.Control
                            
                            name="password1"
                            type="password" 
                            placeholder="Enter Password"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password2">
                        <Form.Label>Repite la nueva contraseña</Form.Label>
                        <Form.Control
                            
                            name="password2"
                            type="password" 
                            placeholder="Enter Password"
                            onChange={handleChange}
                        />
                    </Form.Group>

                { loading ?

                    <Button variant="primary" type="submit" disabled>
                        <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                        
                        <span style={{ margin: '0', paddingLeft: '5px' }} > 
                            Loading...
                        </span>
                    </Button>

                : 

                    <Button variant="primary" type="submit" disabled={ !recovery2.codigoVerificacion || !recovery2.password1 || !recovery2.password2 }>
                        Iniciar sesión
                    </Button>

                }

                </Form>
            </Container>

        : 
        
        'No muestra nada'
    
        
        
    );
};

export default PasswordRecovery2;
