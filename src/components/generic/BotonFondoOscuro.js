import React from 'react'
import './BotonFondoOscuro.css'

const BotonFondoOscuro = (props) => {
    return (
        <div>
            <button className='fondo_oscuro'>{props.action}</button>
        </div>
    )
}

export default BotonFondoOscuro
