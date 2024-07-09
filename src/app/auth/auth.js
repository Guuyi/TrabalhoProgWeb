import axios from 'axios'; // Importação do Axios para fazer requisições HTTP
import { setCookie, destroyCookie, parseCookies } from 'nookies'; // Importação das funções de gerenciamento de cookies do pacote nookies

// Função para realizar o login do utilizador
export const loginUser = async (username, password) => {
  try {
    // Enviando requisição POST para o endpoint de autenticação local
    const response = await axios.post('http://localhost:1337/api/auth/local', {
      identifier: username, // Nome de utilizador ou email
      password: password, // Senha
    });

    // Armazenando o token JWT nos cookies após o login bem-sucedido
    setCookie(null, 'jwt', response.data.jwt, {
      maxAge: 30 * 24 * 60 * 60, // Tempo de vida do cookie: 30 dias
      path: '/', // Caminho onde o cookie é válido
    });

    return response.data.user; // Retornando os dados do utilizador autenticado
  } catch (error) {
    console.error('Erro de login:', error); // Registando o erro no console em caso de falha no login
    throw error; // Lançando o erro para ser tratado pelo código que chamou esta função
  }
};

// Função para fazer logout do utilizador
export const logoutUser = () => {
  destroyCookie(null, 'jwt', {
    path: '/', // Removendo o cookie 'jwt' ao fazer logout
  });

  // Opcionalmente, redirecionar o utilizador para a página de login
  window.location.href = '/login';
};

// Função para verificar se o utilizador está autenticado
export const isAuthenticated = () => {
  const cookies = parseCookies(); // Obtendo todos os cookies

  // Verificando se o cookie 'jwt' existe
  return !!cookies.jwt; // Retorna true se o cookie 'jwt' existir, caso contrário retorna false
};
