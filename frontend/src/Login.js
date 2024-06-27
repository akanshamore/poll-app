import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import AuthContext from './context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('institute@example.com');
    const [password, setPassword] = useState('password123');
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);



    const handleLogin = async (e) => {
        e.preventDefault();

        console.log('Entered Credentials', email, password)

        await login(email, password)

        // Mock authentication
        // if (email === 'user@example.com' && password === 'password') {
        //     // Generate a mock token and save it to local storage
        //     const token = 'mock-token';
        //     localStorage.setItem('token', token);
        //     navigate('/dashboard');
        // } else {
        //     alert('Invalid credentials');
        // }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;