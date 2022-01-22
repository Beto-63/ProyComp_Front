/**********************Importacion de Librerias****************************/

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**********************Importacion de Componentes**************************/
import { NewStockItem } from '../../context/FecthIntructions'
//import StockContext from '../../context/StockContext'
/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'


const schema = yup.object({
    /*El primero debe ser el tipo de dato y el ultimo debe ser el required*/
    name: yup.string().required('Este campo es requerido'),
    quantity: yup.number('El valor debeser numerico').moreThan(0, 'El valor debe ser positivo').required('Este campo es requerido'),
    channel: yup.string().required('Este campo es requerido')
}).required();

const CreateStockItem = () => {

    // Se declaro este arreglo para probar el select con dos valores
    const ubicaciones = ['Arsenal', 'Bodega']
    //const [ubicaciones, setUbicaciones] = useState([{}]);
    //const { } = useContext(StockContext);
    useEffect(() => {
        console.log("activo useEffect");
        // Reemplazar el console por la consulta a la base de datos para llenar el select
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {

        NewStockItem(data)
        console.log("data", data);      //aqui va la creacion del item con un fetch al back
        reset();
    };

    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Crear elemento</p>
            <Link to="/" className='salir'>Salir</Link>
            <Link to="/stock" className='volver'>Volver</Link>
            <Container>
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <input {...register("name")}
                            className="campo_entrada"
                            placeholder="Nombre"
                        />
                        <p className='error'>{errors.name?.message}</p>
                    </Row>
                    <Row>
                        <input {...register("quantity")}
                            className="campo_entrada"
                            placeholder="Cantidad (gr/unidades)"
                        />
                        <p className='error'>{errors.quantity?.message}</p>
                    </Row>
                    <Row>
                        <select {...register("channel")}
                            className="campo_entrada"
                            placeholder="Ubicación (Bodega/Arsenal) --temporal"
                        >
                            <option value=''>Ingrese Ubicacion</option>
                            {/* Asi se customizan las listas de seleccion directamente desde la base de datos */}
                            {ubicaciones.map((element, index) => {
                                return (
                                    <option key={index} value={element} >{element}</option>
                                )
                            })}
                        </select>
                        <p className='error'>{errors.channel?.message}</p>
                    </Row>
                    <button className='btn-light-bkg' type="submit">Crear</button>
                </form>
            </Container>
        </div>
    );
};

export default CreateStockItem;

