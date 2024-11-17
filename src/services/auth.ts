import api from './api';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response;
    localStorage.setItem('token', token);
    return user;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};