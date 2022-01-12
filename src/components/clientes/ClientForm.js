import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ClientForm = ({ handleClient }) => {
    const objForm = {
        name: '',
        email: '',
        gender: '',
        age_group: ''
    }
    const [form, setForm] = useState(objForm);

    const handleForm = (e) => {
        let obj = { ...form, [e.target.name]: e.target.value}
        setForm(obj)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClient(form); //estas son las props de Client
        console.log("Enviar Formulario")
        setForm(objForm) //limpia los campos del formulario
        e.target.reset() //limpia la selección de los botones
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="registerName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control value={form.name} onChange={handleForm} name='name' type="name" placeholder="Nombre (opcional)" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={form.email} onChange={handleForm} name='email' type="email" placeholder="Correo Electrónico (opcional)" />
                </Form.Group>

                <Form.Label>Género:</Form.Label>
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            onChange={handleForm}
                            inline
                            label="F"
                            name="gender"
                            type={type}
                            id={`inline-${type}-1`}
                            value={'F'}
                        />
                        <Form.Check
                            onChange={handleForm}
                            inline
                            label="M"
                            name="gender"
                            type={type}
                            id={`inline-${type}-2`}
                            value={'M'}
                        />
                    </div>
                ))}
                <Form.Label>Edad:</Form.Label>
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            onChange={handleForm}
                            inline
                            label="0-11"
                            name="age_group"
                            type={type}
                            id={`inline-${type}-1`}
                            value={'0-11'}
                        />
                        <Form.Check
                            onChange={handleForm}
                            inline
                            label="12-20"
                            name="age_group"
                            type={type}
                            id={`inline-${type}-2`}
                            value={'12-20'}
                        />
                        <Form.Check
                            onChange={handleForm}
                            inline
                            label="21-29"
                            name="age_group"
                            type={type}
                            id={`inline-${type}-2`}
                            value={'21-29'}
                        />
                        <Form.Check
                            onChange={handleForm}
                            inline
                            label="30-40"
                            name="age_group"
                            type={type}
                            id={`inline-${type}-2`}
                            value={'30-40'}
                        />
                        <Form.Check
                            onChange={handleForm}
                            inline
                            label="41-60"
                            name="age_group"
                            type={type}
                            id={`inline-${type}-2`}
                            value={'41-60'}
                        />
                        <Form.Check
                            onChange={handleForm}
                            inline
                            label="61-80"
                            name="age_group"
                            type={type}
                            id={`inline-${type}-2`}
                            value={'61-80'}
                        />
                        <Form.Check
                            onChange={handleForm}
                            inline
                            label="Mayor"
                            name="age_group"
                            type={type}
                            id={`inline-${type}-2`}
                            value={'Mayor'}
                        />
                    </div>
                ))}
                <Button type="submit">Productos</Button>{' '}
                <Button href="/" variant="primary">Salir</Button>
            </Form>

        </div>
    )
}

export default ClientForm