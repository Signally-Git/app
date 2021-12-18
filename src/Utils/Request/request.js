import axios from 'axios';
import { API } from 'config';

const request = axios.create({
    baseURL: API
});

request.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
// INTERCEPTORS
export default request;