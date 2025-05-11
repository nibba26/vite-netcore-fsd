import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true, // HttpOnly 쿠키 사용을 위해 필요
});

export default axiosInstance;