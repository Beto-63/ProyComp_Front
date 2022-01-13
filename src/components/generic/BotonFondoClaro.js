import React from 'react'
import './BotonFondoClaro.css'

const BotonFondoClaro = (props) => {
    return (
        <div>
            <button className='centro_bajo'>{props.action}</button>
        </div>
    )
}

export default BotonFondoClaro
