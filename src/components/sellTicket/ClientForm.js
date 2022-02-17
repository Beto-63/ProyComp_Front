import React, { useContext, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';
import { server } from '../../context/Api'
/**********************Importacion de Estilos******************************/
import '../generic/Nav.css'



const ClientForm = () => {
    const objForm = {
        name: '',
        email: '',
        gender: '',
        age_group: ''
    }

    const { setClientId } = useContext(SellTicketContext)
    const navigate = useNavigate();


    const [form, setForm] = useState(objForm);

    const handleForm = (e) => {
        let obj = { ...form, [e.target.name]: e.target.value }
        setForm(obj)
    }

    const handleClient = (objClient) => {
        console.log(objClient)
        fetch(`${server}/client`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            //enviamos los datos por body y se debe convertir el objeto en JSON
            body: JSON.stringify(objClient)
        })
            .then(response => response.json())
            .then(json => setClientId(json))


    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClient(form); //estas son las props de Client
        setForm(objForm) //limpia los campos del formulario
        e.target.reset() //limpia la selección de los botones
        //TODO condicionar el navigate al response.status 201
        navigate('/sell/catTempSelection')
    }


    return (
        <div className='canvas_oscuro'>
            <h4 className="titulo_claro">¡Bien hecho!</h4>
            <h4 className="titulo_claro">¿Quien es tu cliente?</h4>
            <Link to="/" className='inicio' >Inicio</Link>
            <Link to="/menu" className='volver'>Volver</Link>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="registerName">
                        <Form.Control value={form.name} onChange={handleForm} name='name' type="name" placeholder="Nombre (opcional)" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registerEmail">
                        <Form.Control value={form.email} onChange={handleForm} name='email' type="email" placeholder="Correo Electrónico (opcional)" />
                    </Form.Group>

                    <Form.Label>Género:</Form.Label>

                    <div className="mb-3">
                        <Form.Check
                            onClick={handleForm}
                            inline
                            label="F"
                            name="gender"
                            type='radio'
                            id={`inline-radio-1`}
                            value={"F"}
                        />
                        <Form.Check
                            onClick={handleForm}
                            inline
                            label="M"
                            name="gender"
                            type='radio'
                            id={`inline-radio-2`}
                            value={"M"}
                        />
                    </div>
                    <Form.Label>Edad:</Form.Label>
                    <div className="mb-3">
                        <Form.Check
                            onClick={handleForm}
                            inline
                            label="0-11"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-1`}
                            value={'0-11'}
                        />
                        <Form.Check
                            onClick={handleForm}
                            inline
                            label="12-19"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-2`}
                            value={'12-19'}
                        />
                        <Form.Check
                            onClick={handleForm}
                            inline
                            label="20-29"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-2`}
                            value={'20-29'}
                        />
                        <Form.Check
                            onClick={handleForm}
                            inline
                            label="30-40"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-2`}
                            value={'30-40'}
                        />
                        <Form.Check
                            onClick={handleForm}
                            inline
                            label="41-60"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-2`}
                            value={'41-60'}
                        />
                        <Form.Check
                            onClick={handleForm}
                            inline
                            label="61-80"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-2`}
                            value={'61-80'}
                        />
                        <Form.Check
                            onClick={handleForm}
                            inline
                            label="Mayor"
                            name="age_group"
                            type='radio'
                            id={`inline-radio-2`}
                            value={'81-100'}
                        />
                    </div>

                    <button type="submit" className='btn-dark-bkg-small'>Continuar</button>
                </Form>
            </Container>

        </div>
    )
}

export default ClientForm