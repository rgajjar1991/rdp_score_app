// lib/api.js
import axios from "axios";

console.log('ENV', process.env.NEXT_PUBLIC_API_URL);


const API = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;