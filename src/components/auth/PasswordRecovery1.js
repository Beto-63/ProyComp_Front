import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Spinner } from 'react-bootstrap';

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api';


const PasswordRecovery1 = () => {

    // Estado para capturar los imputs del formulario
    const [recovery, setRecovery] = useState({
        user_email: ''
    });

    // Estado para "loading" cuando la página esté lenta
    const [loading, setLoading] = useState(false);

    //Redireccionar luego de enviar los datos al backend
    const navigate = useNavigate();

    const handleChange = e => {
        //console.log(e.target.name, e.target.value);

        // Cuando los imputs sean tipeados, se actalizan en el useState
        setRecovery({ ...recovery, [e.target.name]: e.target.value });
    }

    // Manejar el evento submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir refresco de página del evento submit
    
        //Antes de enviar el formulario
        setLoading(true);

        await fetch(`${server}/lost-password`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(recovery)
        }).then(async (resp)=>{ 
            
            if(resp.status === 400){
                console.log('Status 400: Error al intentar recuperar la contraseña / link no generado');

                // Cuando halla terminado de guardar
                setLoading(false);

                navigate("/lost-password");
            }

            if(resp.status === 200){
                // Se retorna el json con la información
                //let json = await resp.json();
                //console.log(json);

                console.log('Status 200: Envio del link para reset del password');

                // Cuando halla terminado de guardar
                setLoading(false);

                // Hacer la redirección, usando la función navigate
                navigate("/lost-password");
            }

        }).catch(error=>{
            console.error(error);
        })
    
    }


    return (
    
        <Container fluid="md">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Recuperar contraseña</Form.Label>
                    <Form.Control 
                        name="user_email"
                        type="email" 
                        placeholder="Correo electrónico"
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
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

                    <Button variant="primary" type="submit" disabled={ !recovery.user_email }>
                        Enviar Código
                    </Button>

                }

            </Form>
        </Container>

    );
};

export default PasswordRecovery1;
