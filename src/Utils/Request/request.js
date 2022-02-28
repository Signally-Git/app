import axios from 'axios';
import { API } from 'config';

const request = axios.create({
    baseURL: API
});
if (localStorage.getItem('token'))
    request.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

request.interceptors.response.use((response) => {
    console.log(response)
    if (response.code === 401) {
        alert("You are not authorized");
    }
    return response;
}, (error) => {
    // if (error.response && error.response.data) {
        if (!localStorage.getItem('token') || error.response.data.code === 401) {
            axios.post(`${API}token/refresh`, { refresh_token: localStorage.getItem('refresh_token') }).then((res) => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('refresh_token', res.data.refresh_token)
                window.location.replace('/')
            }).catch((err) => {
                window.location.replace('/')
            })
        }
        
        return Promise.reject(error.response.data);
    // }
    // return Promise.reject(error.message);
});

export default request;