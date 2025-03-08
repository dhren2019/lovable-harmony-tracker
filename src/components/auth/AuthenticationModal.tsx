
import React from 'react';
import { 
  SignIn, 
  SignUp, 
  useAuth 
} from '@clerk/clerk-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface AuthenticationModalProps {
  isOpen: boolean;
}

const AuthenticationModal: React.FC<AuthenticationModalProps> = ({ isOpen }) => {
  const [isSignIn, setIsSignIn] = React.useState(true);
  
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">
            {isSignIn ? 'Iniciar Sesión' : 'Registrarse'}
          </h2>
          
          <div className="w-full">
            {isSignIn ? (
              <SignIn 
                routing="path" 
                path="/sign-in"
                signUpUrl="/sign-up"
                afterSignInUrl="/"
              />
            ) : (
              <SignUp 
                routing="path" 
                path="/sign-up"
                signInUrl="/sign-in"
                afterSignUpUrl="/"
              />
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            {isSignIn ? (
              <p>
                ¿No tienes una cuenta?{" "}
                <button 
                  className="text-lovable-lavender hover:underline"
                  onClick={() => setIsSignIn(false)}
                >
                  Regístrate
                </button>
              </p>
            ) : (
              <p>
                ¿Ya tienes una cuenta?{" "}
                <button 
                  className="text-lovable-lavender hover:underline"
                  onClick={() => setIsSignIn(true)}
                >
                  Inicia sesión
                </button>
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticationModal;
