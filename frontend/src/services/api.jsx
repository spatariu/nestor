import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getPeople = () => api.get('/people');
export const getGroups = () => api.get('/groups');

