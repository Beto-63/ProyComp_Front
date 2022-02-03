import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductSelectForm = ({handleProduct}) => {
    const objForm = {
        cat_name: ''
    }
    
    const navigate = useNavigate()

    const [form, setForm] = useState(objForm)

    const handleForm = (e)=>{
        let obj = { ...form, [e.target.name]: e.target.value}
        setForm(obj)
    }


    const handleSubmit = (e)=>{
        e.preventDefault();
        handleProduct(form)
        setForm(objForm)
        navigate('/sell/productChoice');
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Tipo de Producto:</Form.Label>
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            onClick={handleForm}
                            inline
                            label="Té"
                            name="cat_name"
                            type={type}
                            id={`inline-${type}-1`}
                            value={'Té'}
                        />
                        <Form.Check
                            onClick={handleForm}
                            inline
                            label="Infusión"
                            name="cat_name"
                            type={type}
                            id={`inline-${type}-2`}
                            value={'Infusión'}
                        />
                        <Form.Check
                            onClick={handleForm}
                            inline
                            label="Paquete"
                            name="cat_name"
                            type={type}
                            id={`inline-${type}-1`}
                            value={'Paquete'}
                        />
                        <Form.Check
                            onClick={handleForm}
                            inline
                            label="Accesorio"
                            name="cat_name"
                            type={type}
                            id={`inline-${type}-2`}
                            value={'Accesorio'}
                        />
                        <Form.Check
                            onClick={handleForm}
                            inline
                            label="Combo"
                            name="cat_name"
                            type={type}
                            id={`inline-${type}-3`}
                            value={'Combo'}
                        />
                    </div>
                ))}
                <Button variant='secondary' type="submit">Escoge el Producto</Button>
            </Form>
        </div>
    );
};

export default ProductSelectForm;
