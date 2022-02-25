import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

//Importar componentes o paginas
import IndexLanding from '../components/Landing/Index';
import Login from '../components/auth/Login';
import PasswordRecovery1 from '../components/auth/PasswordRecovery1';
import PasswordRecovery2 from '../components/auth/PasswordRecovery2';

export const UnauthRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<IndexLanding />} />
            <Route path='/login' element={<Login />} />
            <Route path='/lost-password' element={<PasswordRecovery1 />} />
            <Route path='/recovery/:token' element={<PasswordRecovery2 />} />
            <Route path='*' element={<Navigate replace to="/"/>} />
        </Routes>
    )
};
