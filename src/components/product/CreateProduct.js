import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import BotonFondoClaro from '../generic/BotonFondoClaro';
import { object, string, number } from 'yup'

import '../Stock/StockItem.css';
import { Link } from 'react-router-dom';

const CreateProduct = () => {
  return (
    <div className='canvas_claro'>
      <Formik
        validationSchema={
          object({
            product_id: string('Solo se aceptan caracteres').required('Este campo es requerido').trim('No dejar espacios antes o al final'),
            name: string('Solo se aceptan caracteres').required('Este campo es requerido').min(6),
            description: string('Solo se aceptan caracteres').max(128),
            price: number('Solo se aceptan números').required('Este campo es requerido'),
            cat_name: string('Solo se aceptan caracteres').required('Este campo es requerido'),
            temperature: string('Solo se aceptan caracteres'),
            img_url: string('Solo se aceptan caracteres'),
            stock_name: string('Solo se aceptan caracteres').required('Este campo es requerido'),
            stock_qty: number('Solo se aceptan números').required('Este campo es requerido'),
          })
        }
        initialValues={{
          product_id: '',
          name: '',
          description: '',
          price: null,
          cat_name: '',
          temperature: '',
          img_url: '',
          stock_name: '',
          stock_qty: null,
          status: 1
        }}
        onSubmit={(values) => {
          console.log("values", values) //aqui va el fetch de creacion
        }}
      >
        {formik => (
          <>
            <p className="titulo_oscuro">Crear producto</p>
            <Link to="/" className='salir'>Salir</Link>
            <Link to="/stock" className='volver'>Volver</Link>
            <Container >
              <Form className='container'>
                <Row>
                  <Field
                    className="campo_entrada"
                    placeholder="Codigo interno del Producto"
                    name="product_id"
                    type="text"
                  />
                  <p className='error'>{formik.errors.product_id}</p>
                </Row>
                <Row>
                  <Field
                    className="campo_entrada"
                    placeholder="Nombre del Producto"
                    name="name"
                    type="text"
                  />
                  <p className='error'>{formik.errors.name}</p>
                </Row>
                <Row>
                  <Field
                    className="campo_entrada"
                    placeholder="Descripción"
                    name="description"
                    as='textarea' >
                  </Field>
                  <p className='error'>{formik.errors.description}</p>
                </Row>
                <Row>
                  <Field
                    className="campo_entrada"
                    placeholder="Precio"
                    name="price"
                    type="number"
                  />
                  <p className='error'>{formik.errors.price}</p>
                </Row>
                <Row>
                  <label htmlFor='cat_name' className='label'>Categoría</label>
                  <Field
                    className="campo_entrada"
                    placeholder="Categoría de Producto --temporal"
                    name="cat_name"
                    as='select' >
                    <option value=''>Seleccion de Categoría</option>
                    <option value='té'>Té</option>
                    <option value='infusión'>Infusión</option>
                    <option value='paquete'>Paquete</option>
                    <option value='accesorios'>Accesirios</option>
                    <option value='combo'>Combo</option>
                    <option value='evento'>Evento</option>
                  </Field>
                  <p className='error'>{formik.errors.cat_name}</p>
                </Row>
                <Row>
                  <label htmlFor='temperature' className='label'>Temperatura</label>
                  <Field
                    className="campo_entrada"
                    placeholder="Temperatura - Se requiere en Té e Infusión"
                    name="temperature"
                    as='select' >
                    <option value=''>Selecciona la Temperatura</option>
                    <option value='caliente'>Caliente</option>
                    <option value='frio'>Frio</option>
                  </Field>
                  <p className='error'>{formik.errors.temperature}</p>
                </Row>
                <Row>
                  <Field
                    className="campo_entrada"
                    placeholder="URL de foto - Opcional"
                    name="img?url"
                    type="text"
                  />
                  <p className='error'>{formik.errors.img_url}</p>
                </Row>
                <Row>
                  <label htmlFor='stock_name' className='label'>Elemento de descontar de Inventario</label>
                  <Field
                    className="campo_entrada"
                    placeholder="Nombre a descontar"
                    name="stock_name"
                    as='select' >
                    <option value=''>Selecciona X nombre</option>
                    <option value='temp 1'>Temp 1</option>
                    <option value='temp 2'>Temp 2</option>
                  </Field>
                  <p className='error'>{formik.errors.stock_name}</p>
                </Row>
                <Row>
                  <Field
                    className="campo_entrada"
                    placeholder="Cantidad a descontar (gr - unidades)"
                    name="stock_qty"
                    type="number"
                  />
                  <p className='error'>{formik.errors.stock_qty}</p>
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

export default CreateProduct

