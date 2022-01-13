import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import BotonFondoClaro from '../generic/BotonFondoClaro';
import { object, string, number } from 'yup'

import './CreateStockItem.css';
//import GeneralNav from '../generic/GeneralNav';

const CreateStockItem = () => {
  return (
    <div className='canvas_claro'>

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
          status: 1
        }} onSubmit={(values) => {
          console.log("values", values)
        }}
      >
        {formik => (
          <>
            <p className="titulo_oscuro">Crear elemento</p>
            <Container >
              <Form className='container'>
                <Row>
                  <Field className="campo_entrada" placeholder="Nombre" name="name" type="text" />
                  <p className='error'>{formik.errors.name}</p>
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
                <Row>
                  <Field
                    className="campo_entrada"
                    placeholder="Ubicacion (Bodega/Arsenal) --temporal"
                    name="channel"
                    as='select' >
                    <option value=''>Ingrese Ubicacion</option>
                    <option value='Arsenal'>Arsenal</option>
                    <option value='Bodega'>Bodega</option>
                  </Field>
                  <p className='error'>{formik.errors.channel}</p>
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

export default CreateStockItem

