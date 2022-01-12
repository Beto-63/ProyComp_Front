import React from 'react';
import { Formik, Form, Field, useField, ErrorMessage } from 'formik';
import BotonFondoClaro from '../generic/BotonFondoClaro';
import { object, string, number } from 'yup'

import './CreateStockItem.css'



const CreateStockItem = () => {


  return (
    <div className='canvas_claro'>
      <h1 className="my-4 font-weight-bold-display-4 ">Crear elemento</h1>
      <Formik
        validationSchema={
          object({
            name: string().required().min(6),
            quantity: number().required(),
            channel: string().required()
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


          <Form>
            <Field className="campo_entrada" placeholder="Nombre" name="name" type="text" />
            <p className='error'>{formik.errors.name}</p>
            <Field className="campo_entrada" placeholder="Cantidad (gr/unidades)" name="quantity" type="number" />
            <Field className="campo_entrada" placeholder="Ubicacion (Bodega/Arsenal) --temporal" name="channel" as='select' >
              <option>Ingrese Ubicacion</option>
              <option value='Arsenal'>Arsenal</option>
              <option value='Bodega'>Bodega</option>
            </Field>
            <BotonFondoClaro label='Crear2' type="submit" />
            <pre>{JSON.stringify(formik.values, null, 4)}</pre>
            <pre>{JSON.stringify(formik.errors, null, 4)}</pre>
          </Form>

        )}
      </Formik>

    </div >
  )
}


export default CreateStockItem

