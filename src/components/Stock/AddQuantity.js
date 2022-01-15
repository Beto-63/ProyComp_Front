import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
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
                        name: string('Solo se aceptan caracteres').required('Este campo es requerido').min(6),
                        quantity: number('Solo se aceptan números').required('Este campo es requerido'),
                        channel: string('Solo se aceptan caracteres').required('Este campo es requerido')
                    })
                }
                initialValues={{
                    name: '',
                    quantity: null,
                    channel: '',
                }}
                onSubmit={(values) => {
                    console.log("values", values)
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
                                        {/*Aqui va una consulta y un map desplegar los items del stock */}
                                        <option value='temp uno'>Temp uno</option>
                                        <option value='Temp dos'>Temp dos</option>
                                    </Field>
                                    <p className='error'>{formik.errors.name}</p>
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
                                    <p className='error'>{formik.errors.channel}</p>
                                </Row>
                                <Row>
                                    <Field
                                        className="campo_entrada"
                                        placeholder="Cantidad (gr/unidades)"
                                        name="quantity"
                                        type="number"

                                    />
                                    <p className='error'>{formik.errors.quantity}</p>
                                </Row>
                                <BotonFondoClaro label='Crear2' type="submit" />
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
