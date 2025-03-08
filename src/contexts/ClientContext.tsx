
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Client } from '@/lib/types';

interface ClientContextType {
  clients: Client[];
  addClient: (email: string) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);

  // Cargar clientes guardados al iniciar
  useEffect(() => {
    const savedClients = localStorage.getItem('clients');
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
  }, []);

  // Guardar clientes en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  const addClient = (email: string) => {
    if (!email) return;
    
    const newClient = {
      id: Date.now().toString(),
      name: email.split('@')[0], // Usar la parte del email antes del @ como nombre
      email: email
    };
    
    setClients(prev => [...prev, newClient]);
  };

  return (
    <ClientContext.Provider value={{ clients, addClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
};
