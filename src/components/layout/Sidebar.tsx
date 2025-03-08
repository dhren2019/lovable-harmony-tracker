
import React from 'react';
import { NavItem } from '@/lib/types';
import { 
  Home, 
  BookOpen, 
  CheckSquare, 
  PieChart, 
  UserPlus, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const navItems: NavItem[] = [
    { label: 'Dashboard', icon: Home, href: '/', active: true },
    { label: 'Reflections', icon: BookOpen, href: '/reflections' },
    { label: 'Habits', icon: CheckSquare, href: '/habits' },
    { label: 'Progress', icon: PieChart, href: '/progress' },
  ];
  
  return (
    <>
      <div 
        className={cn(
          "fixed top-0 left-0 bottom-0 z-30 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col",
          isCollapsed ? "w-[60px]" : "w-[240px]"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          {!isCollapsed && (
            <div className="font-semibold text-xl text-gray-800">Lovable</div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-800"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </Button>
        </div>
        
        <div className="p-3">
          <Button
            className={cn(
              "w-full bg-lovable-pink text-primary-foreground hover:bg-lovable-pink/90 transition-all",
              isCollapsed ? "p-2 justify-center" : "px-4 py-2 justify-start gap-2"
            )}
          >
            <UserPlus size={isCollapsed ? 24 : 20} />
            {!isCollapsed && <span>Add Client</span>}
          </Button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={cn(
                    "sidebar-link",
                    item.active && "active",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <item.icon size={20} />
                  {!isCollapsed && <span>{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-100">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-gray-500 hover:text-gray-800 hover:bg-gray-100",
              isCollapsed && "justify-center px-2"
            )}
          >
            <Settings size={20} />
            {!isCollapsed && <span className="ml-2">Settings</span>}
          </Button>
        </div>
      </div>
      
      {/* Sidebar overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-20 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
