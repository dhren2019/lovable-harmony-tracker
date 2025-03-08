
import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import AuthenticationModal from './AuthenticationModal';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  
  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lovable-lavender"></div>
      </div>
    );
  }
  
  return (
    <>
      {/* Render the children if signed in */}
      <div className={isSignedIn ? '' : 'blur-sm pointer-events-none'}>
        {children}
      </div>
      
      {/* Show the authentication modal if not signed in */}
      <AuthenticationModal isOpen={!isSignedIn} />
    </>
  );
};

export default RequireAuth;
