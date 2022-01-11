import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ClientForm = () => {

    const objForm = {
        email: '',
        name: '',
        gender: '',
        age_group: ''
    }
    const [form, setForm] = useState(objForm);

    const handleForm = (e) => {
        let obj = { ...form, [e.target.email]: e.target.value, [e.target.name]: e.target.value, [e.target.gender]: e.target.value, [e.target.age_group]: e.target.value };
        setForm(obj)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviar Formulario")
        setForm(objForm) //limpia los campos del formulario
        e.target.reset() //limpia la selección de los botones
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Cliente:</Form.Label>
                <Form.Control
                    value={form.email}
                    onChange={handleForm}
                    name="email"
                    id="email"
                    type="text"
                    placeholder="Correo Electrónico (opcional)"
                />
                <Form.Label>Género:</Form.Label>
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="F"
                            name="gender"
                            type={type}
                            id={`inline-${type}-1`}
                        />
                        <Form.Check
                            inline
                            label="M"
                            name="gender"
                            type={type}
                            id={`inline-${type}-2`}
                        />
                    </div>
                ))}
                <Form.Label>Edad:</Form.Label>
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="0-11"
                            name="age_group"
                            type={type}
                            id={`inline-${type}-1`}
                        />
                        <Form.Check
                            inline
                            label="12-20"
                            name="age_group"
                            type={type}
                            id={`inline-${type}-2`}
                        />
                        <Form.Check
                            inline
                            label="21-29"
                            name="age_group"
                            type={type}
                            id={`inline-${type}-2`}
                        />
                        <Form.Check
                            inline
                            label="30-40"
                            name="age_group"
                            type={type}
                            id={`inline-${type}-2`}
                        />
                        <Form.Check
                            inline
                            label="41-60"
                            name="age_group"
                            type={type}
                            id={`inline-${type}-2`}
                        />
                        <Form.Check
                            inline
                            label="61-80"
                            name="age_group"
                            type={type}
                            id={`inline-${type}-2`}
                        />
                        <Form.Check
                            inline
                            label="Mayor"
                            name="age_group"
                            type={type}
                            id={`inline-${type}-2`}
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