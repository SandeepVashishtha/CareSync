import React, { useState } from 'react';
        import './Login.css';

        function Login() {
            const [form, setForm] = useState({ email: '', password: '' });
            const [success, setSuccess] = useState(false);

            const handleChange = e => {
                setForm({ ...form, [e.target.name]: e.target.value });
            };

            const handleSubmit = e => {
                e.preventDefault();
                // Dummy login logic
                setSuccess(true);
            };

            return (
                <div className="login-container">
                    <h2>Login</h2>
                    {success ? (
                        <div className="success-message">Login successful!</div>
                    ) : (
                        <form onSubmit={handleSubmit}>
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
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
            );
        }

        export default Login;