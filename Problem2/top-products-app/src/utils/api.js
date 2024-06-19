import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', //Here Should be the API url but i dont have my client cridentials so i will leave it as it is.
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
