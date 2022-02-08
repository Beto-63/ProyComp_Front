import React from 'react';
import { Routes, Route } from 'react-router-dom';

//Importar componentes o paginas
import Auth from '../pages/Auth';
import Login from '../components/auth/Login';
import PasswordRecovery1 from '../components/auth/PasswordRecovery1';
import PasswordRecovery2 from '../components/auth/PasswordRecovery2';
import NotFound from '../components/auth/NotFound';


export const UnauthRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Auth />} />
            <Route path='/login' element={<Login />} />
            <Route path='/rec1' element={<PasswordRecovery1 />} />
            <Route path='/rec2' element={<PasswordRecovery2 />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
};
