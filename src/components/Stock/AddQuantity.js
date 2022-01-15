import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import BotonFondoClaro from '../generic/BotonFondoClaro';
import { object, string, number } from 'yup'
import { Link } from 'react-router-dom';

import './StockItem.css';

const AddQuantity = () => {
    return (

        <div div className='canvas_claro' >

            <Formik
                validationSchema={
                    object({
                        name: string().required('Este campo es requerido').min(6, 'Debe tener por lo menos 6 caracteres'),
                        quantity: number().moreThan(0, 'El valor debe ser positivo').required('Este campo es requerido'),
                        channel: string().required('Este campo es requerido')
                    })
                }
                initialValues={{
                    name: '',
                    quantity: null,
                    channel: '',
                }}
                onSubmit={(values) => {
                    console.log("values", values)
                    // falta el reset
                }}
            >
                {formik => (
                    <>
                        <p className="titulo_oscuro">Agregar cantidad al sotock</p>
                        <Link to="/" className='salir' >Salir</Link>
                        <Link to="/stock" className='volver'>Volver</Link>
                        <Container >
                            <Form className='container'>
                                <Row>
                                    <label htmlFor='Channel' className='label'>Nombre del elemento</label>
                                    <Field
                                        className="campo_entrada"
                                        placeholder="escoja el Item --Temporal"
                                        name="name"
                                        as='select' >
                                        <option value=''>Elemento a adicionar</option>
                                        {/*La consulta va en un SueEffect y aca un  map para desplegar los items del stock */}
                                        <option value='temp uno'>Temp uno</option>
                                        <option value='Temp dos'>Temp dos</option>
                                    </Field>
                                    <ErrorMessage component='div' className='error' name='name' />
                                </Row>
                                <Row>
                                    <label htmlFor='Channel' className='label'>Ubicación</label>
                                    <Field
                                        className="campo_entrada"
                                        placeholder="Ubicación (Bodega/Arsenal) --temporal"
                                        name="channel"
                                        as='select' >
                                        <option value=''>Ingrese Ubicación</option>
                                        <option value='Arsenal'>Arsenal</option>
                                        <option value='Bodega'>Bodega</option>
                                    </Field>
                                    <ErrorMessage component='div' className='error' name='channel' />
                                </Row>
                                <Row>
                                    <Field
                                        className="campo_entrada"
                                        placeholder="Cantidad (gr/unidades)"
                                        name="quantity"
                                        type="number"

                                    />
                                    <ErrorMessage component='div' className='error' name='quantity' />
                                </Row>
                                <BotonFondoClaro label='Crear' type="submit" />
                                <pre>{JSON.stringify(formik.values, null, 4)}</pre>
                                <pre>{JSON.stringify(formik.errors, null, 4)}</pre>
                            </Form>
                        </Container>
                    </>
                )}
            </Formik>
        </div >
    )
}

export default AddQuantity
