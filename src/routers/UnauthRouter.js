import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Auth from '../pages/Auth';
import Login from '../components/auth/Login';
import PasswordRecovery from '../components/auth/PasswordRecovery';
import NotFound from '../components/auth/NotFound';


export const UnauthRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Auth />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<PasswordRecovery />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
};


