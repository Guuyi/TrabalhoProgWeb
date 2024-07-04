'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import Image from 'next/image';

interface Produto {
  id: number;
  attributes: {
    Nome: string;
    Descricao: string;
    preco: string;
    imagemUrl: string; // Assumindo que a URL da imagem é fornecida aqui
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export default function ProdutoPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get<{ data: Produto[] }>('http://localhost:1337/api/produtos');
        if (response.data && response.data.data) {
          setProdutos(response.data.data);
        } else {
          console.error('Resposta da API não contém dados esperados:', response);
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const handlePedirClick = (id: number) => {
    window.location.href = `/produto/pedir`;
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
            <li><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
            <li><a href="/produto" style={{ color: '#fff', textDecoration: 'none' }}>Menu</a></li>
            <li><a href="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</a></li>
          </ul>
        </nav>
      </header>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <h1 style={{ color: '#fff' }}>Lista de Produtos</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {Array.isArray(produtos) && produtos.length > 0 ? (
              produtos.map((produto) => (
                <div key={produto.id} style={{
                  flex: '1 1 calc(33.333% - 20px)',
                  boxSizing: 'border-box',
                  backgroundColor: '#333',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  color: 'white'
                }}>
                  <h2>Nome: {produto.attributes.Nome}</h2>
                  <p>Descrição: {produto.attributes.Descricao}</p>
                  <p>Preço: {produto.attributes.preco} EUR</p>
                  <button 
                    onClick={() => handlePedirClick(produto.id)}
                    style={{
                      marginTop: '10px',
                      padding: '10px 20px',
                      backgroundColor: '#0070f3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Pedir
                  </button>
                </div>
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
