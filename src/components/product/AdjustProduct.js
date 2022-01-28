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
import '../generic/Light-bkg.css';


const schema = yup.object({
  old_cat_name: yup.string().trim().required("Se requiere para agilizar la seleccion"),
  old_name: yup.string().trim().required("Con el nombre se despliega la Inofrmacion almacenada "),
  product_id: yup.string(),
  name: yup.string(),
  description: yup.string().max(128),
  price: yup.number(),
  cat_name: yup.string(),
  temperature: yup.string(),
  img_url: yup.string(),
  stock_name: yup.string(),
  stock_qty: yup.number(),
})


const AdjustProduct = () => {

  const [categories, setCategories] = useState([{}]);
  //const [response, setResponse] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([{}]);
  const [prevData, setPrevData] = useState({
    "product_id": undefined,
    "name": undefined,
    "description": undefined,
    "price": undefined,
    "cat_name": undefined,
    "temperature": undefined,
    "img_url": undefined,
    "stock_name": undefined,
    "stock_qty": undefined,
  });

  useEffect(() => {
    fetch(`${server}/product/categories`)
      .then(response => response.json())
      .then(json => setCategories(json))
      .then(console.log("categorias", categories));
  }, [])

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

  const handleCatChange = () => {
    let obj = { cat_name: document.getElementById('old_cat_name').value };
    console.log("obj cat", obj)
    fetch(`${server}/product/findByCatName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(json => setSelectedProducts(json));
    console.log("products", selectedProducts);
  }

  const handleEdit = () => {
    let obj = { name: document.getElementById('old_name').value };
    console.log("old Name", obj)
    fetch(`${server}/product/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(json => setPrevData(json));
    console.log("prev data", prevData)
  }

  useEffect(() => {

  }, [prevData]);



  return (
    <div className='canvas_claro'>
      <p className="titulo_oscuro">Ajuste Datos de Producto</p>
      <Link to="/" className='inicio'>Inicio</Link>
      <Link to="/product" className='volver'>Volver</Link>
      <Container >
        <form className='container' onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <select {...register("old_cat_name")} onChange={handleCatChange}
              className="campo_entrada"
              placeholder="Categoría de Producto"
              id='old_cat_name'
            >
              <option value=''>Seleccione la categoría del producto</option>
              {categories.map((e, index) => {
                return (
                  <option key={index} value={e.name} >{e.name}</option>
                )
              })}
            </select>
            <p className='error'>{errors.old_cat_name?.message}</p>
          </Row>
          <Row>
            <label htmlFor='old_name' className='label'>Elemento que deseas corregir</label>
            <select {...register("old_name")} onChange={handleEdit}
              className="campo_entrada"
              placeholder="Nombre a descontar"
              id='old_name'
            >
              <option value=''>Selecciona X nombre</option>

              {selectedProducts.map((e, index) => {
                return (
                  <option key={index} value={e.name} >{e.name}</option>
                )
              })}
            </select>
            <p className='error'>{errors.old_name?.message}</p>
          </Row>

          <h6>Datos para corrección</h6>
          <Row>
            <input  {...register("name")}
              className="campo_entrada"
              placeholder={prevData.name}
              name="name"
              type="text"
            />
            <p className='error'>{errors.cat_name?.message}</p>
          </Row>
          <Row>
            <input  {...register("product_id")}
              className="campo_entrada"
              placeholder={prevData.product_id}
            />
            <p className='error'>{errors.product_id?.message}</p>
          </Row>
          <Row>
            <textarea  {...register("description")}
              className="campo_entrada"
              placeholder={prevData.description}
            />
            <p className='error'>{errors.cat_description?.message}</p>
          </Row>
          <Row>
            <input  {...register("price")}
              className="campo_entrada"
              placeholder={prevData.price}
            />
            <p className='error'>{errors.cat_price?.message}</p>
          </Row>
          <Row>
            <label htmlFor='cat_name' className='label'>Categoría</label>
            <input  {...register("cat_name")}
              className="campo_entrada"
              placeholder={prevData.cat_name}
            />
            <p className='error'>{errors.cat_name?.message}</p>
          </Row>
          <Row>
            <label htmlFor='temperature' className='label'>Temperatura</label>
            <select  {...register("temperature")}
              className="campo_entrada"
              placeholder={prevData.temperature}
            >
              <option value='caliente'>Caliente</option>
              <option value='frio'>Frio</option>
            </select>
            <p className='error'>{errors.temperature?.message}</p>
          </Row>
          <Row>
            <input {...register("img_url")}
              className="campo_entrada"
              placeholder={prevData.img_url}
            />
            <p className='error'>{errors.img_url?.message}</p>
          </Row>
          <Row>
            <label htmlFor='stock_name' className='label'>Elemento de descontar de Inventario</label>
            <select  {...register("stock_name")}
              className="campo_entrada"
              placeholder={prevData.stock_name}
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
              placeholder={prevData.stock_qty}
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

