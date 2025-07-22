import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAppointments } from '../hooks/useAppointments';
import doctors from '../data/doctors.json';
import './Appointments.css';

function Appointments() {
    const { user } = useAuth();
    const { appointments, addAppointment, deleteAppointment, loading, error } = useAppointments();
    const [form, setForm] = useState({
        date: '',
        time: '',
        doctor: '',
        reason: '',
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.date && form.time && form.doctor && form.reason && user) {
            setSubmitting(true);
            try {
                await addAppointment(form);
                setForm({ date: '', time: '', doctor: '', reason: '' });
            } catch (err) {
                console.error('Error submitting appointment:', err);
            } finally {
                setSubmitting(false);
            }
        }
    };

    const handleDelete = async (appointmentId) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            await deleteAppointment(appointmentId);
        }
    };

    // Show login message if user is not authenticated
    if (!user) {
        return (
            <div className="appointments-container">
                <h1>Appointments</h1>
                <p className="login-message">Please log in to view and manage your appointments.</p>
            </div>
        );
    }

    return (
        <div className="appointments-container">
            <h1>Welcome {user.name || user.email}, Your Appointments</h1>
            
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="appointments-form">
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                />
                <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                />
                <select
                    name="doctor"
                    value={form.doctor}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                        <option key={doc.id} value={doc.name}>
                            {doc.name} ({doc.specialty})
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="reason"
                    placeholder="Reason"
                    value={form.reason}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                />
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Adding...' : 'Add Appointment'}
                </button>
            </form>
            
            {loading && (
                <div className="loading-message">
                    Loading appointments...
                </div>
            )}
            
            {!loading && appointments.length > 0 ? (
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Doctor</th>
                            <th>Reason</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt) => (
                            <tr key={appt.id}>
                                <td>{appt.date}</td>
                                <td>{appt.time}</td>
                                <td>{appt.doctor}</td>
                                <td>{appt.reason}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(appt.id)}
                                        className="delete-btn"
                                        disabled={loading}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : !loading && (
                <p className="no-appointments">No appointments scheduled. Add your first appointment above!</p>
            )}
        </div>
    );
}

export default Appointments;