'use client';

import { useState } from 'react';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function UserPage() {
  const router = useRouter();

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const confirmed = window.confirm('Tem certeza que deseja terminar a sessão?');
    if (confirmed) {
      router.push('/'); // Redireciona para a página inicial após logout
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
        <h1 style={{ marginBottom: '20px', color: '#fff' }}>Bem vindo à página do utilizador</h1>
        <div style={{ textAlign: 'center', maxWidth: '600px', marginTop: '20px', backgroundColor: '#333', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <p>Aqui você pode gerenciar seus pedidos e adicionar novos produtos ao menu. Use as opções de navegação acima para acessar diferentes funcionalidades.</p>
        </div>
      </main>
    </div>
  );
}
