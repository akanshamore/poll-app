import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import RegistrationForm from './Registration Form/RegistrationForm';
import Login from './Login';
import Dashboard from './Dashboard';
import { AuthProvider } from './context/AuthContext';

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>

          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />


            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>




    </div >

  );
}

export default App;


