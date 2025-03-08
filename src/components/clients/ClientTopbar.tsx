
import React from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface TopbarOption {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface ClientTopbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  options: TopbarOption[];
}

const ClientTopbar: React.FC<ClientTopbarProps> = ({ 
  activeTab, 
  onTabChange,
  options
}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <nav className="flex items-center">
        {options.map((option, index) => (
          <React.Fragment key={option.id}>
            <button
              className={cn(
                "flex items-center gap-2 px-6 py-4 transition-colors font-medium",
                activeTab === option.id 
                  ? "text-lovable-pink border-b-2 border-lovable-pink" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
              onClick={() => onTabChange(option.id)}
            >
              <option.icon size={20} />
              <span>{option.label}</span>
            </button>
            
            {index < options.length - 1 && (
              <Separator orientation="vertical" className="h-6" />
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default ClientTopbar;
