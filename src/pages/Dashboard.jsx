import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAppointments } from '../hooks/useAppointments';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const { getUpcomingAppointments } = useAppointments();
    const upcomingAppointments = getUpcomingAppointments(7).slice(0, 3);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">
                Welcome to CareSync Dashboard{user ? `, ${user.name || user.email}` : ''}
            </h1>
            <div className="dashboard-cards">
                <div className="card">
                    <h2>Upcoming Appointments</h2>
                    {upcomingAppointments.length > 0 ? (
                        <>
                            <p>You have {upcomingAppointments.length} appointment(s) scheduled this week.</p>
                            <ul>
                                {upcomingAppointments.map(appt => (
                                    <li key={appt.id}>
                                        {appt.doctor} - {appt.date}, {appt.time} ({appt.reason})
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>No upcoming appointments scheduled.</p>
                    )}
                </div>
                <div className="card">
                    <h2>Recent Prescriptions</h2>
                    <p>2 new prescriptions have been added.</p>
                    <ul>
                        <li>Amoxicillin - 7/8/2024</li>
                        <li>Ibuprofen - 7/9/2024</li>
                    </ul>
                </div>
                <div className="card">
                    <h2>Profile Overview</h2>
                    {user ? (
                        <>
                            <p>Name: {user.name || 'Not provided'}</p>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone || 'Not provided'}</p>
                        </>
                    ) : (
                        <>
                            <p>Name: John Doe</p>
                            <p>Email: john.doe@example.com</p>
                            <p>Phone: +1 234 567 8901</p>
                        </>
                    )}
                                    </div>
                                </div>
                                <div className="dashboard-notifications">
                                    <h2>Notifications</h2>
                                    <ul>
                                        <li>Your appointment with Dr. Smith is tomorrow at 10:00 AM.</li>
                                        <li>New prescription added: Amoxicillin.</li>
                                        <li>Profile updated successfully.</li>
                                    </ul>
                                </div>
                                {/*<div className="dashboard-quicklinks">*/}
                                {/*    <h2>Quick Links</h2>*/}
                                {/*    <div className="quicklinks-list">*/}
                                {/*        <a href="#" className="quicklink">Book Appointment</a>*/}
                                {/*        <a href="#" className="quicklink">View Prescriptions</a>*/}
                                {/*        <a href="#" className="quicklink">Edit Profile</a>*/}
                                {/*        <a href="#" className="quicklink">Contact Support</a>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        );
                    };

                    export default Dashboard;