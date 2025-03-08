
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden flex w-full">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <main 
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out overflow-auto",
          isSidebarCollapsed ? "ml-[60px]" : "ml-[240px]",
          isMobile && isSidebarCollapsed ? "ml-[60px]" : isMobile ? "ml-0" : ""
        )}
      >
        <div className="container mx-auto p-6 max-w-6xl animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
