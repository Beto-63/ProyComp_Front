import React from 'react'
import './BotonFondoOscuro.css'

const BotonFondoOscuro = (props) => {
    return (
        <div>
            <button className='fondo_oscuro' onClick={props.handleClick}>{props.label}</button>
        </div>
    )
}

export default BotonFondoOscuro
