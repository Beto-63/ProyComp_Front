import React from 'react'
import './BotonFondoClaro.css'

const BotonFondoClaro = (props) => {
    const handleClick = () => {
        console.log("desde la fcion del botonClaro")
    }

    return (
        <div>
            <button className='centro_bajo' onClick={handleClick}>{props.label}</button>
        </div>
    )
}

export default BotonFondoClaro
