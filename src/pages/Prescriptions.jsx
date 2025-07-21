import React, { useState } from 'react';
import './Prescriptions.css';

function Prescriptions() {
    const [prescriptions, setPrescriptions] = useState([
        { id: 1, date: '2024-06-10', patient: 'Amit Kumar', medicine: 'Paracetamol', dosage: '500mg', instructions: 'Twice daily after meals' },
        { id: 2, date: '2024-06-12', patient: 'Neha Sharma', medicine: 'Amoxicillin', dosage: '250mg', instructions: 'Three times daily' },
    ]);
    const [form, setForm] = useState({
        date: '',
        patient: '',
        medicine: '',
        dosage: '',
        instructions: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.date && form.patient && form.medicine && form.dosage && form.instructions) {
            setPrescriptions([
                ...prescriptions,
                {
                    id: prescriptions.length + 1,
                    ...form,
                },
            ]);
            setForm({ date: '', patient: '', medicine: '', dosage: '', instructions: '' });
        }
    };

    return (
        <div className="prescriptions-container">
            <h1>Prescriptions</h1>
            <form onSubmit={handleSubmit} className="prescriptions-form">
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="patient"
                    placeholder="Patient Name"
                    value={form.patient}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="medicine"
                    placeholder="Medicine"
                    value={form.medicine}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="dosage"
                    placeholder="Dosage"
                    value={form.dosage}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="instructions"
                    placeholder="Instructions"
                    value={form.instructions}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Prescription</button>
            </form>
            <table className="prescriptions-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Patient</th>
                        <th>Medicine</th>
                        <th>Dosage</th>
                        <th>Instructions</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.map((presc) => (
                        <tr key={presc.id}>
                            <td>{presc.date}</td>
                            <td>{presc.patient}</td>
                            <td>{presc.medicine}</td>
                            <td>{presc.dosage}</td>
                            <td>{presc.instructions}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Prescriptions;