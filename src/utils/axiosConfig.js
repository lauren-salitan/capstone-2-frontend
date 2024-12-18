// import axios from '../utils/axiosConfig';

// // Add a request interceptor
// axios.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// export default axios; 
const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://capstone-2-backend-jand.onrender.com/api',
});

export default instance;
