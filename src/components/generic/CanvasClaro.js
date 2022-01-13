import React from 'react';
import BotonFondoClaro from './BotonFondoClaro';
import './CanvasClaro.css';

const CanvasClaro = () => {
    return (
        <div className='canvas_claro'>
            <p>Aqui va el contenido</p>
            <BotonFondoClaro action='Test' className='boton_inferior' />
        </div>
    )
}

export default CanvasClaro
