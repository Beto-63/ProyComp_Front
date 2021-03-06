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
  name: yup.string().trim().required('Ingresa el nombre comercial del producto'),
  description: yup.string().max(128),
  price: yup.number().typeError('Ingresa el precio de venta').moreThan(0, 'El valor debe ser positivo').required(),
  cat_name: yup.string().trim().required('La categoria sirve para hacer mas cortas las selecciones'),
  fill: yup.string(),
  temperature: yup.string(),
  img_url: yup.string('Solo se aceptan caracteres'),
  stock_name: yup.string(),
  stock_qty: yup.number().typeError('Dejar en 0 | Cambiar para deecontar del inventario'),
  combo_name: yup.string()
})

let esPaquete = false
let esBebida = false
let esCombo = false

const CreateProduct = () => {

  const { setAuth } = useContext(AuthContext);

  let navigate = useNavigate();

  const [categories, setCategories] = useState([{}]);
  const [selectedItems, setSelectedItems] = useState([{}]);
  const [combos, setCombos] = useState([{}]);

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
      //.then(json => setCategories(json))

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
      //.then(json => setCombos(json))

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
    if (document.getElementById('cat_name').value === 'Paquete') {
      esPaquete = true;
      esBebida = false
    }
    if (document.getElementById('cat_name').value === 'T??' ||
      document.getElementById('cat_name').value === 'Infusi??n') {
      esBebida = true;
      esPaquete = false
    }
    if (document.getElementById('cat_name').value === 'Combo') {
      esCombo = true
    } else {
      esCombo = false
    }

    fetch(`${server}/stock/findByCatName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(obj)
    })
      //.then(response => response.json())
      //.then(json => setSelectedItems(json))

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

                setSelectedItems(json); // Recibo de informaci??n del backend en json (Segundo .then)
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
    fetch(`${server}/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    })
      //.then(response => response.json())
      //.then(json => window.alert(JSON.stringify(json)))

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

                //setSelectedItems(json); // Recibo de informaci??n del backend en json (Segundo .then)
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

    //reset();
  };

  return (
    <div className='canvas_claro'>
      <p className="titulo_oscuro">Crear producto</p>
      <Link to="/menu" className='inicio'>Inicio</Link>
      <Link to="/product" className='volver'>Volver</Link>
      <Container >
        <form className='container' onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="Descripci??n"
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
              placeholder="Categor??a de Producto"
              id='cat_name'
            >
              <option value=''>Seleccione la categor??a del producto</option>
              {categories.map((e, index) => {
                return (
                  <option key={index} value={e.name} >{e.name}</option>
                )
              })}
            </select>
            <p className='error'>{errors.cat_name?.message}</p>
          </Row>
          {esPaquete ?
            <Row>
              <select {...register("fill")}
                className="campo_entrada"
                placeholder="Se requiere solo venta por gramos: T?? e Infusi??n"
              >

                <option value='T??'>de T??</option>
                <option value='Infusi??n'>de Infusi??n</option>
              </select>
              <p className='error'>{errors.temperature?.message}</p>
            </Row>
            :
            ""
          }
          {esBebida ?
            <Row>
              <select {...register("temperature")}
                className="campo_entrada"
                placeholder="Temperatura - Se requiere en T?? e Infusi??n"
              >
                <option value=''>Selecciona la Temperatura</option>
                <option value='Caliente'>Caliente</option>
                <option value='Fr??o'>Fr??o</option>
              </select>
              <p className='error'>{errors.temperature?.message}</p>
            </Row>
            :
            ''
          }
          <Row>
            <input {...register("img_url")}
              className="campo_entrada"
              placeholder="URL de foto - Opcional"

            />
            <p className='error'>{errors.img_url?.message}</p>
          </Row>
          <Row>
            <label htmlFor='stock_name' className='label'>Elemento a descontar del inventario</label>
            {esCombo ?
              ''
              :
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
            }
            {esCombo ?
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
              :
              ""
            }


            <p className='error'>{errors.stock_name?.message}</p>

          </Row>
          <Row>
            <label htmlFor='stock_qty' className='label'>Cantidad a descontar del inventario (si aplica)</label>
            <input {...register("stock_qty")}
              className="campo_entrada"
              placeholder="Cantidad a descontar (gr - unidades)"

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