'use client';

import { useEffect, useState } from 'react'; // Importação dos hooks useEffect e useState do React para gerenciar estado e efeitos laterais
import axios from 'axios'; // Importação do Axios para realizar requisições HTTP
import React from 'react'; // Importação do React para utilização de componentes e JSX
import Image from 'next/image'; // Importação do componente Image do Next.js para exibir imagens responsivas

// Importando o CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do CSS do Bootstrap para estilização

interface Produto { // Interface que define a estrutura de um produto
  id: number; // Identificador numérico do produto
  attributes: { // Atributos do produto
    Nome: string; // Nome do produto
    Descricao: string; // Descrição do produto
    preco: string; // Preço do produto em formato de string (para manter a compatibilidade)
    createdAt: string; // Data de criação do produto (formato string)
    updatedAt: string; // Data da última atualização do produto (formato string)
    publishedAt: string; // Data de publicação do produto (formato string)
  };
}

export default function ProdutoPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]); // Estado local para armazenar a lista de produtos
  const [loading, setLoading] = useState(true); // Estado local para controlar o estado de carregamento

  useEffect(() => { // Efeito colateral para buscar os produtos quando o componente é montado
    const fetchProdutos = async () => { // Função assíncrona para buscar os produtos da API
      try {
        const response = await axios.get<{ data: Produto[] }>('http://localhost:1337/api/produtos'); // Requisição GET para obter os produtos da API
        if (response.data && response.data.data) { // Verifica se a resposta da API contém os dados esperados
          setProdutos(response.data.data); // Atualiza o estado local com os produtos recebidos
        } else {
          console.error('Resposta da API não contém dados esperados:', response); // Log de erro se a resposta da API não contiver os dados esperados
        }
        setLoading(false); // Marca o estado de carregamento como falso após obter os produtos
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error); // Log de erro caso ocorra um problema na requisição
        setLoading(false); // Marca o estado de carregamento como falso em caso de erro
      }
    };

    fetchProdutos(); // Chama a função para buscar os produtos ao montar o componente
  }, []); // Array vazio indica que este efeito é executado apenas uma vez, após a montagem inicial do componente

  const handlePedirClick = (id: number) => { // Função para lidar com o clique no botão "Pedir"
    sessionStorage.setItem('produtoId', id.toString()); // Armazena o ID do produto na sessionStorage para uso posterior
    window.location.href = `/produto/pedir`; // Redireciona o usuário para a página de pedido do produto
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
      <main className="p-3 d-flex flex-column align-items-center"> {/* Conteúdo principal com padding interno e layout flexível em coluna */}
        <h1 className="text-white">Lista de Produtos</h1> {/* Título "Lista de Produtos" com texto branco */}
        {loading ? ( // Condicional para renderizar mensagem de carregamento ou lista de produtos
          <p>Carregando...</p> // Exibe "Carregando..." enquanto os produtos estão sendo carregados
        ) : (
          <div className="d-flex flex-wrap justify-content-center gap-3"> {/* Container flexível para exibir os produtos em linha, com espaçamento entre eles */}
            {Array.isArray(produtos) && produtos.length > 0 ? ( // Verifica se existe uma lista válida de produtos para renderizar
              produtos.map((produto) => ( // Mapeia cada produto para renderização individual
                <div key={produto.id} className="card bg-dark text-white p-3 rounded" style={{ flex: '1 1 calc(33.333% - 20px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <h2>Nome: {produto.attributes.Nome}</h2> {/* Título do produto exibindo o nome */}
                  <p>Descrição: {produto.attributes.Descricao}</p> {/* Descrição do produto */}
                  <p>Preço: {produto.attributes.preco} EUR</p> {/* Preço do produto */}
                  <button 
                    onClick={() => handlePedirClick(produto.id)} // Ao clicar no botão "Pedir", chama a função handlePedirClick com o ID do produto
                    className="btn btn-primary" // Botão estilizado do Bootstrap com cor primária
                  >
                    Pedir {/* Texto no botão "Pedir" */}
                  </button>
                </div>
              ))
            ) : (
              <p>Nenhum produto encontrado.</p> // Caso não haja produtos para exibir, mostra esta mensagem
            )}
          </div>
        )}
      </main>
    </div>
  );
}
