import axios from 'axios';
import { API } from 'config';

const request = axios.create({
    baseURL: API
});
if (localStorage.getItem('token'))
    request.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

axios.interceptors.response.use((response) => {
    if (response.status === 401) {
        alert("You are not authorized");
    }
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});
// request.defaults.headers.common['Content-Type'] = 'application/merge-patch+json';
// INTERCEPTORS
export default request;