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
  cat_name: yup.string().trim().required("Se requiere para agilizar la seleccion"),
  cat_nameEdit: yup.string(),
  name: yup.string().trim().required("Con el nombre se despliega la Inofrmacion almacenada "),
  nameEdit: yup.string(),
  product_id: yup.string(),
  product_idEdit: yup.string(),
  description: yup.string().max(128),
  descriptionEdit: yup.string().max(128),
  price: yup.number(),
  priceEdit: yup.number(),
  temperature: yup.string(),
  temperatureEdit: yup.string(),
  img_url: yup.string(),
  img_urlEdit: yup.string(),
  stock_name: yup.string(),
  stock_nameEdit: yup.string(),
  stock_qty: yup.number().typeError('Dejar en Ingresa el precio de venta'),
  stock_qtyEdit: yup.number().typeError('Dejar en Ingresa el precio de venta'),
  statusEdit: yup.number().typeError('Se requiere definir el Estado').required()
})


const AdjustProduct = () => {

  const objProduct = {
    product_id: '',
    name: '',
    description: '',
    price: null,
    cat_name: '',
    temperature: '',
    img_url: '',
    stock_name: '',
    stock_qty: 0,
    status: null
  }

  const [categories, setCategories] = useState([{}]);
  const [selectedNames, setSelectedNames] = useState([{}]);
  const [toEdit, setToEdit] = useState(objProduct);
  const [selectedNamesEdit, setSelectedNamesEdit] = useState([{}]);


  useEffect(() => {
    fetch(`${server}/product/categories`)
      .then(response => response.json())
      .then(json => setCategories(json));
  }, [])

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data) => {

    let newObj = { id: toEdit._id, status: data.statusEdit }
    if (data.product_idEdit !== '') {
      newObj = { ...newObj, product_id: data.product_idEdit }
    } else {
      newObj = { ...newObj, product_id: toEdit.product_id }
    }
    if (data.nameEdit !== '') {
      newObj = { ...newObj, name: data.nameEdit }
    } else {
      newObj = { ...newObj, name: toEdit.name }
    }
    if (data.descriptionEdit !== '') {
      newObj = { ...newObj, description: data.descriptionEdit }
    } else {
      newObj = { ...newObj, description: toEdit.description }
    }
    if (data.priceEdit !== '') {
      newObj = { ...newObj, price: data.priceEdit }
    } else {
      newObj = { ...newObj, price: toEdit.price }
    }
    if (data.cat_nameEdit !== '') {
      newObj = { ...newObj, cat_name: data.cat_nameEdit }
    } else {
      newObj = { ...newObj, cat_name: toEdit.cat_name }
    }
    if (data.temperatureEdit !== '') {
      newObj = { ...newObj, temperature: data.temperatureEdit.trim() }
    } else {
      newObj = { ...newObj, temperature: toEdit.temperature.trim() }
    }
    if (data.img_urlEdit !== '') {
      newObj = { ...newObj, img_url: data.img_urlEdit.trim() }
    } else {
      newObj = { ...newObj, img_url: toEdit.img_url.trim() }
    }
    if (data.stock_nameEdit !== '') {
      newObj = { ...newObj, stock_name: data.stock_nameEdit.trim() }
    } else {
      newObj = { ...newObj, stock_name: toEdit.stock_name.trim() }
    }
    if (data.stock_qtyEdit !== '') {
      newObj = { ...newObj, stock_qty: data.stock_qtyEdit }
    } else {
      newObj = { ...newObj, stock_qty: toEdit.stock_qty }
    }
    if (data.statusEdit !== '') {
      newObj = { ...newObj, status: data.statusEdit }
    } else {
      newObj = { ...newObj, status: toEdit.status }
    }

    fetch(`${server}/product`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      //enviamos los datos por body y se debe convertir el objeto en JSON
      body: JSON.stringify(newObj)
    })
      .then(response => response.json())
      .then(json => window.alert(JSON.stringify(json)))
    reset();
    setToEdit(objProduct);
  };

  const handleCatChange = () => {
    let obj = {
      cat_name: document.getElementById('cat_name').value,
    };

    fetch(`${server}/product/findByCatName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(json => setSelectedNames(json));
  }

  const handleCatEdit = () => {
    let obj = {
      cat_name: document.getElementById('cat_nameEdit').value,
    };

    fetch(`${server}/product/findByCatName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(json => setSelectedNamesEdit(json));
  }

  const handleEdit = () => {
    let obj = {
      name: (document.getElementById('name').value).trim(),
    }

    fetch(`${server}/product/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(json => setToEdit(json));
  }






  return (
    <div className='canvas_claro'>
      <p className="titulo_oscuro">Ajuste Datos de Producto</p>
      <Link to="/" className='inicio'>Inicio</Link>
      <Link to="/product" className='volver'>Volver</Link>
      <Container >
        <form className='container' onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <label htmlFor='cat_name' className='label'>Categoria del elemento</label>
            <select {...register("cat_name")}
              className="campo_entrada"
              placeholder="Categoria del elemento"
              id="cat_name" onChange={handleCatChange}
            >
              <option value=''>Seleccione la categoría del elemento</option>
              {categories.map((e, index) => {
                return (
                  <option key={index} value={e.name} >{e.name}</option>
                )
              })}
            </select>
            <p className='error'>{errors.cat_name?.message}</p>
          </Row>
          <Row>
            <label htmlFor='name' className='label'>Nombre del elemento que requiere modificación</label>
            <select {...register("name")}
              className="campo_entrada container"
              placeholder="Escoja el Item"
              id='name' onChange={handleEdit}
            >
              <option value=''>Elemento a adicionar</option>
              {selectedNames.map((e, index) => {
                return (
                  <option key={index} value={e.name} >{
                    e.temperature !== "" ? ` ${e.name}  /   ${e.temperature}` : ` ${e.name}`}</option>
                )
              })}
            </select>
            <p className='error'>{errors.name?.name}</p>
          </Row>

          {/********************************************************************************* */}
          <h6>Datos para corrección - solo editar los que cambian</h6>

          <Row>
            <label htmlFor='nameEdit' className='label'>Nombre</label>
            <input  {...register("nameEdit")}
              className="campo_entrada"
              placeholder={toEdit.name}
              name="nameEdit"
              id="nameEdit"
              type="text"
            />
            <p className='error'>{errors.nameEdit?.message}</p>
          </Row>
          <Row>
            <label htmlFor='product_idEdit' className='label'>Codigo del Producto</label>
            <input  {...register("product_idEdit")}
              className="campo_entrada"
              id='product_idEdit'
              placeholder={toEdit.product_id}
            />
            <p className='error'>{errors.product_idEdit?.message}</p>
          </Row>
          <Row>
            <label htmlFor='descriptionEdit' className='label'>Descripcion</label>
            <textarea  {...register("descriptionEdit")}
              className="campo_entrada"
              placeholder={toEdit.description}
              id='descriptioEdit'
            />
            <p className='error'>{errors.cat_descriptionEdit?.message}</p>
          </Row>
          <Row>
            <label htmlFor='priceEdit' className='label'>Precio</label>
            <input  {...register("priceEdit")}
              className="campo_entrada"
              placeholder={toEdit.price}
              id='priceEdit'
              defaultValue={toEdit.price}
            />
            <p className='error'>{errors.cat_priceEdit?.message}</p>
          </Row>
          <Row>

            <label htmlFor='cat_nameEdit' className='label'>Categoría</label>
            <select  {...register("cat_nameEdit")}
              className="campo_entrada"
              placeholder={toEdit.cat_name}
              id='cat_nameEdit' onChange={handleCatEdit}
            >
              <option value=''>Seleccione la categoría del Elemento</option>
              {categories.map((e, index) => {
                return (
                  <option key={index} value={e.name} >{e.name}</option>
                )
              })}
            </select>
            <p className='error'>{errors.cat_nameEdit?.message}</p>
          </Row>
          <Row>
            <label htmlFor='temperatureEdit' className='label'>Temperatura</label>
            <select  {...register("temperatureEdit")}
              className="campo_entrada"
              placeholder={toEdit.temperature}
              id='temperatureEdit'
            >
              <option value={toEdit.temeprature}>{toEdit.temeprature}</option>
              <option value='Caliente'>Caliente</option>
              <option value='Frío'>Frío</option>
            </select>
            <p className='error'>{errors.temperature?.message}</p>
          </Row>
          <Row>
            <label htmlFor='img_urlEdit' className='label'>Link a nueva imagen</label>
            <input {...register("img_urlEdit")}
              className="campo_entrada"
              placeholder={toEdit.img_url}
              id='img_urlEdit'
            />
            <p className='error'>{errors.img_url?.message}</p>
          </Row>
          <Row>
            <label htmlFor='stock_nameEdit' className='label'>Elemento de descontar de Inventario</label>
            <select  {...register("stock_nameEdit")}
              className="campo_entrada"
              placeholder={toEdit.stock_name}
              id='stock_nameEdit'
            >
              <option value=''>Para ver opciones selecciona nuevamente la categoria</option>
              {selectedNamesEdit.map((e, index) => {
                return (
                  <option key={index} value={e.name} >{e.name}</option>
                )
              })}
            </select>
            <p className='error'>{errors.stock_name?.message}</p>
          </Row>
          <Row>
            <label htmlFor='stock_qtyEdit' className='label'>Cantidad adescontar del inventario (si aplica)</label>
            <input  {...register("stock_qtyEdit")}
              className="campo_entrada"
              placeholder={toEdit.stock_qty}
              id='stock_qtyEdit'
              defaultValue={toEdit.stock_qty}
            />
            <p className='error'>{errors.stock_qty?.message}</p>
          </Row>
          <Row>
            <label htmlFor='statusEdit' className='label'>Defina el estado</label>
            <select {...register("statusEdit")}
              className="campo_entrada"
              placeholder={toEdit.status}
              id="statusEdit"
            >
              <option value=''>{""}</option>
              <option value='0'>Descontinuar</option>
              <option value='1'>Activar</option>
            </select>
            <p className='error'>{errors.statusEdit?.message}</p>
          </Row>
          <button className='btn-light-bkg' type="submit">Actualizar</button>
        </form>
      </Container>
    </div >
  );
};

export default AdjustProduct;

