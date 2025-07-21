import React from 'react';
import Navbar from './components/Navbar';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import Prescriptions from './pages/Prescriptions';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/prescriptions" element={<Prescriptions />} />
            </Routes>
        </Router>
    );
}

export default App;