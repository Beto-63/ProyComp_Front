import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ProductSelectForm = () => {
    const objForm = {
        bebida: '',
        tipo: ''
    }

    const handleForm = (e)=>{

    }
    return (
        <div>
            <Form >
                <Form.Label>Tipo de Producto:</Form.Label>
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="Té"
                            name="bebida"
                            type={type}
                            id={`inline-${type}-1`}
                            value={'Té'}
                        />
                        <Form.Check
                            inline
                            label="Infusión"
                            name="bebida"
                            type={type}
                            id={`inline-${type}-2`}
                            value={'Infusión'}
                        />
                    </div>
                ))}
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="Paquete"
                            name="tipo"
                            type={type}
                            id={`inline-${type}-1`}
                            value={'Paquete'}
                        />
                        <Form.Check
                            inline
                            label="Accesorio"
                            name="tipo"
                            type={type}
                            id={`inline-${type}-2`}
                            value={'Accesorio'}
                        />
                        <Form.Check
                            inline
                            label="Combo"
                            name="tipo"
                            type={type}
                            id={`inline-${type}-3`}
                            value={'Combo'}
                        />
                    </div>
                ))}
                <Button variant='secondary' href='/productChoice'>Escoge el Producto</Button>
            </Form>
        </div>
    );
};

export default ProductSelectForm;
