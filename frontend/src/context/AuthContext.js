import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            // Mocking a user fetch with token
            setUser({ name: 'John Doe', email: 'john.doe@example.com', role: 'institute' });
        }
    }, [token]);

    const login = (email, password) => {
        // Mock authentication
        const mockToken = 'mock-token-12345';
        setToken(mockToken);
        localStorage.setItem('token', mockToken);
        setUser({ name: 'John Doe', email, role: 'institute' });
        navigate('/dashboard');
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