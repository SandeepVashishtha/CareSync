import React, { useState } from 'react';
import './Register.css';

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Dummy registration logic
        setSuccess(true);
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
                </form>
            )}
        </div>
    );
}

export default Register;