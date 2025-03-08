
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ClientDetailView from '@/components/clients/ClientDetailView';
import { useParams } from 'react-router-dom';

const ClientDetail: React.FC = () => {
  const { clientId } = useParams();
  
  return (
    <MainLayout>
      <ClientDetailView clientId={clientId} />
    </MainLayout>
  );
};

export default ClientDetail;
