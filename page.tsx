import React from 'react';
import Image from 'next/image';

export default function App() {
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
      <main style={{ padding: '20px', color: '#fff' }}>
        <section id="about" style={{ marginBottom: '40px' }}>
          <h1 style={{ color: '#fff' }}>Sobre</h1>
          <p>Bem-vindo ao The Food Truck! Somos uma food truck apaixonada por trazer os melhores sabores diretamente para você. Nossa missão é oferecer comidas deliciosas e de alta qualidade com um serviço rápido e amigável. Seja para um almoço rápido, um lanche da tarde ou uma refeição descontraída, estamos aqui para atender suas necessidades gastronômicas.</p>
          <p>A nossa equipa é composta por chefs experientes que adoram criar pratos inovadores e saborosos. Utilizamos ingredientes frescos e de alta qualidade para garantir que cada refeição seja uma experiência incrível.</p>
          <p>Venha nos visitar e experimente o melhor da comida de rua!</p>
        </section>
        <section id="hours" style={{ marginBottom: '40px' }}>
          <h1 style={{ color: '#fff' }}>Horário de Funcionamento</h1>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>Dia</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>Horário</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>Segunda-feira</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>10:00 - 20:00</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>Terça-feira</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>10:00 - 20:00</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>Quarta-feira</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>10:00 - 20:00</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>Quinta-feira</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>10:00 - 20:00</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>Sexta-feira</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>10:00 - 22:00</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>Sábado</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>12:00 - 22:00</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>Domingo</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: '#fff' }}>12:00 - 18:00</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
