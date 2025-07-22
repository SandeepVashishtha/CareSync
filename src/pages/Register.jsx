import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/auth/signup', form);
            setSuccess(true);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {success ? (
                <div className="success-message">Registration successful!</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                    {error && <div className="error-message">{error}</div>}
                </form>
            )}
        </div>
    );
}

export default Register;
