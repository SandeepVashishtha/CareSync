import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('loggedInUser');
        if (token) {
            const parsedToken = JSON.parse(token);
            config.headers.Authorization = `Bearer ${parsedToken?.token || ''}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('loggedInUser');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Appointments API
export const appointmentsAPI = {
    // Get all appointments for a user
    getAppointments: (userId) => {
        return apiClient.get('/appointments', {
            params: { userId }
        });
    },

    // Create a new appointment
    createAppointment: (appointmentData) => {
        return apiClient.post('/appointments', appointmentData);
    },

    // Delete an appointment
    deleteAppointment: (appointmentId) => {
        return apiClient.delete(`/appointments/${appointmentId}`);
    },

    // Update an appointment (for future use)
    updateAppointment: (appointmentId, appointmentData) => {
        return apiClient.put(`/appointments/${appointmentId}`, appointmentData);
    },
};

// Auth API
export const authAPI = {
    login: (credentials) => {
        return apiClient.post('/auth/login', credentials);
    },

    register: (userData) => {
        return apiClient.post('/auth/signup', userData);
    },

    logout: () => {
        return apiClient.post('/auth/logout');
    },
};

// Prescriptions API (for future use)
export const prescriptionsAPI = {
    getPrescriptions: (userId) => {
        return apiClient.get('/prescriptions', {
            params: { userId }
        });
    },

    createPrescription: (prescriptionData) => {
        return apiClient.post('/prescriptions', prescriptionData);
    },
};

export default apiClient;
