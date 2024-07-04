import axios from 'axios';
import { setCookie, destroyCookie, parseCookies } from 'nookies';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:1337/api/auth/local', {
      identifier: username,
      password: password,
    });
    setCookie(null, 'jwt', response.data.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    return response.data.user;
  } catch (error) {
    console.error('Erro de login:', error);
    throw error;
  }
};

export const logoutUser = () => {
  destroyCookie(null, 'jwt', {
    path: '/',
  });
  // Optionally, redirect the user to the login page
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  const cookies = parseCookies();
  return !!cookies.jwt;
};
