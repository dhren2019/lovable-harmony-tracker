
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardView from '@/components/dashboard/DashboardView';

const Index: React.FC = () => {
  return (
    <MainLayout>
      <DashboardView />
    </MainLayout>
  );
};

export default Index;
