import React from 'react'

import GeneralNav from '../components/generic/GeneralNav'
import Login from '../components/auth/Login'


function Auth() {
    return (
        <div>
            <GeneralNav />
            <h1>Pagina de AUTENTICACION</h1>
            <Login />
        </div>
    )
}

export default Auth
