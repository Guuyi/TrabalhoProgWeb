'use client';

import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CriarProdutoPage() {
  const [Nome, setNome] = useState('');
  const [Descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const router = useRouter();

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const confirmed = window.confirm('Tem certeza que deseja terminar a sessão?');
    if (confirmed) {
      router.push('/'); // Redireciona para a página inicial após logout
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#333', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/imgs/logo.png" alt="Logo" width={100} height={100} />
          <span style={{ marginLeft: '10px', fontSize: '24px' }}>The Food Truck</span>
        </div>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', padding: '10px', justifyContent: 'flex-end' }}>
            <li><a href="/login/Paginadoutilizador" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
            <li><a href="/produto/pedidos" style={{ color: '#fff', textDecoration: 'none' }}>Pedidos</a></li>
            <li><a href="/produto/create" style={{ color: '#fff', textDecoration: 'none' }}>Adicionar ao Menu</a></li>
            <li><a href="/" onClick={handleLogoutClick} style={{ color: '#fff', textDecoration: 'none' }}>Terminar Sessão</a></li>
          </ul>
        </nav>
      </header>
      <main style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ marginBottom: '20px', color: '#fff' }}>Criar Produto</h1>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px', backgroundColor: '#333', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="nome" style={{ display: 'block', marginBottom: '5px', color: '#fff' }}>Nome:</label>
            <input
              type="text"
              id="nome"
              value={Nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#000' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="descricao" style={{ display: 'block', marginBottom: '5px', color: '#fff' }}>Descrição:</label>
            <textarea
              id="descricao"
              value={Descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#000' }}
            ></textarea>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="preco" style={{ display: 'block', marginBottom: '5px', color: '#fff' }}>Preço:</label>
            <input
              type="number"
              id="preco"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#000' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#000', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>
            Criar Produto
          </button>
        </form>
      </main>
    </div>
  );
}
