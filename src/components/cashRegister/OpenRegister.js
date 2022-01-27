/**********************Importacion de Librerias****************************/

import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/**********************Importacion de Componentes**************************/
//import { server } from '../../context/Api'

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'

const schema = yup.object({
    /*El primero debe ser el tipo de dato y el ultimo debe ser el required*/
    //name: yup.string().required('Ingresa el nombre del elemento inventariable'),
    change_amount: yup.number().typeError('Aqui va lo que reservas para vueltos').moreThan(2000, 'Menos de 20 es poco!').required(),
    //channel: yup.string().required('Por ser inventariable debe asignarsele un lugar físico'),

});

const OpenRegister = () => {


    // const [canOpen, setCanOpen] = useState(false);
    //const [lastOpen, setLastOpen] = useState({});



    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    useEffect(() => {
        console.log("Effect")


    }, [])

    const handleOpen = () => {
        console.log("Borrar handleOpen")
    };

    const onSubmit = (data) => {

        console.log(" se pidio enviar y se resetea")
        reset();
    };


    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Abre tu caja</p>
            {/* Se insertan los links de navegacion general */}
            <Link to="/" className='salir'>Salir</Link>
            <Link to="/cash" className='volver'>Volver</Link>
            <Container >
                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <input {...register("change_amount")}
                            className="campo_entrada"
                            placeholder="Base de caja para vueltos"
                            onChange={handleOpen}
                        />
                        <p className='error'>{errors.change_amount?.message}</p>
                    </Row>


                    <button className='btn-light-bkg' type="submit">Abrir Caja(alerta)</button>
                </form>
            </Container>
        </div>
    )
}

export default OpenRegister
