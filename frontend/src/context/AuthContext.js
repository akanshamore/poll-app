import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from '../utils/urls';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const navigate = useNavigate();



    const login = async (email, password) => {
        // API integration

        try {


            const response = await fetch(URL.LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();

            setToken(data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({
                name: data.name,
                email,
                role: data.role,
                userId: data.userId
            }));

            setUser({ name: data.name, email, role: data.role, userId: data.userId });

            navigate('/dashboard');




        } catch (error) {

        }




    };

    const register = async ({ email, name, phone, role, password }) => {
        // API integration

        const response = await fetch(URL.REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name, phone, role, password })
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const data = await response.json();

        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
            name: data.name,
            email,
            role: data.role,
            userId: data.userId
        }));

        setUser({ name: data.name, email, role: data.role, userId: data.userId });

        navigate('/dashboard');

    };

    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;