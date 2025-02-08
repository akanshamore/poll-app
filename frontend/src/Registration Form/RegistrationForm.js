// src/RegistrationForm.js
import React, { useContext, useState } from 'react';
import './RegistrationForm.css';
import AuthContext from '../context/AuthContext';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        password: ''
    });

    const { register } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.role) newErrors.role = 'Role is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            try {

                await register(formData)

                setErrorMessage('');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    role: '',
                    password: ''
                });

            } catch (error) {

                setErrorMessage(error.message);
                setSuccessMessage('');

            }

        }
    };

    return (


        <div className="registration-form-container">
            <h2>Register</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="registration-form" autoComplete={false}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error-input' : ''}

                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error-input' : ''}

                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'error-input' : ''}
                    />
                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select name="role" value={formData.role} onChange={handleChange} className={errors.role ? 'error-input' : ''}>
                        <option value="">Select role</option>
                        <option value="Institute">Institute</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                    </select>
                    {errors.role && <p className="error-message">{errors.role}</p>}
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error-input' : ''}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <button type="submit" className="submit-btn">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
