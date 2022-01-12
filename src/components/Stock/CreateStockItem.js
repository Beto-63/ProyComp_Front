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

/**
 * 
 * import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';

export const Signup = () => {
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  })
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validate}
      onSubmit={values => {
        console.log(values)
      }}
    >
      {formik => (
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
          <Form>
            <TextField label="First Name" name="firstName" type="text" />
            <TextField label="last Name" name="lastName" type="text" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="password" name="password" type="password" />
            <TextField label="Confirm Password" name="confirmPassword" type="password" />
            <button className="btn btn-dark mt-3" type="submit">Register</button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
          </Form>
        </div>
      )}
    </Formik>
  )
}
© 2022 GitHub, Inc.
 */