import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { appointmentsAPI } from '../services/api';

export function useAppointments() {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch appointments from backend when user is available
    const fetchAppointments = useCallback(async () => {
        if (!user) return;
        
        setLoading(true);
        setError(null);
        try {
            const response = await appointmentsAPI.getAppointments(user.id || user.email);
            setAppointments(response.data);
        } catch (err) {
            console.error('Error fetching appointments:', err);
            setError('Failed to fetch appointments from server');
            // Fallback to localStorage if API fails
            const userAppointments = localStorage.getItem(`appointments_${user.email || user.id}`);
            if (userAppointments) {
                setAppointments(JSON.parse(userAppointments));
            }
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchAppointments();
        } else {
            setAppointments([]);
        }
    }, [user, fetchAppointments]);

    const addAppointment = async (appointmentData) => {
        if (!user) return null;

        setLoading(true);
        setError(null);
        try {
            const appointmentPayload = {
                ...appointmentData,
                userId: user.id || user.email,
                createdAt: new Date().toISOString()
            };

            const response = await appointmentsAPI.createAppointment(appointmentPayload);

            // Update local state with the response from server
            const newAppointment = response.data;
            setAppointments(prev => [...prev, newAppointment]);
            
            // Also update localStorage as backup
            const updatedAppointments = [...appointments, newAppointment];
            localStorage.setItem(`appointments_${user.email || user.id}`, JSON.stringify(updatedAppointments));
            
            return newAppointment;
        } catch (err) {
            console.error('Error adding appointment:', err);
            setError('Failed to add appointment to server');
            
            // Fallback to localStorage if API fails
            const newAppointment = {
                id: Date.now(),
                ...appointmentData,
                userId: user.email || user.id,
                createdAt: new Date().toISOString(),
            };
            
            const updatedAppointments = [...appointments, newAppointment];
            setAppointments(updatedAppointments);
            localStorage.setItem(`appointments_${user.email || user.id}`, JSON.stringify(updatedAppointments));
            
            return newAppointment;
        } finally {
            setLoading(false);
        }
    };

    const deleteAppointment = async (appointmentId) => {
        if (!user) return;

        setLoading(true);
        setError(null);
        try {
            await appointmentsAPI.deleteAppointment(appointmentId);

            // Update local state
            const updatedAppointments = appointments.filter(appt => appt.id !== appointmentId);
            setAppointments(updatedAppointments);
            
            // Update localStorage as backup
            localStorage.setItem(`appointments_${user.email || user.id}`, JSON.stringify(updatedAppointments));
        } catch (err) {
            console.error('Error deleting appointment:', err);
            setError('Failed to delete appointment from server');
            
            // Fallback to localStorage if API fails
            const updatedAppointments = appointments.filter(appt => appt.id !== appointmentId);
            setAppointments(updatedAppointments);
            localStorage.setItem(`appointments_${user.email || user.id}`, JSON.stringify(updatedAppointments));
        } finally {
            setLoading(false);
        }
    };

    const getUpcomingAppointments = (days = 7) => {
        const today = new Date();
        const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
        
        return appointments.filter(appt => {
            const apptDate = new Date(appt.date);
            return apptDate >= today && apptDate <= futureDate;
        }).sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    return {
        appointments,
        addAppointment,
        deleteAppointment,
        getUpcomingAppointments,
        fetchAppointments,
        loading,
        error
    };
}
