'use client';

import { useState } from 'react';
import React from 'react';
import axios from 'axios';

export default function ContactFormPage() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:1337/api/', {
        data: {
          name,
          phoneNumber,
          specialInstructions,
        },
      });

      console.log('Formulário enviado:', response.data);
      setMessage('Formulário enviado com sucesso!');
      alert('Formulário submetido com sucesso!');
      // Limpar os campos após o envio bem-sucedido
      setName('');
      setPhoneNumber('');
      setSpecialInstructions('');
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      setMessage('Erro ao enviar o formulário. Tente novamente.');
    }
  };

  return (
    <div>
      <header>
        <nav>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', padding: '10px', justifyContent: 'flex-end' }}>
            <li><a href="/">Home</a></li>
            <li><a href="/produto">Menu</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </header>
      <main style={{ padding: '20px' }}>
        <h1>Formulário de Contato</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Número de Telefone:</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="specialInstructions">Instruções Especiais:</label>
            <textarea
              id="specialInstructions"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Enviar
          </button>
        </form>
        {message && <p>{message}</p>}
      </main>
    </div>
  );
}
