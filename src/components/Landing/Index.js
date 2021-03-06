import React from 'react'
import { useNavigate } from 'react-router-dom';

import '../generic/Light-bkg.css'
import logo from '../generic/LogoDOKO.svg';
import foto from '../../Assets/foto.png'

// const goToLogin = () => {
// TODO cambiar para llevar a log in cuando se onte la seguridad
// }

const Index = () => {
    let navigate = useNavigate('/menu');

    const goToLogin = () => {
        navigate('/login')
        // nivigate('/login') Una vez se implemente la seguridad debera cambiarse esta funcion par
        // que no lleve a esta pagina sino a la de autenticacion, i esa si al menu real <generalNav></generalNav>
    }

    return (
        <div className='canvas_claro' >
            <img src={logo} alt='logo de El DOKO' className='' />
            <br />
            <p className="titulo_oscuro">Bienvenido a El Doko</p>
            <br />
            <img src={foto} alt='logo de El DOKO' className='foto' />
            <br /><br />
            <a href="https://www.eldoko.com/">Visita Nuestra tienda virtual</a>
            <br /><br />



            <button className='btn-light-bkg' onClick={goToLogin}>Soy empleado!</button>
            <br /><br />

        </div>
    )
}

export default Index