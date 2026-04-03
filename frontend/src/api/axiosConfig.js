import axios from "axios";

// Use relative URL - this will work on both localhost and Render
const api = axios.create({
    baseURL: "",  // Empty string means use the same origin as the page
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;
            if (status === 401 || status === 403) {
                localStorage.removeItem("token");
                window.location.href = "/login?expired=true";
            }
        }
        return Promise.reject(error);
    }
);

export default api;


