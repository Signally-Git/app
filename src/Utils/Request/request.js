import axios from 'axios';
import { API } from 'config';

const request = axios.create({
    baseURL: API
});

request.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
// request.defaults.headers.common['Content-Type'] = 'application/merge-patch+json';
// INTERCEPTORS
export default request;