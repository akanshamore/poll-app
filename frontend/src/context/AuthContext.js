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
                role: data.role
            }));

            setUser({ name: data.name, email, role: data.role });

            navigate('/dashboard');

            console.log('response', response)


        } catch (error) {

        }




    };

    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;