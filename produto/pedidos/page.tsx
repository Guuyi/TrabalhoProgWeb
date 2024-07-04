'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Produto {
  id: number;
  attributes: {
    Nome: string;
    Descricao: string;
    preco: string;
    imagemUrl: string;
    status?: string; // Adicionamos um campo status opcional
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export default function UserPage() {
  const router = useRouter();
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

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const confirmed = window.confirm('Tem certeza que deseja terminar a sessão?');
    if (confirmed) {
      router.push('/'); // Redireciona para a página inicial após logout
    }
  };

  const handleCancelItem = (id: number) => {
    setProdutos(produtos.map(item => item.id === id ? { ...item, attributes: { ...item.attributes, status: 'cancelled' } } : item));
  };

  const handleCompleteItem = (id: number) => {
    setProdutos(produtos.map(item => item.id === id ? { ...item, attributes: { ...item.attributes, status: 'completed' } } : item));
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
            <li><a href="/pedidos" style={{ color: '#fff', textDecoration: 'none' }}>Pedidos</a></li>
            <li><a href="/produto/create" style={{ color: '#fff', textDecoration: 'none' }}>Adicionar ao Menu</a></li>
            <li><a href="/" onClick={handleLogoutClick} style={{ color: '#fff', textDecoration: 'none' }}>Terminar Sessão</a></li>
          </ul>
        </nav>
      </header>
      <main style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}>
          <h2 style={{ color: '#fff' }}>Itens do Menu</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {produtos.map(item => (
                <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
                  <span style={{ textDecoration: item.attributes.status === 'cancelled' ? 'line-through' : 'none', color: '#fff' }}>
                    {item.attributes.Nome} ({item.attributes.status || 'pending'})
                  </span>
                  <div>
                    {item.attributes.status !== 'cancelled' && item.attributes.status !== 'completed' && (
                      <>
                        <button
                          onClick={() => handleCompleteItem(item.id)}
                          style={{
                            marginRight: '10px',
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            color: 'black'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'green';
                            e.currentTarget.style.color = 'black';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#fff';
                            e.currentTarget.style.color = 'black';
                          }}
                        >
                          Concluir
                        </button>
                        <button
                          onClick={() => handleCancelItem(item.id)}
                          style={{
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            color: 'black'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'red';
                            e.currentTarget.style.color = 'black';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#fff';
                            e.currentTarget.style.color = 'black';
                          }}
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
