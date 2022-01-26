import React from 'react'
import './BotonFondoClaro.css'

const BotonFondoClaro = (props) => {

    return (
        <div>
            <button className='centro_bajo' type={props.type} onClick={props.handleClick}>{props.label}</button>

        </div>
    )
}

export default BotonFondoClaro
