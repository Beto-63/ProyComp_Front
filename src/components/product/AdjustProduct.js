/**********************Importacion de Librerias****************************/

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**********************Importacion de Componentes**************************/
import BotonFondoClaro from '../generic/BotonFondoClaro';

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css';


const schema = yup.object({
  product_id: yup.string('Solo se aceptan caracteres').required('Este campo es requerido').trim('No dejar espacios antes o al final'),
  name: yup.string('Solo se aceptan caracteres').required('Este campo es requerido').min(6),
  description: yup.string('Solo se aceptan caracteres').max(128),
  price: yup.number('Solo se aceptan números').required('Este campo es requerido'),
  cat_name: yup.string('Solo se aceptan caracteres').required('Este campo es requerido'),
  temperature: yup.string('Solo se aceptan caracteres'),
  img_url: yup.string('Solo se aceptan caracteres'),
  stock_name: yup.string('Solo se aceptan caracteres').required('Este campo es requerido'),
  stock_qty: yup.number('Solo se aceptan números').required('Este campo es requerido'),
})


const AdjustProduct = () => {
  useEffect(() => {
    console.log("activo useEffect");
    // Reemplazar el console por la consulta a la base de datos para llenar el select
  }, [])

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data) => {
    console.log("data", data);      //aqui va la creacion del item con un fetch al back
    reset();
  };

  return (
    <div className='canvas_claro'>
      <p className="titulo_oscuro">Ajuste Datos de Producto</p>
      <Link to="/" className='salir'>Salir</Link>
      <Link to="/product" className='volver'>Volver</Link>
      <Container >
        <form className='container' onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <label htmlFor='name' className='label'>Producto a corregir</label>
            <select
              className="campo_entrada"
              placeholder="Nombre del Producto"
              name="name"
            >
              <option defaultValue=''>Selecciona X nombre</option>
              {/* Aqui deberi ir una busqueda a la base de datos de productos incluso de elemento 
                    de informacion del producto y asi hacer una pantalla mas eficiente refactor de la venta 
                     */}
              <option defaultValue='temp 1'>Temp 1</option>
              <option defaultValue='temp 2'>Temp 2</option>
            </select>
          </Row>
          <button className='btn-light-bkg-mid-page'>Buscar </button>
          <h6>Datos para corrección</h6>
          <Row>
            <input  {...register("name")}
              className="campo_entrada"
              placeholder="Nombre del Producto"
              name="name"
              type="text"
            />
            <p className='error'>{errors.cat_name?.message}</p>
          </Row>
          <Row>
            <input  {...register("product_id")}
              className="campo_entrada"
              placeholder="Codigo interno del Producto"
            />
            <p className='error'>{errors.product_id?.message}</p>
          </Row>
          <Row>
            <textarea  {...register("description")}
              className="campo_entrada"
              placeholder="Descripción"
            />
            <p className='error'>{errors.cat_description?.message}</p>
          </Row>
          <Row>
            <input  {...register("price")}
              className="campo_entrada"
              placeholder="Precio"
            />
            <p className='error'>{errors.cat_price?.message}</p>
          </Row>
          <Row>
            <label htmlFor='cat_name' className='label'>Categoría</label>
            <select  {...register("cat_name")}
              className="campo_entrada"
              placeholder="Categoría de Producto --temporal"
            >
              <option value=''>Seleccion de Categoría</option>
              <option value='té'>Té</option>
              <option value='infusión'>Infusión</option>
              <option value='paquete'>Paquete</option>
              <option value='accesorios'>Accesirios</option>
              <option value='combo'>Combo</option>
              <option value='evento'>Evento</option>
            </select>
            <p className='error'>{errors.cat_name?.message}</p>
          </Row>
          <Row>
            <label htmlFor='temperature' className='label'>Temperatura</label>
            <select  {...register("temperature")}
              className="campo_entrada"
              placeholder="Temperatura - Se requiere en Té e Infusión"
            >
              <option value=''>Selecciona la Temperatura</option>
              <option value='caliente'>Caliente</option>
              <option value='frio'>Frio</option>
            </select>
            <p className='error'>{errors.temperature?.message}</p>
          </Row>
          <Row>
            <input {...register("img_url")}
              className="campo_entrada"
              placeholder="URL de foto - Opcional"
            />
            <p className='error'>{errors.img_url?.message}</p>
          </Row>
          <Row>
            <label htmlFor='stock_name' className='label'>Elemento de descontar de Inventario</label>
            <select  {...register("stock_name")}
              className="campo_entrada"
              placeholder="Nombre a descontar"
            >
              <option value=''>Selecciona X nombre</option>
              <option value='temp 1'>Temp 1</option>
              <option value='temp 2'>Temp 2</option>
            </select>
            <p className='error'>{errors.stock_name?.message}</p>
          </Row>
          <Row>
            <input  {...register("stock_qty")}
              className="campo_entrada"
              placeholder="Cantidad a descontar (gr - unidades)"
            />
            <p className='error'>{errors.stock_qty?.message}</p>
          </Row>
          <button className='btn-light-bkg' type="submit">Actualizar</button>
        </form>
      </Container>
    </div >
  );
};

export default AdjustProduct;

