import React, { useState } from 'react';
import doctors from '../data/doctors.json';
import './Appointments.css';

function Appointments() {
    const [appointments, setAppointments] = useState([
        { id: 1, date: '2024-06-10', time: '10:00', doctor: 'Dr. Chaman Lal', reason: 'Checkup' },
        { id: 2, date: '2024-06-12', time: '14:00', doctor: 'Dr. Anjali Mehra', reason: 'Consultation' },
    ]);
    const [form, setForm] = useState({
        date: '',
        time: '',
        doctor: '',
        reason: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.date && form.time && form.doctor && form.reason) {
            setAppointments([
                ...appointments,
                {
                    id: appointments.length + 1,
                    ...form,
                },
            ]);
            setForm({ date: '', time: '', doctor: '', reason: '' });
        }
    };

    return (
        <div className="appointments-container">
            <h1>Appointments</h1>
            <form onSubmit={handleSubmit} className="appointments-form">
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                />
                <select
                    name="doctor"
                    value={form.doctor}
                    onChange={handleChange}
                    required
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
                />
                <button type="submit">Add Appointment</button>
            </form>
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Doctor</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appt) => (
                        <tr key={appt.id}>
                            <td>{appt.date}</td>
                            <td>{appt.time}</td>
                            <td>{appt.doctor}</td>
                            <td>{appt.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Appointments;