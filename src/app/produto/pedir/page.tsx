'use client';

import { useState, useEffect } from 'react'; // Importação dos hooks useState e useEffect do React para gerenciar estado e efeitos laterais
import axios from 'axios'; // Importação do Axios para realizar requisições HTTP
import Image from 'next/image'; // Importação do componente Image do Next.js para exibir imagens responsivas
import { useRouter } from 'next/navigation'; // Importação do hook useRouter do Next.js para gerenciar navegação

// Importando o CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do CSS do Bootstrap para estilização

interface ProdutoAttributes { // Interface que define os atributos de um produto
  Nome: string; // Nome do produto
  Descricao: string; // Descrição do produto
  preco: string; // Preço do produto em formato de string (para manter a compatibilidade)
  createdAt: string; // Data de criação do produto (formato string)
  updatedAt: string; // Data da última atualização do produto (formato string)
  publishedAt: string; // Data de publicação do produto (formato string)
}

interface Produto { // Interface que define a estrutura de um produto
  id: number; // Identificador numérico do produto
  attributes: ProdutoAttributes; // Atributos do produto definidos pela interface ProdutoAttributes
}

interface ProdutoResponse { // Interface que define a estrutura da resposta da API de produtos
  data: Produto; // Dados de um produto
}

export default function ContactFormPage() {
  const [Nome, setName] = useState(''); // Estado local para armazenar o nome digitado no formulário
  const [numeroTelemovel, setPhoneNumber] = useState(''); // Estado local para armazenar o número de telefone digitado no formulário
  const [instrucoesEspeciais, setSpecialInstructions] = useState(''); // Estado local para armazenar as instruções especiais digitadas no formulário
  const [message, setMessage] = useState(''); // Estado local para exibir mensagens de feedback ao usuário
  const [produto, setProduto] = useState<Produto | null>(null); // Estado local para armazenar o produto selecionado, inicialmente nulo
  const router = useRouter(); // Objeto router para gerenciar a navegação

  useEffect(() => {
    const produtoId = sessionStorage.getItem('produtoId'); // Obtém o ID do produto armazenado na sessionStorage

    if (produtoId) {
      const fetchProduto = async () => {
        try {
          const response = await axios.get<ProdutoResponse>(`http://localhost:1337/api/produtos/${produtoId}`); // Requisição GET para obter o produto com base no ID
          console.log('Produto:', response.data); // Exibe os dados do produto no console para depuração
          setProduto(response.data.data); // Atualiza o estado local com os dados do produto recebido da API
        } catch (error) {
          console.error('Erro ao buscar o produto:', error); // Log de erro caso ocorra um problema na requisição
        }
      };

      fetchProduto(); // Chama a função para buscar o produto apenas se houver um ID válido na sessionStorage
    } else {
      console.log('Nenhum ID de produto encontrado no session storage'); // Mensagem no console caso não haja ID de produto na sessionStorage
    }
  }, []); // Array vazio indica que este efeito é executado apenas uma vez, após a montagem inicial do componente

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Função para lidar com o envio do formulário
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário

    if (!produto) { // Verifica se o produto está definido
      setMessage('Produto não encontrado. Tente novamente.'); // Define mensagem de erro se o produto não estiver definido
      return; // Encerra a execução da função
    }

    try {
      const response = await axios.post('http://localhost:1337/api/pedidos', { // Requisição POST para enviar os dados do formulário
        data: {
          Nome, // Nome do cliente
          numeroTelemovel, // Número de telefone do cliente
          instrucoesEspeciais, // Instruções especiais fornecidas pelo cliente
          produtoId: produto.id, // ID do produto selecionado
          produto: produto.attributes, // Atributos do produto selecionado
        },
      });

      console.log('Formulário enviado:', response.data); // Exibe a resposta da API no console para depuração
      setMessage('Formulário enviado com sucesso!'); // Define mensagem de sucesso ao enviar o formulário
      alert('Formulário submetido com sucesso!'); // Exibe um alerta ao usuário informando que o formulário foi enviado com sucesso

      // Limpa os campos do formulário após o envio bem-sucedido
      setName(''); // Limpa o estado do nome
      setPhoneNumber(''); // Limpa o estado do número de telefone
      setSpecialInstructions(''); // Limpa o estado das instruções especiais

    } catch (error) {
      console.error('Erro ao enviar o formulário:', error); // Log de erro caso ocorra um problema ao enviar o formulário
      setMessage('Erro ao enviar o formulário. Tente novamente.'); // Define mensagem de erro ao enviar o formulário
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
      <main className="p-3 d-flex flex-column align-items-center"> {/* Conteúdo principal com padding interno e layout flexível em coluna */}
        <h1 className="text-white">Formulário de Contato</h1> {/* Título "Formulário de Contato" com texto branco */}
        <form onSubmit={handleSubmit} className="w-100 max-w-600 bg-dark p-3 rounded"> {/* Formulário com largura máxima de 600 pixels, fundo escuro e bordas arredondadas */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nome:</label> {/* Rótulo do campo "Nome" */}
            <input
              type="text"
              id="name"
              value={Nome}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            /> {/* Campo de entrada para o nome do cliente */}
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Número de Telefone:</label> {/* Rótulo do campo "Número de Telefone" */}
            <input
              type="tel"
              id="phoneNumber"
              value={numeroTelemovel}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="form-control"
            /> {/* Campo de entrada para o número de telefone do cliente */}
          </div>
          <div className="mb-3">
            <label htmlFor="specialInstructions" className="form-label">Instruções Especiais:</label> {/* Rótulo do campo "Instruções Especiais" */}
            <textarea
              id="specialInstructions"
              value={instrucoesEspeciais}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              required
              className="form-control"
              style={{ minHeight: '100px' }}
            ></textarea> {/* Campo de entrada para instruções especiais, área de texto expansível */}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Enviar
          </button> {/* Botão de envio do formulário estilizado com cor primária do Bootstrap */}
        </form>
        {message && <p className="mt-3 text-white">{message}</p>} {/* Exibe mensagem de feedback após o envio do formulário, se houver */}
      </main>
    </div>
  );
}
