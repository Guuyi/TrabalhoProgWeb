'use client';

import { useState, useEffect } from 'react'; // Importação dos hooks useState e useEffect do React
import axios from 'axios'; // Importação do Axios para fazer requisições HTTP
import Image from 'next/image'; // Importação do componente Image do Next.js para imagens otimizadas
import nookies from 'nookies'; // Importação do pacote nookies para gerenciar cookies
import AuthGuard from '@/app/componentes/AuthGuard'; // Importação do componente AuthGuard adequado ao seu projeto

// Importando o CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

interface Pedido {
  attributes: {
    Nome: string;
    instrucoesEspeciais: string;
    numeroTelemovel: string;
    produtos: string;
  };
  completo: boolean;
  cancelado: boolean;
  id: number;
}

export default function UserPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]); // Estado para armazenar os pedidos
  const [loading, setLoading] = useState(true); // Estado para indicar se está carregando os dados

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        // Obtendo o token JWT dos cookies
        const cookies = nookies.get();
        const token = cookies.jwt;

        // Verificando se o token JWT existe nos cookies
        if (!token) {
          throw new Error('Token JWT não encontrado.');
        }

        // Configurando cabeçalhos da requisição com o token JWT
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Enviando requisição GET para obter pedidos
        const response = await axios.get<{ data: Pedido[] }>('http://localhost:1337/api/pedidos', config);

        if (response.data && response.data.data) {
          setPedidos(response.data.data);
        } else {
          console.error('Resposta da API não contém dados esperados:', response);
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os pedidos:', error);
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const handleCompletePedido = async (pedidoId: number) => {
    try {
      // Obtendo o token JWT dos cookies
      const cookies = nookies.get();
      const token = cookies.jwt;

      // Verificando se o token JWT existe nos cookies
      if (!token) {
        throw new Error('Token JWT não encontrado.');
      }

      // Configurando cabeçalhos da requisição com o token JWT
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Enviando requisição DELETE para marcar pedido como completo
      const response = await axios.delete(`http://localhost:1337/api/pedidos/${pedidoId}`, config);

      console.log('Pedido marcado como completo e apagado:', response.data);

      // Atualizando a lista de pedidos removendo o pedido marcado como completo
      const updatedPedidos = pedidos.filter(pedido => pedido.id !== pedidoId);
      setPedidos(updatedPedidos);
    } catch (error) {
      console.error('Erro ao marcar o pedido como completo e apagar:', error);
    }
  };

  const handleCancelPedido = async (pedidoId: number) => {
    try {
      // Obtendo o token JWT dos cookies
      const cookies = nookies.get();
      const token = cookies.jwt;

      // Verificando se o token JWT existe nos cookies
      if (!token) {
        throw new Error('Token JWT não encontrado.');
      }

      // Configurando cabeçalhos da requisição com o token JWT
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Enviando requisição DELETE para cancelar pedido
      const response = await axios.delete(`http://localhost:1337/api/pedidos/${pedidoId}`, config);

      console.log('Pedido cancelado e apagado:', response.data);

      // Atualizando a lista de pedidos removendo o pedido cancelado
      const updatedPedidos = pedidos.filter(pedido => pedido.id !== pedidoId);
      setPedidos(updatedPedidos);
    } catch (error) {
      console.error('Erro ao cancelar o pedido e apagar:', error);
    }
  };

  return (
    <AuthGuard> {/* Envolve todo o conteúdo do componente com AuthGuard */}
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
        <main className="p-3 d-flex flex-column align-items-center">
          <div className="w-100 mx-auto mt-4">
            <h2 className="text-white mb-4">Pedidos</h2>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {pedidos.map(pedido => (
                  <div key={pedido.id} className="col">
                    <div className="bg-dark text-white p-3 rounded shadow">
                      <p><strong>ID:</strong> {pedido.id}</p>
                      <p><strong>Nome:</strong> {pedido.attributes.Nome}</p>
                      <p><strong>Instruções Especiais:</strong> {pedido.attributes.instrucoesEspeciais}</p>
                      <p><strong>Número de Telemóvel:</strong> {pedido.attributes.numeroTelemovel}</p>
                      <p><strong>Produto:</strong> {pedido.attributes.produtos}</p>
                      {!pedido.completo && !pedido.cancelado && (
                        <div className="mt-2">
                          <button
                            onClick={() => handleCompletePedido(pedido.id)}
                            className="btn btn-success me-2"
                          >
                            Marcar como Completo
                          </button>
                          <button
                            onClick={() => handleCancelPedido(pedido.id)}
                            className="btn btn-danger"
                          >
                            Cancelar Pedido
                          </button>
                        </div>
                      )}
                      {pedido.completo && <p className="text-success">Pedido Completo</p>}
                      {pedido.cancelado && <p className="text-danger">Pedido Cancelado</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
