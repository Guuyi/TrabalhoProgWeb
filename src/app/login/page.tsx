'use client';

import { useState } from 'react'; // Importação do hook useState do React para gerenciar estado local
import { useRouter } from 'next/navigation'; // Importação do useRouter do Next.js para navegação programática
import { loginUser } from '../auth/auth.js'; // Importação da função de autenticação loginUser do módulo auth.js
import Image from 'next/image'; // Importação do componente Image do Next.js para exibição de imagens responsivas

// CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginPage() {
  const [username, setUsername] = useState(''); // Estado local para armazenar o nome de usuário
  const [password, setPassword] = useState(''); // Estado local para armazenar a senha
  const [error, setError] = useState(''); // Estado local para armazenar mensagens de erro
  const router = useRouter(); // Instância do useRouter para gerenciar rotas de navegação

  // Função assíncrona para lidar com o envio do formulário de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      await loginUser(username, password); // Chama a função de login com as credenciais fornecidas
      router.push('/login/Paginadoutilizador'); // Redireciona para a página do utilizador após o login bem sucedido
    } catch (error) {
      setError('Erro de login. Verifique suas credenciais.'); // Define uma mensagem de erro caso o login falhe
    }
  };

  return (
    <div className="bg-dark text-white min-vh-100"> {/* Div principal com fundo escuro e texto branco, ocupando pelo menos toda a altura da tela */}
      <header className="d-flex justify-content-between align-items-center p-2 bg-dark text-white"> {/* Cabeçalho com layout flexível, fundo escuro e texto branco, espaçamento interno */}
        <div className="d-flex align-items-center"> {/* Container flexível para logo e texto */}
          <Image src="/imgs/logo.png" alt="Logo" width={100} height={100} /> {/* Imagem do logo */}
          <span className="ms-2 fs-4">The Food Truck</span> {/* Texto ao lado do logo com margem à esquerda e tamanho de fonte */}
        </div>
        <nav>
          <ul className="d-flex list-unstyled gap-3 mb-0"> {/* Lista de navegação com layout flexível, sem estilos de lista, espaçamento entre itens e margem inferior zero */}
            <li><a href="/" className="text-white text-decoration-none">Home</a></li> {/* Item de menu "Home" com texto branco e sem decoração de link */}
            <li><a href="/produto" className="text-white text-decoration-none">Menu</a></li> {/* Item de menu "Menu" com texto branco e sem decoração de link */}
            <li><a href="/login" className="text-white text-decoration-none">Login</a></li> {/* Item de menu "Login" com texto branco e sem decoração de link */}
          </ul>
        </nav>
      </header>
      <main className="p-3"> {/* Conteúdo principal com padding interno */}
        <div className="max-w-400 mx-auto"> {/* Div com largura máxima de 400px e centralizada horizontalmente */}
          <h1 className="text-white mb-4">Login</h1> {/* Título "Login" com texto branco e margem inferior */}
          {error && <p className="text-danger">{error}</p>} {/* Exibe mensagem de erro se existir */}
          <form onSubmit={handleSubmit} className="bg-dark p-3 rounded shadow-sm"> {/* Formulário com fundo escuro, padding, bordas arredondadas e sombra */}
            <div className="mb-3"> {/* Div com margem inferior */}
              <label htmlFor="username" className="form-label mb-1 text-white">Usuário:</label> {/* Label para campo de usuário com texto branco e margem inferior */}
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control" // Campo de input estilizado do Bootstrap
              />
            </div>
            <div className="mb-3"> {/* Div com margem inferior */}
              <label htmlFor="password" className="form-label mb-1 text-white">Senha:</label> {/* Label para campo de senha com texto branco e margem inferior */}
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control" // Campo de input estilizado do Bootstrap
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block"> {/* Botão de submit estilizado do Bootstrap */}
              Entrar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
