'use client';
import { useState, useEffect } from 'react'; // Importação dos hooks useState e useEffect do React
import axios from 'axios'; // Importação do Axios para fazer requisições HTTP
import React from 'react'; // Importação do React
import Image from 'next/image'; // Importação do componente Image do Next.js para imagens otimizadas
import { useRouter } from 'next/navigation'; // Importação do hook useRouter do Next.js para gerenciar navegação
import nookies from 'nookies'; // Importação do pacote nookies para gerenciar cookies
import AuthGuard from '@/app/componentes/AuthGuard'; // Importação do componente AuthGuard para proteção de rotas

import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do CSS do Bootstrap

interface Produto { // Interface que define a estrutura de um produto
  id: number; // ID do produto (número inteiro)
  attributes: { // Atributos do produto
    Nome: string; // Nome do produto (string)
    Descricao: string; // Descrição do produto (string)
    preco: string; // Preço do produto (string)
    imagemUrl: string; // URL da imagem do produto (string)
    status?: string; // Status opcional do produto (string)
    createdAt: string; // Data de criação do produto (string)
    updatedAt: string; // Data de atualização do produto (string)
    publishedAt: string; // Data de publicação do produto (string)
  };
}

export default function UserPage() {
  const router = useRouter(); // Objeto router para gerenciar a navegação
  const [produtos, setProdutos] = useState<Produto[]>([]); // Estado para armazenar a lista de produtos
  const [loading, setLoading] = useState(true); // Estado para controlar o estado de carregamento da página
  const [editMode, setEditMode] = useState<number | null>(null); // Estado para armazenar o ID do produto em modo de edição
  const [editedProduct, setEditedProduct] = useState<Partial<Produto['attributes']>>({}); // Estado para armazenar os atributos do produto em edição

  useEffect(() => {
    const fetchProdutos = async () => {
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

        // Enviando requisição GET para obter produtos
        const response = await axios.get<{ data: Produto[] }>('http://localhost:1337/api/produtos', config);

        if (response.data && response.data.data) {
          setProdutos(response.data.data);
        } else {
          console.error('Resposta da API não contém dados esperados:', response);
        }
        setLoading(false); // Desativando o estado de carregamento após obter os produtos
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
        setLoading(false); // Desativando o estado de carregamento em caso de erro
      }
    };

    fetchProdutos(); // Chamada da função para buscar os produtos ao montar o componente
  }, []);

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const confirmed = window.confirm('Tem certeza que deseja terminar a sessão?');
    if (confirmed) {
      // Apagar o JWT armazenado nos cookies
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

      router.push('/'); // Redireciona para a página inicial após o logout
    }
  };

  const handleEditItem = (id: number) => {
    setEditMode(id); // Define o ID do produto em modo de edição
    const productToEdit = produtos.find(item => item.id === id); // Encontra o produto a ser editado pelo ID
    if (productToEdit) {
      setEditedProduct(productToEdit.attributes); // Define os atributos do produto em edição
    }
  };

  const handleSaveEdit = async (id: number) => {
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

      // Enviando requisição PUT para atualizar o produto
      const response = await axios.put(`http://localhost:1337/api/produtos/${id}`, { data: editedProduct }, config);
      if (response.data) {
        // Atualizando o estado dos produtos após a edição
        setProdutos(produtos.map(item => item.id === id ? { ...item, attributes: response.data.data.attributes } : item));
        setEditMode(null); // Saindo do modo de edição
        setEditedProduct({}); // Limpando os dados do produto em edição
      } else {
        console.error('Erro ao atualizar o produto:', response);
      }
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error);
    }
  };

  const handleDeleteItem = async (id: number) => {
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

      // Enviando requisição DELETE para deletar o produto
      const response = await axios.delete(`http://localhost:1337/api/produtos/${id}`, config);
      if (response.status === 200) {
        // Atualizando o estado dos produtos após a exclusão
        setProdutos(produtos.filter(item => item.id !== id));
      } else {
        console.error('Erro ao deletar o produto:', response);
      }
    } catch (error) {
      console.error('Erro ao deletar o produto:', error);
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
              <li><a href="/" onClick={handleLogoutClick} className="text-white text-decoration-none">Terminar Sessão</a></li>
            </ul>
          </nav>
        </header>
        <main className="p-3 d-flex flex-column align-items-center">
          <div className="w-100 mx-auto mt-4">
            <h2 className="text-white mb-4">Itens do Menu</h2>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <ul className="list-unstyled">
                {produtos.map(item => (
                  <li key={item.id} className="d-flex justify-content-between align-items-center p-2 border-bottom">
                    {editMode === item.id ? (
                      <div className="d-flex flex-column flex-grow-1 me-2">
                        <input
                          type="text"
                          value={editedProduct.Nome || ''}
                          onChange={(e) => setEditedProduct({ ...editedProduct, Nome: e.target.value })}
                          placeholder="Nome"
                          className="form-control mb-2"
                        />
                        <input
                          type="text"
                          value={editedProduct.Descricao || ''}
                          onChange={(e) => setEditedProduct({ ...editedProduct, Descricao: e.target.value })}
                          placeholder="Descrição"
                          className="form-control mb-2"
                        />
                        <input
                          type="text"
                          value={editedProduct.preco || ''}
                          onChange={(e) => setEditedProduct({ ...editedProduct, preco: e.target.value })}
                          placeholder="Preço"
                          className="form-control mb-2"
                        />
                        <button onClick={() => handleSaveEdit(item.id)} className="btn btn-success me-2">Salvar</button>
                        <button onClick={() => setEditMode(null)} className="btn btn-danger">Cancelar</button>
                      </div>
                    ) : (
                      <>
                        <span className={`text-white ${item.attributes.status === 'cancelled' ? 'text-decoration-line-through' : ''}`}>
                          {item.attributes.Nome} {item.attributes.status && `(${item.attributes.status})`}
                        </span>
                        <div>
                          <button
                            onClick={() => handleEditItem(item.id)}
                            className="btn btn-primary me-2"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="btn btn-danger"
                          >
                            Apagar
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
