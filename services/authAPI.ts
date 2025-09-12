import axios from './api';

export const loginAPI = async (email: string, password: string) => {
  //console.log('calling loginAPI');
  const res = await axios.post('/auth/login', { email, password });
  return res.data; 
};

export const registerAPI = async (name: string, email: string, password: string) => {
  const res = await axios.post('/auth/register', { name, email, password });
  return res.data; 
};