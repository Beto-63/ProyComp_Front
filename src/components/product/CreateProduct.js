/**********************Importacion de Librerias****************************/

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'


const schema = yup.object({
  product_id: yup.string('Solo se aceptan caracteres').required('Este campo es necesrio para sincronizar con Wix').trim('No dejar espacios antes o al final'),
  name: yup.string().trim().required('Ingresa el nombre comercial del producto'),
  description: yup.string().max(128),
  price: yup.number().typeError('Ingresa el precio de venta').moreThan(0, 'El valor debe ser positivo').required(),
  cat_name: yup.string().trim().required('La categoria sirve para hacer mas cortas las selecciones'),
  temperature: yup.string(),
  img_url: yup.string('Solo se aceptan caracteres'),
  stock_name: yup.string(),
  stock_qty: yup.number().typeError('Dejar en 0 | Cambiar para deecontar del inventario')
})

const CreateProduct = () => {

  const [categories, setCategories] = useState([{}]);

  const [selectedItems, setSelectedItems] = useState([{}]);

  useEffect(() => {
    fetch(`${server}/product/categories`)
      .then(response => response.json())
      .then(json => setCategories(json));
  }, [])

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data) => {
    fetch(`${server}/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => window.alert(JSON.stringify(json)))
    reset();
  };

  const handleCatChange = () => {
    let obj = { cat_name: document.getElementById('cat_name').value };
    fetch(`${server}/stock/findByCatName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(json => setSelectedItems(json));


  }

  return (
    <div className='canvas_claro'>
      <p className="titulo_oscuro">Crear producto</p>
      <Link to="/" className='inicio'>Inicio</Link>
      <Link to="/product" className='volver'>Volver</Link>
      <Container >
        <form className='container' onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <input {...register("product_id")}
              className="campo_entrada"
              placeholder="Codigo interno del Producto"

            />
            <p className='error'>{errors.product_id?.message}</p>
          </Row>
          <Row>
            <input {...register("name")}
              className="campo_entrada"
              placeholder="Nombre del Producto"

            />
            <p className='error'>{errors.name?.message}</p>
          </Row>
          <Row>
            <textarea {...register("description")}
              className="campo_entrada"
              placeholder="Descripción"
            >
            </textarea>
            <p className='error'>{errors.description?.message}</p>
          </Row>
          <Row>
            <input {...register("price")}
              className="campo_entrada"
              placeholder="Precio"

            />
            <p className='error'>{errors.price?.message}</p>
          </Row>
          <Row>

            <select {...register("cat_name")} onChange={handleCatChange}
              className="campo_entrada"
              placeholder="Categoría de Producto"
              id='cat_name'

            >
              <option value=''>Seleccione la categoría del producto</option>
              {categories.map((e, index) => {
                return (
                  <option key={index} value={e.name} >{e.name}</option>
                )
              })}
            </select>
            <p className='error'>{errors.cat_name?.message}</p>
          </Row>
          <Row>

            <select {...register("temperature")}
              className="campo_entrada"
              placeholder="Temperatura - Se requiere en Té e Infusión"

            >
              <option value=''>Selecciona la Temperatura</option>
              <option value='C'>Caliente</option>
              <option value='Frio'>Frio</option>
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
            <label htmlFor='stock_name' className='label'>Elemento a descontar del inventario</label>
            <select {...register("stock_name")}
              className="campo_entrada"
              placeholder="Nombre a descontar"

            >
              <option value=''>Selecciona X nombre</option>

              {selectedItems.map((e, index) => {
                return (
                  <option key={index} value={e.name} >{e.name}</option>
                )
              })}
            </select>
            <p className='error'>{errors.stock_name?.message}</p>
          </Row>
          <Row>
            <label htmlFor='stock_qty' className='label'>Cantidad a descontar del inventario (si aplica)</label>
            <input {...register("stock_qty")}
              className="campo_entrada"
              placeholder="Cantidad a descontar (gr - unidades)"
              defaultValue={0}
            />
            <p className='error'>{errors.stock_qty?.message}</p>
          </Row>
          <button className='btn-light-bkg' type="submit" >Crear</button>
          <br /><br />
        </form>
      </Container>
    </div >
  );
};

export default CreateProduct;