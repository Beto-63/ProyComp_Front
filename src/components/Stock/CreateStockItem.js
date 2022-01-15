import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import BotonFondoClaro from '../generic/BotonFondoClaro';
import { object, string, number } from 'yup'

import './StockItem.css';
import { Link } from 'react-router-dom';

const CreateStockItem = () => {
  return (
    <div className='canvas_claro'>

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
          status: 1
        }}
        onSubmit={(values, { resetForm }) => {
          console.log("values", values);
          resetForm({ values })
          //El reset No funciona
        }}
      >
        {formik => (
          <>
            <p className="titulo_oscuro">Crear elemento</p>
            <Link to="/" className='salir'>Salir</Link>
            <Link to="/stock" className='volver'>Volver</Link>
            <Container >
              <Form className='container'>
                <Row>
                  <Field
                    className="campo_entrada"
                    placeholder="Nombre"
                    name="name"
                    type="text" />
                  <ErrorMessage component='div' className='error' name='name' />
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
                <Row>
                  <label htmlFor='Channel' className='label'>Ubicación</label>
                  <Field
                    className="campo_entrada"

                    placeholder="Ubicación (Bodega/Arsenal) --temporal"
                    name="channel"
                    as='select' >
                    <option value=''>Ingrese Ubicacion</option>
                    <option value='Arsenal'>Arsenal</option>
                    <option value='Bodega'>Bodega</option>
                  </Field>
                  <ErrorMessage component='div' className='error' name='channel' />
                </Row>
                <BotonFondoClaro label='Crear' type="submit" />
                {/* <pre>{JSON.stringify(formik.values, null, 4)}</pre>
                <pre>{JSON.stringify(formik.errors, null, 4)}</pre> */}
              </Form>
            </Container>
          </>
        )}
      </Formik>
    </div >
  )
}

export default CreateStockItem

