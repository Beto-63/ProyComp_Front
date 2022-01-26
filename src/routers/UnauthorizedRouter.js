import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Login from '../components/auth/Login';
import NotFound from '../pages/NotFound';

export const UnauthorizedRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};


