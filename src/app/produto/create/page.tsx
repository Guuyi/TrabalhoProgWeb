'use client';

import { useState } from 'react'; // Importação do hook useState do React
import axios from 'axios'; // Importação do Axios para fazer requisições HTTP
import AuthGuard from '@/app/componentes/AuthGuard'; // Importação do componente AuthGuard adequado ao seu projeto
import Image from 'next/image'; // Importação do componente Image do Next.js para imagens otimizadas

// Importando o CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CriarProdutoPage() {
  const [Nome, setNome] = useState(''); // Estado para armazenar o nome do produto
  const [Descricao, setDescricao] = useState(''); // Estado para armazenar a descrição do produto
  const [preco, setPreco] = useState(''); // Estado para armazenar o preço do produto
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir o comportamento padrão do formulário

    try {
      const response = await axios.post('http://localhost:1337/api/produtos', {
        data: {
          Nome,
          Descricao,
          preco,
        },
      });

      console.log('Produto criado:', response.data);
      // Limpar os campos após a criação do produto
      setNome('');
      setDescricao('');
      setPreco('');
    } catch (error) {
      console.error('Erro ao criar o produto:', error);
      setError('Erro ao criar o produto. Verifique suas credenciais ou tente novamente mais tarde.');
    }
  };

  return (
    <AuthGuard> {/* Envolver todo o conteúdo do componente com AuthGuard */}
      <div className="bg-dark text-white min-vh-100">
        <header className="d-flex justify-content-between align-items-center p-2 bg-dark text-white">
          <div className="d-flex align-items-center">
            <Image src="/imgs/logo.png" alt="Logo" width={100} height={100} />
            <span className="ms-2 fs-4">The Food Truck</span>
          </div>
          <nav>
            <ul className="d-flex list-unstyled gap-3 mb-0">
              <li><a href="/login/Paginadoutilizador" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/produto/pedidos" className="text-white text-decoration-none">Pedidos</a></li>
              <li><a href="/produto/create" className="text-white text-decoration-none">Adicionar ao Menu</a></li>
            </ul>
          </nav>
        </header>
        <main className="p-3 d-flex flex-column align-items-center bg-dark text-white">
          <h1 className="text-white mb-4">Criar Produto</h1>
          <form onSubmit={handleSubmit} className="w-100 max-w-600">
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome:</label>
              <input
                type="text"
                id="nome"
                value={Nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">Descrição:</label>
              <textarea
                id="descricao"
                value={Descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
                className="form-control"
                style={{ minHeight: '100px' }}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="preco" className="form-label">Preço:</label>
              <input
                type="number"
                id="preco"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Criar Produto</button>
          </form>
        </main>
      </div>
    </AuthGuard>
  );
}
