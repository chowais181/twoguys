import axios from 'axios'

const client = axios.create({
    baseURL: process.env.baseURL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

export default client;

