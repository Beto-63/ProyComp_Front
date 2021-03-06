/**********************Importacion de Librerias****************************/

import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Row, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api';
import AuthContext from "../../context/AuthContext";

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css';


const schema = yup.object({
  cat_name: yup.string().trim().required("Se requiere para agilizar la seleccion"),
  cat_nameEdit: yup.string(),
  fill: yup.string(),
  fillEdit: yup.string(),
  name: yup.string().trim().required("Con el nombre se despliega la Inofrmacion almacenada "),
  nameEdit: yup.string(),
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
  stock_qty: yup.number().typeError('Ingresa el precio de venta'),
  stock_qtyEdit: yup.number().typeError('Ingresa el precio de venta'),
  statusEdit: yup.number().typeError('Se requiere definir el Estado'),
  combo_nameEdit: yup.string()
})

const AdjustProduct = () => {

  const { setAuth } = useContext(AuthContext);

  let navigate = useNavigate();

  const objProduct = {
    product_id: '',
    name: '',
    description: '',
    price: null,
    cat_name: '',
    fill: '',
    temperature: '',
    img_url: '',
    stock_name: '',
    stock_qty: 0,
    status: null
  }

  const [categories, setCategories] = useState([{}]);
  const [selectedNames, setSelectedNames] = useState([{}]);
  const [selectedNamesEdit, setSelectedNamesEdit] = useState([{}]);
  const [combos, setCombos] = useState([{}]);
  const [toEdit, setToEdit] = useState(objProduct);

  useEffect(() => {
    fetch(`${server}/product/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify()
    })
      //.then(response => response.json())
      //.then(json => setCategories(json));

      .then(async (resp)=>{ // (primer .then)
            
        switch (resp.status) {

            // Middleware - Inicio
            
            case 401:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("Intente autenticarse nuevamente");
                navigate("/login");
                break;

            case 404:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("404");
                navigate("/login");
                break;

            case 403:
                //localStorage.removeItem("token");
                //setAuth(false);
                window.alert("403");
                navigate("/");
                break;
            
            // Middleware - Fin

            // C??digos del backend - Inicio

            case 200:
                //localStorage.removeItem("token");
                //setAuth(false);

                // Se retorna el json con la informaci??n
                let json = await resp.json();

                setCategories(json); // Recibo de informaci??n del backend en json (Segundo .then)
                //window.alert(json);
                //navigate("/");
                break;

            case 500:
                //localStorage.removeItem("token");
                //setAuth(false);
                window.alert("500");
                navigate("/");
                break;

            // C??digos del backend - Fin
        
            default:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("default case");
                navigate("/");
                break;
        }

    }).catch(error=>{
        console.error(error);
    })

  }, [])

  useEffect(() => {
    fetch(`${server}/product/combo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify()
    })
      //.then(response => response.json())
      //.then(json => setCombos(json));

      .then(async (resp)=>{ // (primer .then)
            
        switch (resp.status) {

            // Middleware - Inicio
            
            case 401:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("Intente autenticarse nuevamente");
                navigate("/login");
                break;

            case 404:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("404");
                navigate("/login");
                break;

            case 403:
                //localStorage.removeItem("token");
                //setAuth(false);
                window.alert("403");
                navigate("/");
                break;
            
            // Middleware - Fin

            // C??digos del backend - Inicio

            case 200:
                //localStorage.removeItem("token");
                //setAuth(false);

                // Se retorna el json con la informaci??n
                let json = await resp.json();

                setCombos(json); // Recibo de informaci??n del backend en json (Segundo .then)
                //window.alert(json);
                //navigate("/");
                break;

            case 500:
                //localStorage.removeItem("token");
                //setAuth(false);
                window.alert("500");
                navigate("/");
                break;

            // C??digos del backend - Fin
        
            default:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("default case");
                navigate("/");
                break;
        }

      }).catch(error=>{
          console.error(error);
      })

  }, [])

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleCatChange = () => {
    let obj = { cat_name: document.getElementById('cat_name').value };

    fetch(`${server}/product/findByCatName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(obj)
    })
      //.then(response => response.json())
      //.then(json => setSelectedNames(json));

      .then(async (resp)=>{ // (primer .then)
            
        switch (resp.status) {

            // Middleware - Inicio
            
            case 401:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("Intente autenticarse nuevamente");
                navigate("/login");
                break;

            case 404:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("404");
                navigate("/login");
                break;

            case 403:
                //localStorage.removeItem("token");
                //setAuth(false);
                window.alert("403");
                navigate("/");
                break;
            
            // Middleware - Fin

            // C??digos del backend - Inicio

            case 200:
                //localStorage.removeItem("token");
                //setAuth(false);

                // Se retorna el json con la informaci??n
                let json = await resp.json();

                setSelectedNames(json); // Recibo de informaci??n del backend en json (Segundo .then)
                //window.alert(json);
                //navigate("/");
                break;

            case 500:
                //localStorage.removeItem("token");
                //setAuth(false);
                window.alert("500");
                navigate("/");
                break;

            // C??digos del backend - Fin
        
            default:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("default case");
                navigate("/");
                break;
        }

    }).catch(error=>{
        console.error(error);
    })

  }

  const handleCatEdit = () => {
    let obj = {
      cat_name: document.getElementById('cat_nameEdit').value,
    };

    fetch(`${server}/product/findByCatName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(obj)
    })
      //.then(response => response.json())
      //.then(json => setSelectedNamesEdit(json));

      .then(async (resp)=>{ // (primer .then)
            
        switch (resp.status) {

            // Middleware - Inicio
            
            case 401:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("Intente autenticarse nuevamente");
                navigate("/login");
                break;

            case 404:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("404");
                navigate("/login");
                break;

            case 403:
                //localStorage.removeItem("token");
                //setAuth(false);
                window.alert("403");
                navigate("/");
                break;
            
            // Middleware - Fin

            // C??digos del backend - Inicio

            case 200:
                //localStorage.removeItem("token");
                //setAuth(false);

                // Se retorna el json con la informaci??n
                let json = await resp.json();

                setSelectedNamesEdit(json); // Recibo de informaci??n del backend en json (Segundo .then)
                //window.alert(json);
                //navigate("/");
                break;

            case 500:
                //localStorage.removeItem("token");
                //setAuth(false);
                window.alert("500");
                navigate("/");
                break;

            // C??digos del backend - Fin
        
            default:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("default case");
                navigate("/");
                break;
        }

    }).catch(error=>{
        console.error(error);
    })

  }

  const handleEdit = () => {
    let obj = {
      name: (document.getElementById('name').value).trim(),
    }

    fetch(`${server}/product/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(obj)
    })
      //.then(response => response.json())
      //.then(json => setToEdit(json));

      .then(async (resp)=>{ // (primer .then)
            
        switch (resp.status) {

            // Middleware - Inicio
            
            case 401:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("Intente autenticarse nuevamente");
                navigate("/login");
                break;

            case 404:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("404");
                navigate("/login");
                break;

            case 403:
                //localStorage.removeItem("token");
                //setAuth(false);
                window.alert("403");
                navigate("/");
                break;
            
            // Middleware - Fin

            // C??digos del backend - Inicio

            case 200:
                //localStorage.removeItem("token");
                //setAuth(false);

                // Se retorna el json con la informaci??n
                let json = await resp.json();

                setToEdit(json); // Recibo de informaci??n del backend en json (Segundo .then)
                //window.alert(json);
                //navigate("/");
                break;

            case 500:
                //localStorage.removeItem("token");
                //setAuth(false);
                window.alert("500");
                navigate("/");
                break;

            // C??digos del backend - Fin
        
            default:
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("default case");
                navigate("/");
                break;
        }

    }).catch(error=>{
        console.error(error);
    })

  }

  const onSubmit = (data) => {

    let newObj = { id: toEdit._id, status: data.statusEdit }

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
    if (data.fillEdit !== '') {
      newObj = { ...newObj, fill: data.fillEdit }
    } else {
      newObj = { ...newObj, fill: toEdit.fill }
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
    if (data.combo_nameEdit !== '') {
      newObj = { ...newObj, combo_name: data.combo_nameEdit }
    } else {
      newObj = { ...newObj, combo_name: toEdit.combo_name }
    }

    fetch(`${server}/product`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      //enviamos los datos por body y se debe convertir el objeto en JSON
      body: JSON.stringify(newObj)
    })
      //.then(response => response.json())
      //.then(json => window.alert(JSON.stringify(json)))
    //reset();
    //setToEdit(objProduct);

    .then(async (resp)=>{ // (primer .then)
            
      switch (resp.status) {

          // Middleware - Inicio
          
          case 401:
              localStorage.removeItem("token");
              setAuth(false);
              window.alert("Intente autenticarse nuevamente");
              navigate("/login");
              break;

          case 404:
              localStorage.removeItem("token");
              setAuth(false);
              window.alert("404");
              navigate("/login");
              break;

          case 403:
              //localStorage.removeItem("token");
              //setAuth(false);
              window.alert("403");
              navigate("/");
              break;
          
          // Middleware - Fin

          // C??digos del backend - Inicio

          case 201:
              //localStorage.removeItem("token");
              //setAuth(false);

              // Se retorna el json con la informaci??n
              let json = await resp.json();

              //setToEdit(objProduct); // Recibo de informaci??n del backend en json (Segundo .then)
              window.alert(json);
              //navigate("/");
              break;

          case 500:
              //localStorage.removeItem("token");
              //setAuth(false);
              window.alert("500");
              navigate("/");
              break;

          // C??digos del backend - Fin
      
          default:
              localStorage.removeItem("token");
              setAuth(false);
              window.alert("default case");
              navigate("/");
              break;
      }

    }).catch(error=>{
        console.error(error);
    })

  };

  return (
    <div className='canvas_claro'>
      <p className="titulo_oscuro">Ajuste Datos de Producto</p>
      <Link to="/menu" className='inicio'>Inicio</Link>
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
              <option value=''>Seleccione la categor??a del Producto</option>
              {categories.map((e, index) => {
                return (
                  <option key={index} value={e.name} >{e.name}</option>
                )
              })}
            </select>
            <p className='error'>{errors.cat_name?.message}</p>
          </Row>
          <Row>
            <label htmlFor='name' className='label'>Nombre del elemento que requiere modificaci??n</label>
            <select {...register("name")}
              className="campo_entrada container"
              placeholder="Escoja el Item"
              id='name' onChange={handleEdit}
            >
              <option value=''>Producto a modificar</option>
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
          <h6>Datos para correcci??n - solo editar los que cambian</h6>

          <Row>
            <label htmlFor='nameEdit' className='label'>Nombre</label>
            <input  {...register("nameEdit")}
              className="campo_entrada"
              defaultValue={toEdit.name}
              name="nameEdit"
              id="nameEdit"
              type="text"
            />
            <p className='error'>{errors.nameEdit?.message}</p>
          </Row>
          <Row>
            <label htmlFor='descriptionEdit' className='label'>Descripcion</label>
            <textarea  {...register("descriptionEdit")}
              className="campo_entrada"
              defaultValue={toEdit.description}
              id='descriptioEdit'
            />
            <p className='error'>{errors.cat_descriptionEdit?.message}</p>
          </Row>
          <Row>
            <label htmlFor='priceEdit' className='label'>Precio</label>
            <input  {...register("priceEdit")}
              className="campo_entrada"
              defaultValue={toEdit.price}
              id='priceEdit'
            />
            <p className='error'>{errors.cat_priceEdit?.message}</p>
          </Row>
          <Row>
            <label htmlFor='cat_nameEdit' className='label'>Categor??a</label>
            <select  {...register("cat_nameEdit")}
              className="campo_entrada"
              defaultValue={toEdit.cat_name}
              id='cat_nameEdit' onChange={handleCatEdit}
            >
              <option defaultValue={toEdit.cat_name}>{toEdit.cat_name}</option>
              {categories.map((e, index) => {
                return (
                  <option key={index} value={e.name} >{e.name}</option>
                )
              })}
            </select>
            <p className='error'>{errors.cat_nameEdit?.message}</p>
          </Row>
          <Row>
            <label htmlFor='fillEdit' className='label'>Si es por gramos defina si es de T?? o Infusi??n</label>
            <select  {...register("fillEdit")}
              className="campo_entrada"
              id='fillEdit'
            >
              <option defaultValue={toEdit.fill}>{toEdit.fill}</option>
              <option value='T??'>T??</option>
              <option value='Infusi??n'>Infusi??n</option>
            </select>
            <p className='error'>{errors.fillEdit?.message}</p>
          </Row>
          <Row>
            <label htmlFor='temperatureEdit' className='label'>Si es una bebida defina la temperatura</label>
            <select  {...register("temperatureEdit")}
              className="campo_entrada"
              id='temperatureEdit'
            >
              <option defaultValue={toEdit.temperature}>{toEdit.temperature}</option>
              <option value='caliente'>Caliente</option>
              <option value='fr??o'>Fr??o</option>
            </select>
            <p className='error'>{errors.temperature?.message}</p>
          </Row>
          <Row>
            <label htmlFor='img_urlEdit' className='label'>Link a nueva imagen</label>
            <input {...register("img_urlEdit")}
              className="campo_entrada"
              defaultValue={toEdit.img_url}
              id='img_urlEdit'
            />
            <p className='error'>{errors.img_url?.message}</p>
          </Row>
          <Row>
            <label htmlFor='stock_nameEdit' className='label'>Elemento a descontar de Inventario (No Combo)</label>
            <select  {...register("stock_nameEdit")}
              className="campo_entrada"
              defaultValue={toEdit.stock_name}
              id='stock_nameEdit'
            >
              <option defaultValue={toEdit.stock_name} >{toEdit.stock_name}</option>
              {selectedNamesEdit.map((e, index) => {
                return (
                  <option key={index} value={e.name} >{e.name}</option>
                )
              })}
            </select>
            <p className='error'>{errors.stock_name?.message}</p>
          </Row>
          <Row>
            <label htmlFor='stock_nameEdit' className='label'>Agrupacion a descontar de Inventario (Combo)</label>
            <select {...register("combo_name")}
              className="campo_entrada"
              placeholder="Agrupacion Xa Combo "
            >

              {combos.map((e, index) => {
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
              id='stock_qtyEdit'
              defaultValue={toEdit.stock_qty}
            />
            <p className='error'>{errors.stock_qty?.message}</p>
          </Row>

          <Row>
            <label htmlFor='statusEdit' className='label'>Defina el estado</label>
            <select {...register("statusEdit")}
              className="campo_entrada"

              id="statusEdit"
            >
              <option defaultValue={toEdit.status}>{toEdit.status}</option>
              <option value='0'>0 = Descontinuar</option>
              <option value='1'>1= Activar</option>
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

