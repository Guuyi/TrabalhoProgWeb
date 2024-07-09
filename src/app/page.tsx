import React from 'react';
import Image from 'next/image';

// Importação do CSS minificado do Bootstrap para aplicar estilos
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
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
        <section id="about" className="mb-4"> {/* Secção "Sobre" com margem inferior */}
          <h1 className="mb-3">Sobre</h1> {/* Título "Sobre" com margem inferior */}
          <p>
            Bem-vindo ao The Food Truck! Somos uma food truck apaixonada por trazer os melhores sabores diretamente para si. A nossa missão é oferecer comidas deliciosas e de alta qualidade com um serviço rápido e amigável. Seja para um almoço rápido, um lanche da tarde ou uma refeição descontraída, estamos aqui para satisfazer as suas necessidades gastronómicas.
          </p>
          <p>
            A nossa equipa é composta por chefs experientes que adoram criar pratos inovadores e saborosos. Utilizamos ingredientes frescos e de alta qualidade para garantir que cada refeição seja uma experiência incrível.
          </p>
          <p>
            Venha visitar-nos e experimente o melhor da comida de rua!
          </p>
          <div className="d-flex justify-content-center"> {/* Div para centralizar conteúdo */}
            <Image src="/imgs/foodtruck.jpg" alt="Food Truck" width={400} height={400} /> {/* Imagem do food truck */}
          </div>
        </section>
        <section id="hours" className="mb-4"> {/* Secção "Horário de Funcionamento" com margem inferior */}
          <h1 className="mb-3">Horário de Funcionamento</h1> {/* Título "Horário de Funcionamento" com margem inferior */}
          <table className="table table-dark table-striped"> {/* Tabela com estilos Bootstrap para fundo escuro e linhas alternadas */}
            <thead>
              <tr>
                <th scope="col">Dia</th> {/* Cabeçalho da coluna "Dia" */}
                <th scope="col">Horário</th> {/* Cabeçalho da coluna "Horário" */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Segunda-feira</td> {/* Conteúdo da primeira linha da tabela */}
                <td>10:00 - 20:00</td> {/* Conteúdo da segunda coluna da primeira linha */}
              </tr>
              <tr>
                <td>Terça-feira</td> {/* Conteúdo da segunda linha da tabela */}
                <td>10:00 - 20:00</td> {/* Conteúdo da segunda coluna da segunda linha */}
              </tr>
              <tr>
                <td>Quarta-feira</td> {/* Conteúdo da terceira linha da tabela */}
                <td>10:00 - 20:00</td> {/* Conteúdo da segunda coluna da terceira linha */}
              </tr>
              <tr>
                <td>Quinta-feira</td> {/* Conteúdo da quarta linha da tabela */}
                <td>10:00 - 20:00</td> {/* Conteúdo da segunda coluna da quarta linha */}
              </tr>
              <tr>
                <td>Sexta-feira</td> {/* Conteúdo da quinta linha da tabela */}
                <td>10:00 - 22:00</td> {/* Conteúdo da segunda coluna da quinta linha */}
              </tr>
              <tr>
                <td>Sábado</td> {/* Conteúdo da sexta linha da tabela */}
                <td>12:00 - 22:00</td> {/* Conteúdo da segunda coluna da sexta linha */}
              </tr>
              <tr>
                <td>Domingo</td> {/* Conteúdo da sétima linha da tabela */}
                <td>12:00 - 18:00</td> {/* Conteúdo da segunda coluna da sétima linha */}
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
