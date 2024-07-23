import axios from 'axios';
import { BACKEND_URL } from '../config/serverConfig';

export const apiClient = axios.create({
    baseURL: BACKEND_URL,
})
