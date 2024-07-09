'use client';
import { useEffect } from 'react'; // Importação do hook useEffect do React para efeitos laterais
import { useRouter } from 'next/navigation'; // Importação do hook useRouter do Next.js para gerenciar navegação
import { isAuthenticated } from '../auth/auth'; // Importação da função isAuthenticated do módulo de autenticação

type AuthGuardProps = {
  children: React.ReactNode; // Tipo das propriedades do componente AuthGuard, que inclui children como ReactNode
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter(); // Objeto router para gerenciar a navegação

  useEffect(() => {
    if (!isAuthenticated()) { // Verifica se o usuário não está autenticado
      router.push('/login'); // Redireciona o usuário para a página de login se não estiver autenticado
    }
  }, []); // Array vazio indica que este efeito é executado apenas uma vez, após a montagem inicial do componente

  return <>{children}</>; // Retorna os componentes filhos (children) que estão dentro do componente AuthGuard
}
