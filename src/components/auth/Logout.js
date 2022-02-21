import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
//import { Row, Container, Form, Button } from 'react-bootstrap';

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api';
import AuthContext from "../../context/AuthContext";

function Logout() {

    const { setAuth } = useContext(AuthContext);

    // Estado para "loading" cuando la página esté lenta
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Manejar el evento submit
    /*const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir refresco de página del evento submit
        console.log('cerraste sesion')
        localStorage.removeItem("token");
        setAuth(false);
        navigate("/");
        //window.location = '/';
    };*/

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir refresco de página del evento submit

        //Antes de enviar el formulario
        setLoading(true);

        await fetch(`${server}/logout`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify()
        })
        
        .then(async (resp)=>{ 
            
            if(resp.status === 403){
                console.log('No token provided');
                localStorage.removeItem("token");
                setAuth(false);

                // Cuando halla terminado de guardar
                setLoading(false);

                navigate("/");
            }

            if(resp.status === 401){
                console.log('Error al hacer logout / token invalido');
                localStorage.removeItem("token");
                setAuth(false);

                // Cuando halla terminado de guardar
                setLoading(false);

                navigate("/");
            }

            if(resp.status === 200){
                // Se retorna el json con la información
                let json = await resp.json();
                
                console.log('Ha salido correctamente del sistema');
                console.log(json);
                localStorage.removeItem("token");
                setAuth(false);

                // Cuando halla terminado de guardar
                setLoading(false);

                navigate("/");
            }

        }).catch(error=>{
            console.error(error);
        })

    }

    return (
        /* <Container fluid="md">
            <Form onSubmit={handleSubmit}>

                Confirmación de cierre de sesión

                <Button variant="primary" type="submit">
                    Cerrar Sesión
                </Button>
            </Form>
        </Container> */

        <div className='canvas_claro' >
            <p className="titulo_oscuro">Terminar el uso de la Aplicacion</p>

            {/* Se insertan los links de navegacion general */}
            <Link to="/" className='inicio'>Inicio</Link>
            <Link to="/" className='volver'>Volver</Link>
            <form className='container' onSubmit={handleSubmit}>
                <h6 className='openclose'>Si sales, tendras que autenticarte de nuevo para usar la aplicación...</h6>
                <br /><br /><br />

            { loading ?

                <button className='btn-light-bkg' type="submit">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>

                    <span style={{ margin: '0', paddingLeft: '5px' }}>
                        Salir
                    </span>

                </button>

            :

                <button className='btn-light-bkg' type="submit">Salir</button>

            }

            </form>
        </div>


    )
}

export default Logout