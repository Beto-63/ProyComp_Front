import React from 'react'
import { Link } from 'react-router-dom';
import { server } from '../../context/Api'
import '../generic/Light-bkg.css'

const LogoutTemp = () => {
    return (
        <div className='canvas_claro' >
            <p className="titulo_oscuro">Terminar el uso de la Aplicacion</p>

            {/* Se insertan los links de navegacion general */}
            <Link to="/menu" className='inicio'>Inicio</Link>
            <Link to="/stock" className='volver'>Volver</Link>
            <form className='container'>
                <h6 className='openclose'>Si sales, tendras que autenticarte de nuevo para usar la aplicación...</h6>
                <br /><br /><br />

                <button className='btn-light-bkg' onClick='sacarlo'>Salir</button>
            </form>
        </div>
    )
}

export default LogoutTemp